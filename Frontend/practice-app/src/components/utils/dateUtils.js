// dateUtils.js

export const getCurrentMonthPlusTwoOptions = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
  
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const options = [];
  
    for (let i = 0; i < 6; i++) {
      const nextMonthIndex = (currentMonth + 2 + i) % 12;
      const nextYear = currentYear + Math.floor((currentMonth + 2 + i) / 12);
      options.push({
        label: `${months[nextMonthIndex]} ${nextYear}`,
        value: `${months[nextMonthIndex]}-${nextYear}`
      });
    }
  
    return options;
  };
  