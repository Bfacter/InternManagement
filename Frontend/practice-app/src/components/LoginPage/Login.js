import React, { useState } from "react";
import axios from "axios";
import "./LoginStyle.css";
const LoginForm = ({ className,goToForm,goToRegistration}) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4444/login",
        formData
      );

      window.alert("Login Succesful!");

      goToForm(response.data.RID);
      
    } catch (error) {
      if (error.response.status === 401) {
        if (error.response.data.message.includes("locked out")) {
          setLockoutMessage(error.response.data.message);
        } else {
          window.alert("Invalid Credentials");
        }
      } else {
        window.alert("Error logging in:");
      }
    }
  };

  return (
    <div className="Mainloginpage">
     

      <div className={`side-bar ${className}`}>
        <div className="overlap">
          <div>
          <img
            className="rectangle"
            alt="Rectangle"
            src="/images/rectangle-4.jpg"
          /></div>
          <div className="div">
          <form className="login" onSubmit={handleSubmit}>
            <label className="email-id">Email Id:</label>
            <input
              className="rectangle-2"
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
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
              {lockoutMessage && <p className="lockout-message">{lockoutMessage}</p>}
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
    </div>
  );
};

export default LoginForm;
