import React, { useState } from "react";
import "./Printapplication.css";
const PrintApplication = ({ RID, goToLogin }) => {
  const handleLogout = () => {
    window.alert("Logging Out");
    goToLogin();
  };
  return (
    <div>
      <div className="heading">
        <div className="logout">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <h1 className="headingtext">
          Application form for Internship in Niti Aayog
        </h1>
      </div>
      Application has already been submitted
    </div>
  );
};
export default PrintApplication;
