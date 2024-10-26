const mongoose = require("mongoose");
const solarPlantSchema = new mongoose.Schema({
    customer_id:{type:mongoose.Schema.Types.ObjectId,ref:"CustomerSchema"},
    plant_name:{type:String,required:true},
    capacity_kw:{type:Number,required:true},
    installation_date:{type:Date,required:true},
    location:{type:String,required:true},
    status:{type:String,required:true},
    created_at:{type:Date,default:Date.now},
});

module.exports = mongoose.model("SolarPlantSchema",solarPlantSchema);