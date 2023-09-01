import React, { useState, useEffect } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./FormStyle.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCurrentMonthPlusTwoOptions } from "../utils/dateUtils";
import { isFNameValid } from "../utils/typeCheckUtil";

const Form = ({ RID, goToLogin }) => {
  const [candidateData, setCandidateData] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [fileError, setFileError] = useState("");
  const [mobileValidationError, setMobileValidationError] = useState("");
  const [phoneValidationError, setPhoneValidationError] = useState("");
  const [pincodeValidationError, setPincodeValidationError] = useState("");

  const currentYear = new Date().getFullYear();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  const semesterOptions = [
    "Sem1",
    "Sem2",
    "Sem3",
    "Sem4",
    "Sem5",
    "Sem6",
    "Sem7",
    "Sem8",
  ];
  const validateMobileNo = (value) => {
    if (value.length !== 12) {
      setMobileValidationError("Mobile number should be 10 digits.");
      return false;
    } else {
      setMobileValidationError("");
      return true;
    }
  };
  const validatePhoneNo = (value) => {
    if (value.length !== 12) {
      setPhoneValidationError("Phone number should be 10 digits.");
      return false;
    } else {
      setPhoneValidationError("");
      return true;
    }
  };
  const validatePincodeNo = (value) => {
    if (value.length !== 6) {
      setPincodeValidationError("Pincode should be 6 digits.");
      return false;
    } else {
      setPincodeValidationError("");
      return true;
    }
  };
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
    placeOfSubmission: "",
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
    validatePincodeNo(value);
  };
  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });
    validatePhoneNo(value);
  };

  const handleMobileChange = (value) => {
    setFormData({
      ...formData,
      mobile: value,
    });
    validateMobileNo(value);
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
    const fetchOptionsForRow = async (rowIndex) => {
      try {
        const response = await axios.get(
          `http://localhost:4444/api/options?row=${rowIndex}`
        );
        return response.data.options;
      } catch (error) {
        console.error("Error fetching options:", error);
        return [];
      }
    };

    const updateRowsWithExaminationOptions = async () => {
      const updatedRows = await Promise.all(
        rows.map(async (row, index) => ({
          ...row,
          examinationOptions: await fetchOptionsForRow(index),
        }))
      );
      setRows(updatedRows);
    };

    updateRowsWithExaminationOptions();
  }, []);

  const fetchAreaOptions = async () => {
    try {
      const response = await fetch("http://localhost:4444/api/areaoptions"); // Update with your backend URL
      const data = await response.json();
      setAreaOptions(data.options);
    } catch (error) {
      console.error("Error fetching examination options:", error);
    }
  };
  useEffect(() => {
    fetchAreaOptions();
  }, []);

  const [rows, setRows] = useState([
    // Initialize with 4 rows
    {
      sno: 1,
      examination: "",
      subject: "",
      board: "",
      syear: "",
      cyear: "",
      status: "",
      percentage: "",
      semester: "",
      examinationOptions: [],
    },
    {
      sno: 2,
      examination: "",
      subject: "",
      board: "",
      syear: "",
      cyear: "",
      status: "",
      percentage: "",
      semester: "",
      examinationOptions: [],
    },
    {
      sno: 3,
      examination: "",
      subject: "",
      board: "",
      syear: "",
      cyear: "",
      status: "",
      percentage: "",
      semester: "",
      examinationOptions: [],
    },
    {
      sno: 4,
      examination: "",
      subject: "",
      board: "",
      syear: "",
      cyear: "",
      status: "",
      percentage: "",
      semester: "",
      examinationOptions: [],
    },
  ]);
  const [cyearErrors, setCYearErrors] = useState(
    Array(rows.length).fill(false)
  );
  const [cyearErrorMessages, setCYearErrorMessages] = useState(
    Array(rows.length).fill("")
  );
  const [percentageErrors, setPercentageErrors] = useState(
    Array(rows.length).fill(false)
  );
  const [percentageErrorMessages, setPercentageErrorMessages] = useState(
    Array(rows.length).fill("")
  );
  const [boardSubjectErrors, setBoardSubjectErrors] = useState(
    Array(rows.length).fill(false)
  );
  const [boardSubjectErrorMessages, setBoardSubjectErrorMessages] = useState(
    Array(rows.length).fill("")
  );
  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        // Add character-only validation for "board" and "subject" fields
        if (field === "board" || field === "subject") {
          // Use a regular expression to check if the value contains only letters
          const validCharactersRegex = /^[A-Za-z]+$/;
          if (!validCharactersRegex.test(value)) {
            const errorMessage = "Only characters (letters) are allowed.";
            const updatedErrors = [...boardSubjectErrors];
            updatedErrors[index] = true; // Set the error flag for this field
            setBoardSubjectErrors(updatedErrors);
            setBoardSubjectErrorMessages((prevMessages) => {
              const messages = [...prevMessages];
              messages[index] = errorMessage;
              return messages;
            });
          } else {
            // Clear the error if the input is valid
            const updatedErrors = [...boardSubjectErrors];
            updatedErrors[index] = false; // Clear the error flag for this field
            setBoardSubjectErrors(updatedErrors);
            setBoardSubjectErrorMessages((prevMessages) => {
              const messages = [...prevMessages];
              messages[index] = "";
              return messages;
            });
          }
        }

        return { ...row, [field]: value };
      }
      return row;
    });

    if (field === "percentage") {
      const percentage = parseFloat(value);

      // Check if the entered value is a valid percentage
      if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        const errorMessage = "Percentage must be between 0 and 100";
        const updatedErrors = [...percentageErrors];
        updatedErrors[index] = true;
        setPercentageErrors(updatedErrors);
        setPercentageErrorMessages((prevMessages) => {
          const messages = [...prevMessages];
          messages[index] = errorMessage;
          return messages;
        });
      } else {
        // Clear the error if the input is valid
        const updatedErrors = [...percentageErrors];
        updatedErrors[index] = false;
        setPercentageErrors(updatedErrors);
        setPercentageErrorMessages((prevMessages) => {
          const messages = [...prevMessages];
          messages[index] = "";
          return messages;
        });
      }
    }
    if (field === "cyear") {
      const cyear = parseInt(value, 10);
      const syear = parseInt(updatedRows[index].syear, 10);

      // Check if cyear is less than or equal to syear
      if (cyear <= syear) {
        const errorMessage =
          "Year of completion must be greater than Year of Joining by atleast 1 year";
        const updatedErrors = [...cyearErrors];
        updatedErrors[index] = true;
        setCYearErrors(updatedErrors);
        setCYearErrorMessages((prevMessages) => {
          const messages = [...prevMessages];
          messages[index] = errorMessage;
          return messages;
        });
      } else {
        // Clear the error if the input is valid
        const updatedErrors = [...cyearErrors];
        updatedErrors[index] = false;
        setCYearErrors(updatedErrors);
        setCYearErrorMessages((prevMessages) => {
          const messages = [...prevMessages];
          messages[index] = "";
          return messages;
        });
      }
    }

    setRows(updatedRows);
  };

  const handleSubmitEducationalQualification = async () => {
    try {
      const nonEmptyQualifications = rows.filter(
        (row) =>
          row.examination ||
          row.subject ||
          row.board ||
          row.syear ||
          row.cyear ||
          row.status ||
          row.percentage ||
          (row.status === "Pursuing" && row.semester)
      );

      if (nonEmptyQualifications.length === 0) {
        console.error("Please fill at least one educational qualification");
        return;
      }

      const educationalQualifications = nonEmptyQualifications.map((row) => {
        const qualification = {
          examination: row.examination,
          subject: row.subject,
          board: row.board,
          status: row.status,
          percentage: row.percentage,
          syear: row.syear,
          cyear: row.cyear,
        };

        if (row.status === "Pursuing") {
          qualification.semester = row.semester;
        }

        return qualification;
      });

      const educationalQualificationData = {
        RID: RID,
        educationalQualifications: educationalQualifications,
      };

      await axios.post(
        "http://localhost:4444/save-educational-data",
        educationalQualificationData
      );

      console.log("Educational qualification data saved successfully!");
    } catch (error) {
      console.error("Error saving educational qualification data:", error);
    }
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
      formDataToSend.append("PlaceofSubmission", formData.placeOfSubmission);

      // Append the resume file to the FormData object
      formDataToSend.append("resume", formData.resume);

      // Set the appropriate headers for multipart/form-data
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      await axios.post("http://localhost:4444/p", formDataToSend, config);
      await handleSubmitEducationalQualification();
      await axios.post(
        `http://localhost:4444/update-registration-status/${RID}`
      );
      setShowSuccessPrompt(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        setShowSuccessPrompt(false); // Clear the prompt
        goToLogin(); // Redirect to login page
      }, 3000);
    } catch (error) {
      alert(
        "Error in submitting data. Please ensure you have filled all required fields."
      );
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
              onChange={namehandleChange}
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
              <>
                <input
                  className="def_input"
                  type="text"
                  name="pincode"
                  onChange={pincodeHandleChange}
                  value={formData.pincode}
                  required
                />
                {pincodeValidationError && (
                  <span
                    style={{ fontSize: "12px", color: "Red" }}
                    className="error-message">
                    {pincodeValidationError}
                  </span>
                )}
              </>
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
              <>
                <PhoneInput
                  class="def_input"
                  name="phone"
                  country={"in"}
                  onlyCountries={["in"]}
                  onChange={handlePhoneChange}
                  value={formData.phone}
                />
                {phoneValidationError && (
                  <span
                    style={{ fontSize: "12px", color: "Red" }}
                    className="error-message">
                    {phoneValidationError}
                  </span>
                )}
              </>
            )}
          </div>
          <div className="field">
            <label>Mobile No:</label>
            {previewMode ? (
              <span>{formData.mobile}</span>
            ) : (
              <>
                <PhoneInput
                  class="def_input"
                  name="mobile"
                  country={"in"}
                  onlyCountries={["in"]}
                  onChange={handleMobileChange}
                  value={formData.mobile}
                  required
                />
                {mobileValidationError && (
                  <span
                    style={{ fontSize: "12px", color: "Red" }}
                    className="error-message">
                    {mobileValidationError}
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        <br></br>
        <h3>Educational Qualification</h3>

        {previewMode ? (
          <table>
            <tbody>
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
              {rows.slice(0, 4).map((row, index) => (
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
                {rows.some((row) => row.status === "Pursuing") && (
                  <th>Semester</th>
                )}
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
                      {row.examinationOptions.map((option) => (
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
                    {boardSubjectErrors[index] && (
                      <div className="error-message">
                        {boardSubjectErrorMessages[index]}
                      </div>
                    )}
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
                    {boardSubjectErrors[index] && (
                      <div className="error-message">
                        {boardSubjectErrorMessages[index]}
                      </div>
                    )}
                  </td>
                  <td>
                    <DatePicker
                      className="def_input select-option sizing"
                      selected={row.syear ? new Date(`${row.syear}-01`) : null}
                      onChange={(date) =>
                        handleInputChange(index, "syear", formatDate(date))
                      }
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      showMonthYearPicker
                      minDate={new Date(`${currentYear - 10}-01`)}
                      maxDate={new Date(`${currentYear}-12`)}
                      dateFormat="yyyy-MM"
                    />
                  </td>
                  <td>
                    <DatePicker
                      className={`def_input select-option sizing ${
                        cyearErrors[index] ? "error" : ""
                      }`}
                      selected={row.cyear ? new Date(`${row.cyear}-01`) : null}
                      onChange={(date) =>
                        handleInputChange(index, "cyear", formatDate(date))
                      }
                      showMonthDropdown
                      showYearDropdown
                      showMonthYearPicker
                      dropdownMode="select"
                      minDate={new Date(`${currentYear - 8}-01`)}
                      maxDate={new Date(`${currentYear + 5}-12`)}
                      dateFormat="yyyy-MM"
                    />
                    {cyearErrors[index] && (
                      <p
                        style={{ fontSize: "12px", color: "Red" }}
                        className="error-message">
                        {cyearErrorMessages[index]}
                      </p>
                    )}
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
                      className={`def_input sizing ${
                        percentageErrors[index] ? "error" : ""
                      }`}
                      type="text"
                      value={row.percentage}
                      onChange={(e) =>
                        handleInputChange(index, "percentage", e.target.value)
                      }
                    />
                    {percentageErrors[index] && (
                      <p
                        style={{ fontSize: "10px", color: "Red" }}
                        className="error-message">
                        {percentageErrorMessages[index]}
                      </p>
                    )}
                  </td>
                  <td>
                    {row.status === "Pursuing" && (
                      <select
                        className="def_input select-option sizing1"
                        value={row.semester}
                        onChange={(e) =>
                          handleInputChange(index, "semester", e.target.value)
                        }>
                        <option value="">Select Semester</option>
                        {semesterOptions.map((semester) => (
                          <option key={semester} value={semester}>
                            {semester}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

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
          <div className="field flex">
            <div>Place of Submission:</div>
            {previewMode ? (
              <span>{formData.placeOfSubmission}</span>
            ) : (
              <div>
                <input
                  className="def_input"
                  type="text"
                  name="placeOfSubmission"
                  onChange={namehandleChange}
                  value={formData.placeOfSubmission}
                  required
                />
              </div>
            )}
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
          <script>{window.alert("Form submitted successfully!")}</script>
        )}
      </form>
    </div>
  );
};

export default Form;
