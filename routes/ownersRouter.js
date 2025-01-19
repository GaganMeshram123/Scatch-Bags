const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
    // Create a new owner
    router.post("/create", async function (req, res) {
        try {
            // Check if owners already exist
            let owners = await ownerModel.find();
            if (owners.length > 0) {
                return res.status(403).send("You don't have permission to create a new owner");
            }

            // Destructure body parameters putn owner che asnaar bhaii
            let { fullname, email, password } = req.body;

            // Create new owner
            let createdOwner = await ownerModel.create({
                fullname,
                email,
                password
            });

            return res.status(201).send(createdOwner);
        } catch (error) {
            console.error("Error creating owner:", error);
            return res.status(500).send("Internal Server Error");
        }
    });
}

// Test route
router.get("/admin", function (req, res) {
    let success = req.flash("success");
    res.render("createproducts", {success});
});//here we are rendering the next page here 

module.exports = router;
