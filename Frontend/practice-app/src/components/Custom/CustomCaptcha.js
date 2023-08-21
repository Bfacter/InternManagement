import React, { useState, useEffect } from "react";
import "./CustomCaptchaCss.css"
const CustomCaptcha = ({ onCaptchaVerified }) => {
  const [captchaChallenge, setCaptchaChallenge] = useState(generateCaptchaChallenge());
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaValid, setCaptchaValid] = useState(false);

  useEffect(() => {
    setCaptchaChallenge(generateCaptchaChallenge());
  }, [captchaValid]);

  function generateRandomString(length) {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  function generateCaptchaChallenge() {
    const randomString = generateRandomString(6);
    return `"${randomString}"`;
  }

  const handleChange = (e) => {
    setCaptchaInput(e.target.value);
    setCaptchaValid(e.target.value === captchaChallenge);
  };

  const handleReloadCaptcha = () => {
    setCaptchaChallenge(generateCaptchaChallenge());
    setCaptchaInput("");
    setCaptchaValid(false);
  };

  useEffect(() => {
    onCaptchaVerified(captchaValid);
  }, [captchaValid, onCaptchaVerified]);

  return (
    <div className="captcha">
      <label htmlFor="captchaChallenge" className="CLable">CAPTCHA: {captchaChallenge}</label>
      <input
      className="CInput"
        type="text"
        id="captchaChallenge"
        name="captchaChallenge"
        value={captchaInput}
        onChange={handleChange}
        required
      />
      <button type="button" onClick={handleReloadCaptcha} className="CButton">
        Reload CAPTCHA
      </button>
    </div>
  );
};

export default CustomCaptcha;
