const mongoose = require('mongoose');

const formSchema=mongoose.Schema({
    RID:{ 
        type:Number,
        required: true,
        unique:true
    },
    title:{ 
        type:String,
        required:true},
    fathersname:{ 
        type:String,
        required:true},
    address1:{ 
        type:String,
        required:true},
    address2: { 
        type:String,
        required:true},
    city: { 
        type:String,
        required:true},
    country: { 
        type:String,
        required:true},
    pincode: { 
        type:Number,
        required:true},
    phone:{ 
        type:Number,
        required:true},
    mobile:{ 
        type:Number,
        required:true},
    resume:{ 
        type:Buffer,
        required:true},
})
module.exports=mongoose.model('formDetails',formSchema);