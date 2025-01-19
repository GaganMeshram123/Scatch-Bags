const mongoose = require('mongoose');

 // this is actually a user schema 

const userSchema = mongoose.Schema({
    // user baddal mahiti purn lihaychi ahe ithe 
    fullname: String,
    email : String,
    password: String,
    cart:[ {
        type : mongoose.Schema.Types.ObjectId,
        ref: "product",
    }],
     orders : {
        type: Array,
        default: []
    },
    contact : Number,
    picture : String,
});

module.exports = mongoose.model("user", userSchema);
