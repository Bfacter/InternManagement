import React, { useState, useEffect } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./FormStyle.css";

import { getCurrentMonthPlusTwoOptions } from "../utils/dateUtils";

const Form = ({ RID, goToLogin }) => {
  const [candidateData, setCandidateData] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [fileError, setFileError] = useState("");
  const [examinationOptions, setExaminationOptions] = useState([]);
  const [AreaOptions, setAreaOptions] = useState([]);
  const [showSuccessPrompt, setShowSuccessPrompt] = useState(false);

  const [formData, setFormData] = useState({
    RID: RID,
    title: "",
    fathersname: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    pincode: "",
    phone: "",
    mobile: "",
    resume: null,
    desiredMonth: "",
    AreaOptions: "",
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleIChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const namehandleChange = (e) => {
    const { name, value } = e.target;
    const newValue = value.replace(/[^a-zA-Z ]/g, "");
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  const newHandleChange = (event) => {
    const { name, value } = event.target;
    const newValue = value.replace(/[^a-zA-Z0-9-/, ]/g, "");
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  const pincodeHandleChange = (event) => {
    const { name, value } = event.target;
    const newValue = value.replace(/\D/g, "").substring(0, 6);
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
          resumeFileName: file.name, // Store the file name
        });
        setFileError(""); // Clear any previous errors
      } else {
        setFormData({
          ...formData,
          resume: null, // Reset the resume state
          resumeFileName: "", // Clear the file name
        });
        setFileError(
          "Invalid file format or size. Please choose a PDF file of up to 1 MB."
        );
      }
    } else {
      // If no file is selected, clear the resume and file name fields
      setFormData({
        ...formData,
        resume: null,
        resumeFileName: "",
      });
    }
  };

  const dobHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const emailHandleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    fetchExaminationOptions();
  }, []);

  const fetchExaminationOptions = async () => {
    try {
      const response = await fetch("http://localhost:4444/api/options"); // Update with your backend URL
      const data = await response.json();
      setExaminationOptions(data.options);
    } catch (error) {
      console.error("Error fetching examination options:", error);
    }
  };
  useEffect(() => {
    fetchAreaOptions();
  }, []);

  const generateSYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    
    for (let i = currentYear ; i >= currentYear - 10; i--) {
      years.push(i.toString());
    }
  
    return years;
  };

  const generateCYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    
    for (let i = currentYear+5 ; i >= currentYear -8; i--) {
      years.push(i.toString());
    }
  
    return years;
  };

  const fetchAreaOptions = async () => {
    try {
      const response = await fetch("http://localhost:4444/api/areaoptions"); // Update with your backend URL
      const data = await response.json();
      setAreaOptions(data.options);
    } catch (error) {
      console.error("Error fetching examination options:", error);
    }
  };
  const [rows, setRows] = useState([
    {
      sno: 1,
      examination: "",
      subject: "",
      board: "",
      syear: "",
      cyear: "",
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
      syear: "",
      cyear: "",
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
  const handleLogout = () => {
    window.alert("Logging Out");
    goToLogin();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("RID", formData.RID);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("fathersname", formData.fathersname);
      formDataToSend.append("address1", formData.address1);
      formDataToSend.append("address2", formData.address2);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("pincode", formData.pincode);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("mobile", formData.mobile);
      formDataToSend.append("desiredMonth", formData.desiredMonth);
      formDataToSend.append("AreaOptions", formData.AreaOptions);

      // Append the resume file to the FormData object
      formDataToSend.append("resume", formData.resume);

      // Set the appropriate headers for multipart/form-data
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      await axios.post("http://localhost:4444/p", formDataToSend, config);
      console.log("Registration successful!");
      setShowSuccessPrompt(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        setShowSuccessPrompt(false); // Clear the prompt
        goToLogin(); // Redirect to login page
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className="main-outer-div">
      <div className="heading">
        <h1 className="headingtext">
          Application form for Internship in Niti Aayog
        </h1>
      </div>
      <div className="logout">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="field-container">
          <div className="field">
            <label>Title:</label>
            {previewMode ? (
              <span>{formData.title}</span>
            ) : (
              <select
                className="def_input title-option"
                name="title"
                onChange={namehandleChange}
                value={formData.title}>
                <option>Select</option>
                <option value="Mr">Mr.</option>
                <option value="Mrs">Mrs.</option>
                <option value="Ms">Ms.</option>
                <option value="Dr">Dr.</option>
              </select>
            )}
          </div>
          <div className="field">
            <label>Full Name:</label>
            {previewMode ? (
              <span>{candidateData.Fname}</span>
            ) : (
              <input
                className="def_input"
                type="text"
                name="firstname"
                onChange={namehandleChange}
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
              <input
                className="def_input"
                type="date"
                name="dob"
                onChange={dobHandleChange}
                value={
                  candidateData?.Dob ? candidateData.Dob.substr(0, 10) : ""
                }
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
              <input
                className="def_input"
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
            <input
              className="def_input"
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
              <input
                className="def_input"
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
              <input
                className="def_input"
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
              <input
                className="def_input"
                type="text"
                name="city"
                onChange={handleChange}
                value={formData.city}
                required
              />
            )}
          </div>
          <div className="field">
            <label>Country:</label>
            {previewMode ? (
              <span>{formData.country}</span>
            ) : (
              <input
                className="def_input"
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
              <input
                className="def_input"
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
              <PhoneInput
                class="def_input"
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
              <PhoneInput
                class="def_input"
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

        {previewMode ? (
          <table>
            <tbody>
              {rows.map((row, index) => (
                <>
                  <tr>
                    <th>S.No.</th>
                    <th>Examination Passed</th>
                    <th>Subject</th>
                    <th>Name of Board/University</th>
                    <th>Year of Joining</th>
                    <th>Year of Completion</th>
                    <th>Pursuing/Completed</th>
                    <th>Percentage</th>
                  </tr>
                  <tr key={index}>
                    <td>{row.sno}</td>
                    <td>{row.examination}</td>
                    <td>{row.subject}</td>
                    <td>{row.board}</td>
                    <td>{row.cyear}</td>
                    <td>{row.syear}</td>
                    <td>{row.status}</td>
                    <td>{row.percentage}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Examination Passed</th>
                <th>Discipline/Subject</th>
                <th>Name of Board/University</th>
                <th>Year of Joining</th>
                <th>Year of Completion</th>
                <th>Pursuing/Completed</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.sno}</td>
                  <td>
                    {/* Dropdown for Examination Passed */}
                    <select
                      className="def_input sizing"
                      value={row.examination}
                      onChange={(e) =>
                        handleInputChange(index, "examination", e.target.value)
                      }>
                      <option value="">Select Examination</option>
                      {examinationOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      className="def_input sizing"
                      type="text"
                      value={row.subject}
                      onChange={(e) =>
                        handleInputChange(index, "subject", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="def_input sizing"
                      type="text"
                      value={row.board}
                      onChange={(e) =>
                        handleInputChange(index, "board", e.target.value)
                      }
                    />
                  </td>
                  <td>
                     <select
                       className="def_input select-option sizing"
                       value={row.syear}
                       onChange={(e) =>
                         handleInputChange(index, "syear", e.target.value)
                       }>
                       <option value="">Select Year</option>
                       {generateSYearOptions().map((year) => (
                         <option key={year} value={year}>
                           {year}
                         </option>
                       ))}
                     </select>

                  </td>
                  <td>
                    <select
                      className="def_input select-option sizing"
                      value={row.cyear}
                      onChange={(e) =>
                        handleInputChange(index, "cyear", e.target.value)
                      }>
                      <option value="">Select Year</option>
                      {generateCYearOptions().map((year) => (
                         <option key={year} value={year}>
                           {year}
                         </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className="def_input select-option sizing"
                      value={row.status}
                      onChange={(e) =>
                        handleInputChange(index, "status", e.target.value)
                      }>
                      <option value="">Select Status</option>
                      <option value="Pursuing">Pursuing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <input
                      className="def_input sizing "
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
        )}

        <button onClick={handleAddRow}>Add Row</button>
        <br></br>
        <div className="field">
          {previewMode ? (
            <>
              Desired Month of Internship: <span>{formData.desiredMonth}</span>
            </>
          ) : (
            <>
              <div className="flex">
                <div className="h"> Desired Month of Internship: </div>
                <div className="y">
                  <select
                    className="def_input"
                    name="desiredMonth"
                    onChange={handleChange}
                    value={formData.desiredMonth}
                    required>
                    <option value="">Select Month</option>
                    {getCurrentMonthPlusTwoOptions().map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
          <br></br>
          {previewMode ? (
            <>
              Area Of Interest: <span>{formData.AreaOptions}</span>
            </>
          ) : (
            <>
              <div className="flex">
                <div>Area Of Interest:</div>
                <div>
                  {" "}
                  <select
                    className="def_input"
                    name="Areaofinterest"
                    value={formData.AreaOptions}
                    onChange={(e) =>
                      handleIChange("AreaOptions", e.target.value)
                    }
                    style={{ width: "100%" }}
                    required>
                    <option value="">Select Area of Interest</option>
                    {AreaOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          <div style={{ fontSize: "16px", marginTop: "3%" }}>
            Date: {new Date().toLocaleDateString()}
          </div>
        </div>
        <div className="field border">
          <label>Upload Resume:</label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            accept=".pdf"
            required
          />
          {fileError && <p style={{ color: "red" }}>{fileError}</p>}
          {formData.resumeFileName && (
            <p>Selected Resume: {formData.resumeFileName}</p>
          )}
        </div>

        {previewMode ? (
          <button
            className="field form-button"
            type="button"
            onClick={handlePreview}>
            Edit
          </button>
        ) : (
          <button
            type="button"
            className="field form-button"
            onClick={handlePreview}>
            Preview
          </button>
        )}
        {!previewMode && (
          <div>
            <button className="field form-button" type="submit">
              Submit
            </button>
          </div>
        )}
        {showSuccessPrompt && (
          <script>
            {window.alert("Form submitted successfully!") }
          </script>
        )}

      </form>
    </div>
  );
};

export default Form;
