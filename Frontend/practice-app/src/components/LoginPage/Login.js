import React, { useState } from "react";
import axios from "axios";
import "./LoginStyle.css";
import { isEmailValid } from "../utils/typeCheckUtil";
const LoginForm = ({ className, goToForm, goToRegistration }) => {
  const [formData, setFormData] = useState({
    Email: "",
    password: "",
  });
  const [lockoutMessage, setLockoutMessage] = useState(""); // New state for lockout message
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const emailHandleChange = (e) => {
    const { name, value } = e.target;

    // Define the email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,4}$/;

    // Check if the entered email matches the regex pattern
    const isValidEmail = emailRegex.test(value);

    setFormData({
      ...formData,
      [name]: value,
      emailError: isValidEmail ? "" : "Invalid email format", // Set an error message if the email is invalid
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid(formData.Email)) {
      // Show an error message for invalid email format
      window.alert("Invalid Email Format");
      return; // Don't submit the form
    }
    try {
      const response = await axios.post(
        "http://localhost:4444/login",
        formData
      );

      window.alert("Login Successful!");
      saveLoginData(formData.Email, true);
      goToForm(response.data.RID, response.data.statusofregistration);
    } catch (error) {
      if (error.response.status === 401) {
        if (error.response.data.message.includes("locked out")) {
          setLockoutMessage(error.response.data.message);
        } else {
          window.alert("Invalid Credentials");
          saveLoginData(formData.Email, false);
        }
      } else {
        window.alert("Error logging in:");
      }
    }
  };
  const saveLoginData = async (email, success) => {
    try {
      const ipAddressResponse = await axios.get(
        "https://api64.ipify.org?format=json"
      );
      const ipAddress = ipAddressResponse.data.ip;

      await axios.post("http://localhost:4444/save-login-data", {
        email,
        success,
        ipAddress,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error saving login data:", error);
    }
  };

  return (
    <div className="Mainloginpage">
      <div>
        <div className="overlap">
          <img
            className="rectangle"
            alt="Rectangle"
            src="/images/rectangle-4.jpg"
          />
          <div className="div" />
          <p className="Up">To Apply Online/ Print Application:</p>
          <form className="login" onSubmit={handleSubmit}>
            <label className="email-id">Email Id:</label>
            <input
              className={`rectangle-2 ${formData.emailError ? "error" : ""}`}
              type="email"
              name="Email"
              value={formData.Email}
              onChange={emailHandleChange}
              required
            />

            <br />
            <label className="password">Password:</label>
            <input
              className="rectangle-3"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="not-registered">
              <span className="text-wrapper">Not registered? </span>
              <span className="span">
                <button onClick={goToRegistration}>Register Here</button>
              </span>
            </div>
            <div className="overlap-group">
              <div className="LOGIN">LOGIN</div>
            </div>
            <div className="button">
              <button href="" type="submit" className="login-2">
                Login
              </button>
              {lockoutMessage && (
                <p className="lockout-message">{lockoutMessage}</p>
              )}
            </div>

            {/* INSTRUCTIONS AND GUIDELINES */}
            <div className="overlap2">
              <div className="divs" />
              <div className="download-guidelines">
                <a href="/PDFs/NITI_Internship_Guidelines.pdf">
                  Download Guidelines
                </a>
              </div>
              <div className="rectangle--" />
              <div className="instruction">
                <div className="overlap-group1">
                  <div className="INSTRUCTIONS">INSTRUCTIONS</div>
                </div>
                <div className="download">
                  <a href="/PDFs/INSTRUCTIONS_INTERNSHIP_NITI_SCHEME.pdf">
                    Download Instructions for filling the <br />
                    online Internship Application.
                  </a>
                </div>
                <div className="GUIDELINES">GUIDELINES</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
