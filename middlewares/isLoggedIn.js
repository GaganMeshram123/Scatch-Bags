const jwt = require("jsonwebtoken");
const userModel = require("../models/user-models");


module.exports =async function(res, res, next) {
     if(!req.cookies.token){// means adhi token pahije bhai
        req.flash("error", "you need to login first");
        return res.redirect("/");
     }

     try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel
        .findOne({ email: decoded.email })
        .select("-password");
        
     req.user = user;
     next();
     } catch(err) {
        req.flash("error", "something went wrong");
        res.redirect("/");
     }
};