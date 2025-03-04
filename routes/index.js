const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModels = require("../models/user-models");
const { disconnect } = require("mongoose");

router.get("/", function(res, req){
    let error = req.flash("error");
    res.render("index", {error, loggedin: false});
});

router.get("/shop", isLoggedin, async function(req, res){
    let product = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { product });
});
router.get("/cart", isLoggedin, async function(req, res){
    let user =  await userModel
    .findOne({email: req.user.email})
    .populate("cart")

    const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);
    res.render("cart", { user });
});

router.get("/addtocart/:id", isLoggedin, async function(req, res){
   let user = await userModel.findOne({email: req.user.email});
   user.cart.push(req.params.productid);
   await user.save();
   req.flash("success", "Added to cart");
   res.redirect("/shop");
});

router.get("/logout", isLoggedin, function(req, res){
    res.render("shop");
});
module.exports= router;