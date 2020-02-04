var mongoose = require("mongoose");
var statusSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required:true
    },
    crop: { 
        type: String, 
        required:true
    },    
    capacity: { 
        type: Number, 
        required:true
    },
    status : {
        type: Number, 
        required:true
    }
});

module.exports = mongoose.model("Status", statusSchema);