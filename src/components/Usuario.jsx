import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import User from "./User";
import * as herramientas from "../helpers/herramientas";
import { Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const Usuario = ({ usuario }) => {
  const [estado, setEstado] = useState('')
  const fecha = herramientas.formatearFecha(usuario.updatedAt);

  const roles = usuario.roles[0];

  const token = localStorage.getItem('token')

  const params = useParams()

  useEffect(() => {
    // console.log(usuario);
    
    const inicio = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
  
  
        const { data } = await clienteAxios.get(
          `/user/${usuario._id}`,
          config
        );
        setEstado(data.estado)
        
      } catch (error) {
        console.log(error);
      }
    }
    inicio()
  },[params,])

  let nombreRol = "";

  switch (roles) {
    case import.meta.env.VITE_ADMIN:
      nombreRol = "ADMIN";
      break;
    case import.meta.env.VITE_MODERATOR:
      nombreRol = "MODERATOR";
      break;
    case import.meta.env.VITE_USER:
      nombreRol = "USER";
      break;
  }

  return (
    <>
      <Link to={`/usuarios/${usuario._id}`}>
        <div
          className={`${
            nombreRol === "ADMIN"
              ? "bg-yellow-300 hover:bg-yellow-500 hover:text-white hover:border"
              : "bg-indigo-300 hover:bg-indigo-500 hover:text-white hover:border"
          }  rounded-lg p-4 mb-3 flex transition-all`}
        >
          <User />
          <div className="w-full overflow-hidden">
            <div className="flex mb-1 items-center">
              <p className="flex-grow">{usuario.username}</p>
              <small className="font-light text-sm">{fecha}</small>
            </div>

            <small
              className={`overflow-ellipsis w-fit  rounded-lg overflow-hidden whitespace-nowrap block  font-bold `}
            >
              {nombreRol}
            </small>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Usuario;
