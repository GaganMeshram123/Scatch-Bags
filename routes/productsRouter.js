const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");


router.post("/create", upload.single("image"), async function( req, res){
    try {
         if (!req.file) {
            return res.status(400).send("Image file is required");
        }

         const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

         let product = await productModel.create({
            image: req.file.buffer, // Use the uploaded image buffer
            name,
            price,
            discount: discount || 0, // Default to 0 if not provided
            bgcolor,
            panelcolor,
            textcolor,
        });
        res.status(201).send({ message: "Product created successfully", product });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Something went wrong" });
    } 
 });

module.exports = router;