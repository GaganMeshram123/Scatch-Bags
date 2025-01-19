const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    console.log(process.env.JWT_KEY);
    return jwt.sign(
        { email: user.email, id: user.id }, // Payload
        process.env.JWT_KEY, // Secret key je apan .env file madhe pn takli ahe bhai 
        { expiresIn: "1h" } // Optional: Set token expiration
    );
};

module.exports = { generateToken };
