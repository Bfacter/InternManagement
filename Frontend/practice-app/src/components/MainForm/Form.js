import React, { useState } from "react";
import axios from "axios";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Form = () => {
  const[previewMode,setPreviewMode]=useState(false);
  const [fileError, setFileError] = useState("");
  const[formData,setFormData]=useState({
    title:"",
    fname:"",
    fathersname:"",
    dob:"",
    address1:"",
    address2:"",
    city:"",
    country:"",
    pincode:"",
    phone:"",
    mobile:"",
    email:"",
    resume:null
  })

  const handleChange=(e)=>{
    const{name,value}=e.target;
    const newValue = value.replace(/[^a-zA-Z]/g, '');
    setFormData({
        ...formData,
        [name]:newValue,
    })
  }
  const newHandleChange = (event) => {
    const { name, value } = event.target;
    const newValue = value.replace(/[^a-zA-Z0-9-/,]/g, '');
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  const pincodeHandleChange = (event) => {
    const { name, value } = event.target;
    const newValue = value.replace(/\D/g, '').substring(0, 6);
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });
  };

  const handleMobileChange = (value) => {
    setFormData({
      ...formData,
      mobile: value,
    });
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["application/pdf"];
    const allowedSize = 1 * 1024 * 1024; // 1 MB

    if (file) {
      if (allowedTypes.includes(file.type) && file.size <= allowedSize) {
        setFormData({
          ...formData,
          resume: file,
        });
        setFileError(""); // Clear any previous errors
      } else {
        setFileError("Invalid file format or size. Please choose a PDF file of up to 1 MB.");
      }
    }
  };
  const dobHandleChange=(e)=>{
    const{name,value}=e.target;
    setFormData({
        ...formData,
        [name]:value,
    }) 
  }
  const emailHandleChange=(e)=>{
    const { name, value } = e.target;
      
        setFormData({
          ...formData,
          [name]: value,
        
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
          {previewMode ? (
            <span>{formData.title}</span>
          ) : (
          <select name="title" onChange={handleChange} value={formData.title}>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
          </select>
          )}
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
          <label>Father's Name:</label>
          {previewMode ? (
            <span>{formData.fathersname}</span>
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
              onChange={dobHandleChange}
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
              onChange={newHandleChange}
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
              onChange={newHandleChange}
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
              onChange={pincodeHandleChange}
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
          <PhoneInput
            name="phone"
            country={"in"}
            onChange={handlePhoneChange}
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
          <PhoneInput
            name="mobile"
            country={"in"}
            onChange={handleMobileChange}
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
              onChange={emailHandleChange}
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
          accept=".pdf"
          required
        />
        {fileError && <p style={{ color: "red" }}>{fileError}</p>}
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
