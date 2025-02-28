import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { jwtDecode } from 'jwt-decode'
import ModalCrearUsuario from "./ModalCrearUsuario";
import Usuario from "./Usuario";

const SidebarUsuarios = () => {
  const { usuarios, handleModalCrearUsuario, listaUsuarios } = useAuth();

  useEffect(()=>{
    listaUsuarios()
  },[])

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token)

  // BOT COMERCIAL
/*   const cond = decoded.id === '63ade3a73abf97575a693496' */

  const cond = decoded.id === '673361c5dd2e609c5d217237' || decoded.id === '6732050494775e2b04367069'|| '67c21551b8fa93039e1a6224'
  // COMERCIAL PROPIA
  // const cond = decoded.id === '6732050494775e2b04367069'

  // BOT COMERCIAL
  const filtrados = usuarios.filter(user => user.roles[0] === '63ade3a73abf97575a693490')
  // COMERCIAL PROPIA
  // const filtrados = usuarios.filter(user => user.roles[0] === '6732050494775e2b04367060')
  

  

  return (
    <>
      <aside className="md:w-80 lg:w-3/12 px-5 py-5 bg-gray-100 overflow-hidden  border-r border-stone-300 h-full">
        {cond && (
          <button
            type="button"
            className="w-full flex items-center justify-center bg-indigo-300 hover:bg-indigo-600  font-medium text-lg transition ease-out duration-150 p-2 rounded-lg text-white mb-4 mt-16"
            onClick={handleModalCrearUsuario}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
            Crear Usuario
          </button>
        )}
        
        <div className={`overflow-scroll  scrollbar-hide ${cond ? 'mt-4 h-3/4' : 'mt-14 h-full'}    border-b border-t border-stone-300 pt-4`}>
          {cond ? (
            usuarios.map((usuario) => (
              <Usuario key={usuario._id} usuario={usuario} />
            ))
          ) : (
            filtrados.map((usuario) => (
              <Usuario key={usuario._id} usuario={usuario} />
            ))
          ) 
        }
        </div>
      </aside>
      <ModalCrearUsuario />
    </>
  );
};

export default SidebarUsuarios;
