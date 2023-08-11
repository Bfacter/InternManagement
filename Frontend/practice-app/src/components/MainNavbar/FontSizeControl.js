import React, { useState } from 'react';

const FontSizeControl = () => {
  const [fontSize, setFontSize] = useState(16); // Initial font size

  const increaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize + 2); // Increase font size by 2
  };

  const resetFontSize = () => {
    setFontSize(16); // Reset font size to default (16px)
  };

  const decreaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize - 2); // Decrease font size by 2
  };

  return (
    <div className="font-size-control">
      <button onClick={decreaseFontSize}>A-</button>
      <button onClick={resetFontSize}>A</button>
      <button onClick={increaseFontSize}>A+</button>
    </div>
  );
};

export default FontSizeControl;
