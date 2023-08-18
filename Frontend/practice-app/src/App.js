import React,{useState} from 'react';
import RegistrationForm from './components/RegistrationPage/Registration';
import LoginForm from './components/LoginPage/Login';
import PageNav from './components/MainNavbar/nav1';
import PageFoot from './components/MainFooter/Footer';
import Form from './components/MainForm/Form';

const App = () => {
  
  const [currentPage, setCurrentPage] = useState('LoginForm');
  const [userRID, setUserRID] = useState(null);
  const goToLogin = () => {
    setCurrentPage('LoginForm');
  };
  const goToRegistration = () => {
    setCurrentPage('RegistrationForm');
  };
  const goToForm = (RID) => {
    setUserRID(RID)
    setCurrentPage('Form');
  };
  return (
    <div>
      <PageNav/>
      {currentPage === 'LoginForm' && <LoginForm goToRegistration={goToRegistration} goToForm={goToForm} />}
      {currentPage === 'RegistrationForm' && <RegistrationForm goToLogin={goToLogin} />}
      {currentPage === 'Form' && <Form userRID={userRID}/>}
      <PageFoot/>
    </div>
  );
};

export default App;