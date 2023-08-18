import React, { useState,useEffect } from "react";
import axios from "axios";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "./FormStyle.css";

const Form = ({RID}) => {
  const [candidateData, setCandidateData] = useState(null);
  const[previewMode,setPreviewMode]=useState(false);
  const [fileError, setFileError] = useState("");
  const[formData,setFormData]=useState({
    RID:RID,
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
  useEffect(() => {
    if (RID) {
      fetchCandidateData(RID)
        .then((data) => {
          setCandidateData(data.candidate);
          console.log(candidateData);
        })
        .catch((error) => {
          console.error('Error fetching candidate data:', error);
        });
    }
  }, [RID]);
  useEffect(() => {
    if (candidateData) {
      setFormData((prevData) => ({
        ...prevData,
        Fname: candidateData.Fname || "",
        Email: candidateData.Email || "",
        Dob: candidateData.Dob || "",
      }));
    }
  }, [candidateData]);


  const fetchCandidateData = async (RID) => {
    try {
      const response = await axios.get(`http://localhost:4444/form/${RID}`); 
      const data = response.data;
      return data;
    } catch (error) {
      throw error;
    }
  };

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

      await axios.post("http://localhost:4444/form/post", formDataToSend);
      console.log("Registration successful!");
    } catch (error) {
      console.log("Error", error);
    }
  };
 

  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className="main-outer-div">
      <div className="heading">
        <h1 className="headingtext">Application form for Internship in Niti Aayog</h1>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/foorm-data">
      <div className="field-container">
        <div className="field">
          <label>Title:</label>
          {previewMode ? (
            <span>{formData.title}</span>
          ) : (
          <select class="def_input title-option" name="title" onChange={handleChange} value={formData.title} >
            <option value="Mr">Mr.</option>
            <option value="Mrs">Mrs.</option>
            <option value="Ms">Ms.</option>
            <option value="Dr">Dr.</option>
          </select>
          )}
        </div>
        <div className="field">
          <label>First Name:</label>
          {/* {candidateData.Fname} */}
          {previewMode ? (
            <span>{formData.firstName}</span>
          ) : (
            <input className="def_input"
              type="text"
              name="Fname"
              onChange={handleChange}
            value={candidateData ? candidateData.Fname : ""}
              readOnly
            />
          )}
        </div>
      </div>    
      <div className="field-container">
       <div className="field">
          <label>Date of Birth:</label>
          {previewMode ? (
            <span>{formData.dob}</span>
          ) : (
            <input class="def_input"
              type="date"
              name="dob"
              onChange={dobHandleChange}
              value={candidateData ? candidateData.Dob : ""}
              readOnly
            />
          )}
        </div>
       <div className="field">
          <label>Email:</label>
          {previewMode ? (
            <span>{formData.email}</span>
          ) : (
            <input class="def_input"
              type="email"
              name="email"
              onChange={emailHandleChange}
              value={candidateData ? candidateData.Email : ""}
             readOnly
            />
          )}
        </div>
      </div>
        <div className="field">
          <label>Father's Name:</label>
          {previewMode ? (
            <span>{formData.fathersname}</span>
          ) : (
            <input class="def_input"
              type="text"
              name="fatherName"
              onChange={handleChange}
              value={formData.fatherName}
              required
            />
          )}
        </div>
      <div className="field-container">  
        <div className="field">
          <label>Address Line 1:</label>
          {previewMode ? (
            <span>{formData.address1}</span>
          ) : (
            <input class="def_input"
              type="text"
              name="address1"
              onChange={newHandleChange}
              value={formData.address1}
              required
            />
          )}
        </div>
        <div className="field">
          <label>Address Line 2:</label>
          {previewMode ? (
            <span>{formData.address2}</span>
          ) : (
            <input class="def_input"
              type="text"
              name="address2"
              onChange={newHandleChange}
              value={formData.address2}
            />
          )}
        </div>
      </div>  
      <div className="field-container"> 
        <div className="field">
          <label>City:</label>
          {previewMode ? (
            <span>{formData.city}</span>
          ) : (
            <input class="def_input"
              type="text"
              name="city"
              onChange={handleChange}
              value={formData.city}
              required
            />
          )}
        </div>
        <div className="field" >
          <label>Country:</label>
          {previewMode ? (
            <span>{formData.country}</span>
          ) : (
            <input class="def_input"
              type="text"
              name="country"
              onChange={handleChange}
              value={formData.country}
              required
            />
          )}
        </div>
        <div className="field">
          <label>Pincode:</label>
          {previewMode ? (
            <span>{formData.pincode}</span>
          ) : (
            <input class="def_input"
              type="text"
              name="pincode"
              onChange={pincodeHandleChange}
              value={formData.pincode}
              required
            />
          )}
        </div>
      </div>
      <div className="field-container"> 
      {/* flex ka main div hai field-container uske andar field classname mein jo bhi dega vo ek line m aajayega */}
        <div className="field">
        <label>Phone No:</label>
        {previewMode ? (
          <span>{formData.phone}</span>
        ) : (
          <PhoneInput class="def_input"
            name="phone"
            country={"in"}
            onChange={handlePhoneChange}
            value={formData.phone}
            required
          />
        )}
      </div>
      <div className="field">
        <label>Mobile No:</label>
        {previewMode ? (
          <span>{formData.mobile}</span>
        ) : (
          <PhoneInput class="def_input"
            name="mobile"
            country={"in"}
            onChange={handleMobileChange}
            value={formData.mobile}
            required
          />
        )}
      </div>
      </div>
        <div className="field"v>
        <label>Upload Resume:</label>
        <input
          type="file"
          name="resume"
          onChange={handleFileChange}
          accept=".pdf"
          // required
        />
        {fileError && <p style={{ color: "red" }}>{fileError}</p>}
      </div>
        {previewMode ? (
          <button className="field form-button" type="button" onClick={handlePreview}>
            Edit
          </button>
        ) : (
          <button type="button" className="field form-button" onClick={handlePreview}>
            Preview
          </button>
        )}
        {!previewMode && (
          <div>
            <button className="field form-button" type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
  );
  
};

export default Form;