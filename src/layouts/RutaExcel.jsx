import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import HeaderUI from "../components/HeaderUI";
import Spinner from "../components/Spinner";
import SidebarCarga from "../components/SidebarCarga";

const RutaExcel = () => {
    const { auth, cargando, usuario } = useAuth();
  
  
   
  
    //   aqui se le puede colocar un spinner de carga
    if (cargando) {
      return (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner />
        </div>
      );
    }
  return (
    <>
      {(auth.token && usuario.roles[0].name === "admin")  ? (
        <div className="bg-gray-200 flex flex-col justify-start">
          {/* <Header /> */}
          {/* <div className="h-full"> */}
          <HeaderUI />
          {/* </div> */}
          <div className="flex h-screen">
            <SidebarCarga /> 

            <main className="flex-1 mt-16">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  )
}

export default RutaExcel