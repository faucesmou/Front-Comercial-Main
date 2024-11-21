import React, { useEffect, useState } from "react";
import User from "./User";
import { useChats } from "../hooks/useChats";
import { Link, useLocation } from "react-router-dom";

const Mensaje = ({ mensaje }) => {
  const [urgente,setUrgente] = useState(false)

  const regex = /^\(audio\)+/


  let condNota = false
  if(mensaje?.nota){
    mensaje.nota.length > 0 ? condNota = true : condNota = false
  }

  
  
  const [url, setUrl] = useState("");
  if ('send' in mensaje || 'nota' in mensaje) {
    const fechaActual = new Date().toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const horaActual = new Date().toLocaleTimeString("en-US", {
      hour12: false,
    });
    const cadena = mensaje.msjSalida;
    mensaje = {
      fecha: fechaActual,
      hora: horaActual,
      msjSalida: cadena,
      operador: mensaje.operador,
      nota: mensaje.nota ? true : false
    };
  }

  const {
    infoChat,
    descargarImagen,
    imageURL,
    setImageURL,
    referencia,
    handleReferencia,
  } = useChats();

  // if (!mensaje?.fecha || !mensaje?.hora) {
  //   const fechaActual = new Date().toLocaleDateString("es-AR", {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //   });
  //   const horaActual = new Date().toLocaleTimeString();

  //   if (mensaje?.msjEntrada) {
  //     const cadena = mensaje.msjEntrada;
  //     mensaje = {
  //       fecha: fechaActual,
  //       hora: horaActual,
  //       msjEntrada: cadena,
  //     };
  //   }
  // }

  const { fecha, hora } = mensaje;

  const nuevaHora = hora.substring(0, 5);

  const keys = Object.keys(mensaje);

  const variable = 'la pija del mono de esta de verga nos vemos en narnia de la concha de tu madre pipo cipollati'
  


  useEffect(() => {
    // console.log(infoChat);
   
  }, [urgente]);

  const handleClickUrgente = () => {
    const cond = confirm('Desea darle caracter de urgente?')
    setUrgente(cond)
  }

  return (
    <>
      <div
        className={`flex mb-5 ${
          mensaje?.msjSalida && "flex-row-reverse"
        } mx-3 bottom`}
      >
        <div className="self-end">
          <User />
        </div>
        <div className="flex flex-col">
          <div
            className={`${urgente ? "bg-red-500 text-white" : condNota ? "bg-yellow-200" : 
              mensaje?.msjSalida ? "bg-indigo-300" : "bg-white"
            } p-4 w-fit max-w-3xl rounded-3xl ${
              mensaje?.msjSalida ? "rounded-br-none" : "rounded-bl-none"
            } shadow-lg mb-4`}
          >
            <div className="flex justify-between">
              <p className="mb-1 flex">
                {mensaje?.nota ? "NOTA" : mensaje?.msjSalida
                  ? "Andes Comercial"
                  : `${infoChat?.nombre ? infoChat.nombre : "Customer"}`}
                {/*  {mensaje?.nota && (
                    <button 
                      className="ml-2"
                      onClick={handleClickUrgente}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor" 
                        className={`${urgente ? "text-white" : "text-red-700"} w-6 h-6`}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" 
                        />
                      </svg>
                    </button>
                  )} */}
              </p>
              {mensaje?.msjEntrada && regex.test(mensaje.msjEntrada) && (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="h-4 w-4"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" 
                  />
                </svg>
              )}
              


            </div>

           
            <small className={`${urgente ? "text-white" : "text-gray-800"} font-light text-md `}>
              {(mensaje?.msjEntrada && mensaje.msjEntrada.endsWith(".jpeg")) ||
              (mensaje?.msjEntrada && mensaje.msjEntrada.endsWith(".jpg")) ||
              (mensaje?.msjEntrada && mensaje.msjEntrada.endsWith(".pdf")) ? (
                /* {
               <button
                  type="button"
                  className="p-2 bg-green-300 rounded-lg text-white cursor-pointer hover:bg-green-500 transition-colors"
                  onClick={() => {
                    descargarImagen(mensaje.msjEntrada);
                  }}
                >
                  {imageURL.length === 0 ? (
                    "Obtener URL"
                  ) : (
                    <a href={imageURL}>Descargar</a>
                  )}
                </button>
                  } */
                <a
                  target="_blank"
                  className="p-2 bg-green-300 rounded-lg text-white cursor-pointer hover:bg-green-500 transition-colors"
                  href={`https://comercial.createch.com.ar/${
                    mensaje.msjEntrada.endsWith(".pdf") ? "pdf" : "img"
                  }/uploads/${mensaje.msjEntrada}`}
                >
                  Ver Archivo
                </a>
              ) : (
                mensaje?.msjEntrada && mensaje.msjEntrada
              )}
              {mensaje?.msjSalida && mensaje.msjSalida}
            </small>
          </div>

          <small
            className={`text-gray-600 font-light ${
              mensaje?.msjSalida && "self-end mr-2"
            }`}
          >
            {mensaje?.msjSalida ? `
              ${Array.isArray(mensaje.msjSalida) ? `
                   ${fecha} - ${nuevaHora} - ${
                    mensaje.operador ? mensaje.operador : "BOT-Asistente"
                  }
                ` : `
                   ${fecha} - ${nuevaHora} - ${
                    mensaje.operador ? mensaje.operador : "Plantilla"
                  }
                `}
             
            ` : `
              ${fecha} - ${nuevaHora} - Cliente
            `}
          </small>
        </div>
      </div>
    </>
  );
};

export default Mensaje;
