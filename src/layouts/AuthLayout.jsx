import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="h-screen  sm:flex sm:justify-center sm:items-center  ">
        <div className="md:w-2/3 lg:w-2/5 flex flex-col  items-center justify-center sm:flex sm:items-center">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
