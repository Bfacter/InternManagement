import React,{useState} from 'react';
import RegistrationForm from './components/RegistrationPage/Registration';
import LoginForm from './components/LoginPage/Login';
import PageNav from './components/MainNavbar/nav1';
import PageFoot from './components/MainFooter/Footer';
import Form from './components/MainForm/Form';

const App = () => {
  const [textSize, setTextSize] = useState(16)
  const increaseTextSize = () => {
    setTextSize(prevSize => prevSize + 2); // Increase by 2px
  };
  
  const decreaseTextSize = () => {
    setTextSize(prevSize => prevSize - 2); // Decrease by 2px
  };
  
  const resetTextSize = () => {
    setTextSize(16); // Reset to default size
  };
  
  const [currentPage, setCurrentPage] = useState('LoginForm');
  const goToLogin = () => {
    setCurrentPage('LoginForm');
  };
  const goToRegistration = () => {
    setCurrentPage('RegistrationForm');
  };
  const goToForm = () => {
    setCurrentPage('Form');
  };
  return (
    <div>
      <PageNav/>
      <div>
      <button onClick={decreaseTextSize}>A-</button>
      <button onClick={resetTextSize}>A</button>
      <button onClick={increaseTextSize}>A+</button>
    </div>
      {currentPage === 'LoginForm' && <LoginForm goToRegistration={goToRegistration} goToForm={goToForm} />}
      {currentPage === 'RegistrationForm' && <RegistrationForm goToLogin={goToLogin} />}
      {currentPage === 'Form' && <Form />}
      <PageFoot/>
    </div>
  );
};

export default App;