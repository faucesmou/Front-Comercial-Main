import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SidebarUsuarios from "../components/SidebarUsuarios";
import HeaderUI from "../components/HeaderUI";
import Spinner from "../components/Spinner";

const RutaUsuarios = () => {
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
      {auth.token && usuario.roles[0].name === "admin" ? (
        <div className="bg-gray-200  flex flex-col justify-start">
          {/* <Header /> */}
          {/* <div className=""> */}
          <HeaderUI />
          {/* </div> */}
          <div className="flex h-screen">
            <SidebarUsuarios />
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

export default RutaUsuarios;
