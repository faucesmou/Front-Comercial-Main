import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SidebarResVen from "../components/SidebarResVen";
import HeaderUI from "../components/HeaderUI";
import Spinner from "../components/Spinner";

const RutaResidual = () => {
  const { auth, cargando, usuario } = useAuth();

  const location = useLocation()
  const elemento = location.pathname.split('/')[1]
  

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
      {(auth.token && usuario.roles[0].name === "admin") ||
      (auth.token && usuario.roles[0].name === "user" && elemento !== 'buscador') ? (
        <div className="bg-gray-200  flex flex-col justify-start">
          {/* <Header /> */}
          {/* <div className="h-full"> */}
          <HeaderUI />
          {/* </div> */}
          <div className="flex h-full h-screen">
            <SidebarResVen />
            <main className="flex-1 mt-16">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RutaResidual;
