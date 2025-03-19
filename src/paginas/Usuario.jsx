import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { formatearFecha } from "../helpers/herramientas";
import ModalEliminar from "../components/ModalEliminar";
import { jwtDecode } from 'jwt-decode'
import clienteAxios from "../config/clienteAxios";
import ModalCrearUsuario from "../components/ModalCrearUsuario";


const Usuario = () => {
  const [selected, setSelected] = useState('')

  const { usuarios, handleModalCrearUsuario, handleModalEliminar } = useAuth();
  const params = useParams();
  const { id } = params;
  const key = id.split('&')[0]
  const estado = id.split('&')[1]

  const user = usuarios.find((user) => user._id === key);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token)
 /*  const cond = decoded.id === '63ade3a73abf97575a693496' */
 const allowedIds = ['6732050494775e2b04367069', '673361c5dd2e609c5d217237'];
 const cond = allowedIds.includes(decoded.id);
  
  

  useEffect(()=>{
    setSelected('')
  },[params])


  
  
 


  let tipo;


  switch (user.roles[0]) {
    case import.meta.env.VITE_MODERATOR:
      tipo = "Medio";
      break;
    case import.meta.env.VITE_ADMIN:
      tipo = "Admin";
      break;
    case import.meta.env.VITE_USER:
      tipo = "User";
      break;
  }
  const fecha = formatearFecha(user.updatedAt);

  const handleChange = (e) => {
    setSelected(e.target.value)
  }

  const handleClick = async () => {
    try {
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(user._id);
      
  
      const { data } = await clienteAxios.post(
          "/user/cambiar-estado",
          { estado: selected, id: user._id},
          config
      )


      if(data.msg === 'ok'){
        alert('Estado cambiado con éxito')
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="bg-gray-200 h-full px-20  flex flex-col justify-center items-center">
        <div 
          className=" w-full bg-slate-300 h-[500px] rounded-lg flex flex-col items-center justify-center gap-2 p-10">
          <div className="w-5/6 bg-slate-200 h-72 rounded-lg flex items-center  p-6">
            <ul className="ml-5 flex flex-col gap-5 w-2/3">
              <li className="w-fit p-1 bg-slate-400 text-gray-100 font-bold rounded-lg flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <p className="font-light">
                  Usuario:{" "}
                  <span className="font-bold ml-1"> {user.username}</span>
                </p>
              </li>
              <li className="w-fit p-1 bg-slate-400 text-gray-100 font-bold rounded-lg flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                  />
                </svg>
                <p className="font-light">
                  Email: <span className="font-bold ml-1"> {user.email}</span>
                </p>
              </li>
              <li className="w-fit p-1 bg-slate-400 text-gray-100 font-bold rounded-lg flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
                <p className="font-light">
                  Actualización:
                  <span className="font-bold ml-1"> {fecha}</span>
                </p>
              </li>
              <li className="w-fit p-1 bg-slate-400 text-gray-100 font-bold rounded-lg flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>

                <p className="font-light">
                  Tipo:
                  <span className="font-bold ml-1"> {tipo}</span>
                </p>
              </li>
              <li className="w-fit p-1 bg-slate-400 text-gray-100 font-bold rounded-lg flex">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-6 h-6 mr-1"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
                  />
                </svg>
                <div className="font-light">
                  Estado: {'   ' + user.estado.toUpperCase()}
                  {/* <span className="font-bold ml-1"> {tipo}</span> */}
                  <div>
                    <select
                      className="bg-slate-500 w-32 rounded px-2" 
                      value={selected} 
                      onChange={handleChange}
                    >
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                    </select>
                    <button className="bg-slate-300 hover:bg-slate-600 rounded ml-2 px-4" onClick={handleClick}>
                      &rArr;
                    </button>
                  </div>
                 
                </div>
              </li>
            </ul>
            <div className="ml-16 w-1/3 h-full flex border-l-2 border-opacity-70 border-slate-400 flex-col items-end justify-center gap-16">
              <button
                className="w-28 p-2 bg-gray-300 rounded-lg text-gray-600 hover:bg-indigo-600 transition-all hover:text-white"
                onClick={handleModalCrearUsuario}
              >
                Editar
              </button>
              {cond && (
                <button
                  className="w-28 p-2 bg-gray-300 rounded-lg text-gray-600 hover:bg-red-600 transition-all hover:text-white"
                  onClick={handleModalEliminar}
                >
                  Eliminar
                </button>
              )}
              
            </div>
          </div>
        </div>
      </div>
      <ModalCrearUsuario/>
      <ModalEliminar />
    </>
  );
};

export default Usuario;
