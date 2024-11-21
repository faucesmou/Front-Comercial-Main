import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useChats } from "../hooks/useChats";
import Sidebar from "../components/Sidebar";
import HeaderUI from "../components/HeaderUI";
import Spinner from "../components/Spinner";

const RutaChats = () => {
  const { auth, cargando, usuario } = useAuth();

  let rol;

  if (Object.keys(usuario).length > 0) {
    rol = usuario.roles[0].name;
  }

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
      {auth.token && rol === "admin" ? (
        <div className="bg-gray-200  flex flex-col justify-start">
          <HeaderUI />
          {/* <div className="h-full"> */}
          {/* </div> */}
          <div className="flex h-screen">
            <Sidebar />
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

export default RutaChats;
