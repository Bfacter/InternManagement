import React, { useState } from "react";
import axios from "axios";

const Form = () => {

  const[formData,setFormData]=useState({
    title:"",
    fname:"",
    mname:"",
    lname:"",
    fathersname:"",
    dob:"",
    address1:"",
    address2:"",
    city:"",
    country:"",
    pincode:"",
    phone:"",
    mobile:"",
    email:""

  })
  const handleChange=(e)=>{
    const{name,value}=e.target;
    setFormData({
        ...formData,
        [name]:value,
    })
  }
  const[previewMode,setPreviewMode]=useState(false);
  const handleFileChange =(e)=>{
    setFormData({
        ...formData,
        resume: e.target.files[0],
    }); 
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a FormData object to send files with other form data
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      await axios.post("http://localhost:4444/forms", formDataToSend);
      console.log("Registration successful!");
    } catch (error) {
      console.log("Error", error);
    }
  };
 

  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <select name="title" onChange={handleChange} value={formData.title}>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
          </select>
        </div>
        <div>
          <label>First Name:</label>
          {previewMode ? (
            <span>{formData.firstName}</span>
          ) : (
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              required
            />
          )}
        </div>
        <div>
          <label>Middle Name:</label>
          {previewMode ? (
            <span>{formData.middleName}</span>
          ) : (
            <input
              type="text"
              name="middleName"
              onChange={handleChange}
              value={formData.middleName}
            />
          )}
        </div>
        <div>
          <label>Last Name:</label>
          {previewMode ? (
            <span>{formData.lastName}</span>
          ) : (
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              required
            />
          )}
        </div>
        <div>
          <label>Father's Name:</label>
          {previewMode ? (
            <span>{formData.fatherName}</span>
          ) : (
            <input
              type="text"
              name="fatherName"
              onChange={handleChange}
              value={formData.fatherName}
              required
            />
          )}
        </div>
        <div>
          <label>Date of Birth:</label>
          {previewMode ? (
            <span>{formData.dob}</span>
          ) : (
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              value={formData.dob}
              required
            />
          )}
        </div>
        <div>
          <label>Address Line 1:</label>
          {previewMode ? (
            <span>{formData.address1}</span>
          ) : (
            <input
              type="text"
              name="address1"
              onChange={handleChange}
              value={formData.address1}
              required
            />
          )}
        </div>
        <div>
          <label>Address Line 2:</label>
          {previewMode ? (
            <span>{formData.address2}</span>
          ) : (
            <input
              type="text"
              name="address2"
              onChange={handleChange}
              value={formData.address2}
            />
          )}
        </div>
        <div>
          <label>City:</label>
          {previewMode ? (
            <span>{formData.city}</span>
          ) : (
            <input
              type="text"
              name="city"
              onChange={handleChange}
              value={formData.city}
              required
            />
          )}
        </div>
        <div>
          <label>Country:</label>
          {previewMode ? (
            <span>{formData.country}</span>
          ) : (
            <input
              type="text"
              name="country"
              onChange={handleChange}
              value={formData.country}
              required
            />
          )}
        </div>
        <div>
          <label>Pincode:</label>
          {previewMode ? (
            <span>{formData.pincode}</span>
          ) : (
            <input
              type="text"
              name="pincode"
              onChange={handleChange}
              value={formData.pincode}
              required
            />
          )}
        </div>
        <div>
          <label>Phone No:</label>
          {previewMode ? (
            <span>{formData.phone}</span>
          ) : (
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              required
            />
          )}
        </div>
        <div>
          <label>Mobile No:</label>
          {previewMode ? (
            <span>{formData.mobile}</span>
          ) : (
            <input
              type="text"
              name="mobile"
              onChange={handleChange}
              value={formData.mobile}
              required
            />
          )}
        </div>
        <div>
          <label>Email:</label>
          {previewMode ? (
            <span>{formData.email}</span>
          ) : (
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          )}
        </div>
        <div>
          <label>Upload Resume:</label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            required
          />
        </div>
        {previewMode ? (
          <button type="button" onClick={handlePreview}>
            Edit
          </button>
        ) : (
          <button type="button" onClick={handlePreview}>
            Preview
          </button>
        )}
        {!previewMode && (
          <div>
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
  );
  
};

export default Form;
