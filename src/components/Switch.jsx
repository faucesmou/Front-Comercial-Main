import React from "react";

const Switch = ({ isOn, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      className={`${
        isOn ? "bg-blue-500" : "bg-gray-300"
      } relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-200 mb-2`}
    >
      <span
        className={`${
          isOn ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform bg-white rounded-full transition-transform duration-200`}
      />
    </div>
  );
};

export default Switch;
