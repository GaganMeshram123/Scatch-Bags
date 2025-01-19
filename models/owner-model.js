const mongoose = require('mongoose');

 // this is actually a user schema 

const ownerSchema = mongoose.Schema({
    // user baddal mahiti purn lihaychi ahe ithe 
    fullname: {
       type : String,
      minlength : 3 ,
      trim : true,
        },
    email : String,
    password: String,
    cart: {
        type : Array,
        default: []
    },
    isadmin : Boolean,
    orders : {
        type: Array,
        default: []
    },
    contact : Number,
    picture : String,
});

module.exports = mongoose.model("owner", ownerSchema);
