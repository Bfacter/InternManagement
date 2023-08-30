import React, { useState } from "react";
import RegistrationForm from "./components/RegistrationPage/Registration";
import LoginForm from "./components/LoginPage/Login";
import PageNav from "./components/MainNavbar/nav1";
import PageFoot from "./components/MainFooter/Footer";
import Form from "./components/MainForm/Form";
import PrintApplication from "./components/MainPrintApplication/PrintApplication";
const App = () => {
  const [currentPage, setCurrentPage] = useState("LoginForm");
  const [RID, setRID] = useState(null);

  const goToLogin = () => {
    setCurrentPage("LoginForm");
  };
  const goToRegistration = () => {
    setCurrentPage("RegistrationForm");
  };
  const goToForm = (RID, status) => {
    if (status === "a") {
      setRID(RID);
      setCurrentPage("Form");
    } else {
      setRID(RID);
      setCurrentPage("PrintApplication");
    }
  };

  return (
    <div>
      <PageNav />
      {currentPage === "LoginForm" && (
        <LoginForm goToRegistration={goToRegistration} goToForm={goToForm} />
      )}
      {currentPage === "RegistrationForm" && (
        <RegistrationForm goToLogin={goToLogin} />
      )}
      {currentPage === "PrintApplication" && (
        <PrintApplication RID={RID} goToLogin={goToLogin} />
      )}
      {currentPage === "Form" && <Form RID={RID} goToLogin={goToLogin} />}
      <PageFoot />
    </div>
  );
};

export default App;
