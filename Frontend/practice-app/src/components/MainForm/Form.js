import React, { useState,useEffect } from "react";
import axios from "axios";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "./FormStyle.css";

const Form = ({RID}) => {
  const [candidateData, setCandidateData] = useState({});
  const[previewMode,setPreviewMode]=useState(false);
  const [fileError, setFileError] = useState("");
  const[formData,setFormData]=useState({
    RID:RID,
    title:"",
    fathersname:"",
    address1:"",
    address2:"",
    city:"",
    country:"",
    pincode:"",
    phone:"",
    mobile:"",
    resume:""
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4444/form/${RID}`);
        const data = response.data.candidate;
        setCandidateData(data);
      } catch (error) {
 
        console.error(`Error fetching candidate data:`, error);
      }
    };

    fetchData();
  }, [RID]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  

  const handleChange=(e)=>{
    const{name,value}=e.target;
    const newValue = value.replace(/[^a-zA-Z ]/g, '');
    setFormData({
        ...formData,
        [name]:newValue,
    })
  }
  const newHandleChange = (event) => {
    const { name, value } = event.target;
    const newValue = value.replace(/[^a-zA-Z0-9-/, ]/g, '');
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

  const [rows, setRows] = useState([
    {
      sno: 1,
      examination: "",
      subject: "",
      board: "",
      year: "",
      status: "",
      percentage: "",
    },
  ]);

  const handleAddRow = () => {
    const newRow = {
      sno: rows.length + 1,
      examination: "",
      subject: "",
      board: "",
      year: "",
      status: "",
      percentage: "",
    };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(updatedRows);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      // formDataToSend.append("resume", formData.resume);
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
          <select className="def_input title-option" name="title" onChange={handleChange} value={formData.title} >
            <option>Select</option>
            <option value="Mr">Mr.</option>
            <option value="Mrs">Mrs.</option>
            <option value="Ms">Ms.</option>
            <option value="Dr">Dr.</option>
          </select>
          )}
          
        </div>
        <div className="field">
          <label>First Name:</label>
          {previewMode ? (
            <span>{candidateData.Fname}</span>
          ) : (
            <input className="def_input"
              type="text"
              name="firstname"
              onChange={handleChange}
              value={candidateData ? candidateData.Fname : ""}
              readOnly
             disabled

            />
          )}
        </div>
      </div>    
      <div className="field-container">
       <div className="field">
          <label>Date of Birth:</label>
          {previewMode ? (
            <span>{candidateData.Dob.substr(0, 10)}</span>
          ) : (
            <input className="def_input"
              type="date"
              name="dob"
              onChange={dobHandleChange}
              value={candidateData?.Dob ? candidateData.Dob.substr(0, 10) : ""}
              readOnly
             disabled

            />
          )}
        </div>
       <div className="field">
          <label>Email:</label>
          {previewMode ? (
            <span>{candidateData.Email}</span>
          ) : (
            <input className="def_input"
              type="email"
              name="email"
              onChange={emailHandleChange}
              value={candidateData ? candidateData.Email : ""}
             readOnly
             disabled
            />
          )}
        </div>
      </div>
        <div className="field">
          <label>Father's Name:</label>
          {previewMode ? (
            <span>{formData.fathersname}</span>
          ) : (
            <input className="def_input"
              type="text"
              name="fathersname"
              onChange={handleChange}
              value={formData.fathersname}
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
            <input className="def_input"
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
            <input className="def_input"
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
            <input className="def_input"
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
            <input className="def_input"
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
            <input className="def_input"
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
      {/* flex ka main div hai field-container uske andar field className mein jo bhi dega vo ek line m aajayega */}
        <div className="field">
        <label>Phone No:</label>
        {previewMode ? (
          <span>{formData.phone}</span>
        ) : (
          <PhoneInput class="def_input"
            name="phone"
            country={"in"}
            onlyCountries={["in"]}
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
            onlyCountries={["in"]}
            onChange={handleMobileChange}
            value={formData.mobile}
            required
          />
        )}
      </div>
      </div>
  
        <br></br>
        <h3>Educational Qualification</h3>
         

      <table>
        <thead>

          <tr>
            <th>S.No.</th>
            <th>Examination Passed</th>
            <th>Subject</th>
            <th>Name of Board/University</th>
            <th>Year of Joining</th>
            <th>Pursuing/Completed</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.sno}</td>
              <td>
                <input
                  type="text"
                  value={row.examination}
                  onChange={(e) =>
                    handleInputChange(index, "examination", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.subject}
                  onChange={(e) =>
                    handleInputChange(index, "subject", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.board}
                  onChange={(e) =>
                    handleInputChange(index, "board", e.target.value)
                  }
                />
              </td>
              <td>
                <select
                  value={row.year}
                  onChange={(e) =>
                    handleInputChange(index, "year", e.target.value)
                  }
                >
                  <option value="">Select Year</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  {/* Add more years */}
                </select>
              </td>
              <td>
                <select
                  value={row.status}
                  onChange={(e) =>
                    handleInputChange(index, "status", e.target.value)
                  }
                >
                  <option value="">Select Status</option>
                  <option value="Pursuing">Pursuing</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={row.percentage}
                  onChange={(e) =>
                    handleInputChange(index, "percentage", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Add Row</button><br></br>
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