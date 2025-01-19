const userModel = require("../models/user-models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function(req, res) {
  try {
        console.log(req.body); // Debugging
        let { email, password, fullname } = req.body;
       
        // Check if the user already exists
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(401)
            .send("You already have an account. Please login.");
        }

        bcrypt.genSalt(10, async function (err, salt) { // Changed to async
            if (err) return res.send(err.message);

            bcrypt.hash(password, salt, async function (err, hash) { // Changed to async
                if (err) return res.send(err.message);

                // Create a new user
                let user = await userModel.create({
                    email,
                    password: hash, // Store the hashed password
                    fullname
                });

                let tokens = generateToken(user); 

                // Generate JWT  
                let token = generateToken(user); // You are generating the token here, but you were also generating one manually below

                // Send token as a cookie
                res.cookie("token", token, { httpOnly: true });

                // Send a success message and user details
                res.status(201).send({
                    message: "User registered successfully!",
                    user: {
                        email: user.email,
                        fullname: user.fullname,
                    },
                });
            });
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: "Something went wrong" });
    }
};
module.exports.loginUser = async function (req, res) {
    try {
      let { email, password } = req.body;
  
      // Checking if the user exists
      let user = await userModel.findOne({ email: email });
      if (!user) return res.status(400).send("Email or password incorrect"); // Proper error response
  
      // Comparing  the passwords
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) return res.status(500).send("Something went wrong with password comparison");
  
        if (result) {
          // Passwords match
          return res.status(200).send("Login successful");
        } else {
          // Passwords don't match
          return res.status(400).send("Email or password incorrect");
        }
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ error: "Something went wrong" });
    }
  };

module.exports.logout = async function (req, res) {
    try {
      // Clearing the token stored in cookies
      res.clearCookie("token");
  
      // Sending a success response
      return res.status(200).send("Logged out successfully");
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ error: "Something went wrong during logout" });
    }
  };
  