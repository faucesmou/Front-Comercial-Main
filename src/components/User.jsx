import React from "react";

const User = () => {
  return (
    <>
      <div className="self-center text-center ">
        <div className=" w-8 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          {/* <div className="absolute bg-green-300 p-1 rounded-full bottom-0 right-0 border-gray-800 border-2"></div> */}
        </div>
      </div>
    </>
  );
};

export default User;
