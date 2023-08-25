// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import "./RegistrationStyle.css";

function Captcha({ setIsCaptchaVerified }) {
  const [user, setUser] = useState({
    username: "",
  });

  const [captcha, setCaptcha] = useState(""); // Initialize as an empty string
  const characters = "qazwsxedcrfvtgbyhnujmikolp1234567890";

  useEffect(() => {
    // Generate CAPTCHA only when the component mounts
    setCaptcha(generateString(6));
  }, []);

  function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    user[name] = value;
    setUser(user);
  };

  const onSubmit = (e) => {
    var element = document.getElementById("succesBTN");
    var inputData = document.getElementById("inputType");
    element.style.cursor = "wait";
    element.innerHTML = "Checking...";
    inputData.disabled = true;
    element.disabled = true;

    var myFunctions = function () {
      if (captcha === user.username) {
        element.style.backgroundColor = "green";
        element.innerHTML = "Captcha Verified";
        element.disabled = true;
        element.style.cursor = "not-allowed";
        inputData.style.display = "none";
      } else {
        element.style.backgroundColor = "red";
        element.style.cursor = "not-allowed";
        element.innerHTML = "Not Matched";
        element.disabled = true;
        //  element.disabled = true;

        var myFunction = function () {
          element.style.backgroundColor = "#007bff";
          element.style.cursor = "pointer";
          element.innerHTML = "Verify Captcha";
          element.disabled = false;
          inputData.disabled = false;
          inputData.value = "";
          return false;
        };
        setTimeout(myFunction, 5000);
      }
    };
    setTimeout(myFunctions, 5000);
    if (captcha === user.username) {
      setIsCaptchaVerified(true);
    } else {
      setIsCaptchaVerified(false);
    }
  };

  return (
    <div className="captcha">
      <label htmlFor="captcha-input">Enter Captcha</label>
      <div className="preview">{captcha}</div>
      <div className="captcha-form">
        <input
          type="text"
          id="inputType"
          name="username"
          onChange={handleChange}
          autoComplete="off" // Fixed the attribute name
          className="form-control"
          placeholder="Enter Captcha"
        />
        <button
          type="button"
          id="succesBTN"
          onClick={onSubmit}
          // disabled={user.username !== captcha}
          class="btn btn-primary ml-1 "
          style={{ width: "50%", backgroundColor: "#3b5998" }}>
          Verify Captcha
        </button>
      </div>
    </div>
  );
}

export default Captcha;
