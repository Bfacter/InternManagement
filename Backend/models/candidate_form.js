const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  RID: {
    type: Number,
    required: true,
    unique: true,
  },
  RegNo: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  fathersname: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
  },
  mobile: {
    type: Number,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  desiredMonth: {
    type: String,
    required: true,
  },
  AreaOptions: {
    type: String,
    required: true,
  },
  PlaceofSubmission: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("formDetails", formSchema);
