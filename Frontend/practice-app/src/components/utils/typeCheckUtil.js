export const isFNameValid = (name) => {
    const nameRegex =/^(?=.*[a-z])(?=.*[A-Z])/;
    return nameRegex.test(name);
  };
  export const isAgeVaild = (Dob) =>{
    const dobDate = new Date(Dob);
    const todayDate = new Date();
    const age = todayDate.getFullYear() - dobDate.getFullYear();
    if (age < 18) {
        return false;
      }
      return true;
  }
  export const isEmailValid=(Email)=>{
    const emailRegex= /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(Email);
}
export const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
