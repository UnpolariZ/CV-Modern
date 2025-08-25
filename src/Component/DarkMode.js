import React from 'react';

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div>
      <label htmlFor="dark-light-mode">
        <input
          id="dark-light-mode"
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
      </label>
    </div>
  );
};

export default DarkModeToggle;