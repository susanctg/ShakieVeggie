let mongoose = require('mongoose');

//user schema
let OrderSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    totalprice:{
        type: Number
    },
    paymentstatus:{
        type: String
    }    
});


let Order = module.exports = mongoose.model('Order', OrderSchema);