const mongoose = require('mongoose');
const candidateRegistrationsSchema = mongoose.Schema({
RID:{ 
    type:Number,
    required: true,
    unique:true
},
Fname:{
    type:String,
    required: true,
},

Dob:{
    type:Date,
    required: true,
},
Email:{
    type:String,
    required: true,
    unique:true,
},
password: { 
    type: String,
    required: true, },
confirmPassword: { 
    type: String, 
    },
ipAddress:{
    type:String
},
statusofregistration:{
    type:String,
    default:"d",
    minlength:1,
    maxlength:1

},
time_of_registration:{
   type:Date,
   default: Date.now()
},loginAttempts: {
    type: Number,
    default: 0
  },
  loginLockUntil: {
    type: Date,
    default: null
  }
})
module.exports = mongoose.model('candidateRegistrations',candidateRegistrationsSchema);