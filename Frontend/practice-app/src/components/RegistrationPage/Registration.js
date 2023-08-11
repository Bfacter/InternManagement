import React, { useState } from "react";
import axios from "axios";
import "./RegistrationStyle.css";
import {
  isFNameValid,
  isEmailValid,
  isAgeVaild,
  isPasswordValid,
} from "../utils/typeCheckUtil";
const RegistrationForm = ({goToLogin}) => {

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [formData, setFormData] = useState({
    Fname: "",
    Dob: "",
    Email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordValid, setPasswordValid] = useState(true);
  const [ageValid, setAgeValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [fnameValid, setFNameValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate the Full Name when the user leaves the Fname field
  const handleFNameBlur = () => {
    validateFName(formData.Fname);
  };
  const validateFName = (name) => {
    const isValid = isFNameValid(name);
    setFNameValid(isValid);
  };

  // Validate the Email when the user leaves the Email field
  const handleEmailChange = () => {
    validateEmail(formData.Email);
  };
  const validateEmail = (Email) => {
    const isValid = isEmailValid(Email);
    setEmailValid(isValid);
  };

  // Validate the password when the user leaves the password field
  const handlePasswordBlur = () => {
    validatePassword(formData.password);
  };
  const validatePassword = (password) => {
    const isValid = isPasswordValid(password);
    setPasswordValid(isValid);
  };

  // Validate the Age when the user leaves the Dob field
  const handleAgeBlur = () => {
    validateAge(formData.Dob);
  };
  const validateAge = (Dob) => {
    const isValid = isAgeVaild(Dob);
    setAgeValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //To check whether the register is 18 or not
    if (!isAgeVaild(formData.Dob)) {
      window.alert("You must be 18 years old or above to register");
      return;
    }
    if(!(formData.password===formData.confirmPassword)){
      window.alert("Password and confirm password dont match");
      return;
    }

    // If the password is not valid, show an alert or set an error message
    if (!isPasswordValid(formData.password)) {
      window.alert(
        "Password must be at least 8 characters long and contain at least \n One uppercase letter \n One lowercase letter \n One digit \n One special character."
      );
      return;
    }
    if (!isEmailValid(formData.Email)) {
      window.alert("Email must be in correct format.");
      return;
    }
    if(!isFNameValid(formData.Fname)){
      window.alert("Name must be in correct format.");
      return;
    }
    try {
      await axios.post("http://localhost:4444/register", formData);
      console.log("Registration successful!");
      window.alert("Registration successful! You can now login.");
      setRegistrationSuccess(true);

    } catch (error) {
      console.log("Error", error);
    }
  };
  if (registrationSuccess) {

    window.location.href = "/login";
  }

  return (
    <div className="MainPage">
      <div className="heading">
        <h1 className="headingtext">REGISTRATION</h1>
      </div>
      <div className="reg_form">
        <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="Fname">Full Name: </label>
              <input class="def_input"
                type="text"
                id="Fname"
                name="Fname"
                value={formData.Fname}
                onChange={handleChange}
                onBlur={handleFNameBlur}
                required
              />
              {!fnameValid && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  First letter should be capital<br></br>
                  Only alphabets are allowed.
                </p>
              )}
            </div>
          <br/>
          <div>
            <label htmlFor="Dob">Date of Birth: </label>
            <input class="def_input"
              type="date"
              id="Dob"
              name="Dob"
              value={formData.Dob}
              onChange={handleChange}
              onBlur={handleAgeBlur}
              required
            />
            {!ageValid && (
              <p style={{ color: "red", fontSize: "12px" }}>
                You should be greater than 18 years to register
              </p>
            )}
          </div>
          <div>
            <label htmlFor="Email">Email: </label>
            <input class="def_input"
              type="email"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              onBlur={handleEmailChange}
              required
            />
            {!emailValid && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Email must be in correct format.
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input class="def_input"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handlePasswordBlur}
              required
            />
            {!passwordValid && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Password must be at least 8 characters long and contain at
                least:-
                <ul>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One digit</li>
                  <li>One special character.</li>
                </ul>
              </p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input class="def_input"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="buttonflex">
            <div className="ptext"><p>Already registered? <button onClick={goToLogin}>Login here</button></p></div>
            <button class="register-button" type="submit"  >Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegistrationForm;
