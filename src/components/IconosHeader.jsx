import React, { useEffect, useState } from "react";
import { useChats } from "../hooks/useChats";
import { useResidual } from "../hooks/useResidual";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BtnRechazar from "./BtnRechazar";
import BtnVenta from "./BtnVenta";
import BtnCotizado from "./BtnCotizado";
import BtnResidual from "./BtnResidual";

let socket;
//ESTO ES UNA PRUEBA
const IconosHeader = () => {
  const { insertarVenta, infoChat, buscarChat, handleModalTimer, socket } =
    useChats();
  const { setPersona, handleModalResidual } = useResidual();
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  const location = useLocation();
  const pathname = location.pathname;
  const elemento = pathname.split("/")[1];
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  /* useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);
 */
  const handleClick = async () => {
    if (elemento === "ventas") {
      await insertarVenta(id);
      // await buscarChat(id);
    } else {
      const obj = {
        numero: `${id}@c.us`,
        condicion: "Pre-venta",
      };
      socket.emit("modificar-condicion", obj);
      navigate("/chats");
    }

    // VUELTA ATRAS
    await insertarVenta(id);
    // await buscarChat(id);
    const obj = {
      numero: `${id}@c.us`,
      condicion: "Venta",
    };
    socket.emit("modificar-condicion", obj);
    navigate("/chats");
  };

  const handleClickRechazar = () => {
    if (elemento === "temporal") {
      const obj = {
        numero: `${id}@c.us`,
        condicion: "Rechazado",
      };
      socket.emit("modificar-condicion", obj);
      navigate("/temporal");
    } else {
      const obj = {
        numero: `${id}@c.us`,
        condicion: "Temporal",
      };
      socket.emit("modificar-condicion", obj);
      setPersona(id, obj.condicion);
      navigate("/chats");
    }
  };

  const handleClickRegresar = async () => {
    // await insertarVenta(id, false);
    // await buscarChat(id);
    const obj = {
      numero: `${id}@c.us`,
      condicion: "Abierto",
    };
    socket.emit("modificar-condicion", obj);
    navigate("/chats");
  };
  //se agrega condicion para evitar que los usuers puedan acceder al boton de pasar a residual:

  const allowedIds = ['6732050494775e2b04367069', '673361c5dd2e609c5d217237'];
  const condicionAdmin = allowedIds.includes(decoded.id);

  return (
    <>
      <div className="flex   items-end gap-2">
        {infoChat.confirmado && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        {/* boton para pasar a residual */}
        {/*  {elemento !== "residual" && (
          <button onClick={handleModalResidual}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-slate-400 hover:text-slate-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
              />
            </svg>
          </button>
        )} */}

        {/* boton para eliminar el chat */}
        {/*  <button onClick={handleModalTimer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-slate-400 hover:text-slate-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button> */}
        {/* boton temporal para regresar el chat a la interaccion del BOT */}
        {/* {elemento !== "rechazado" && elemento !== "residual" && ( */}
        <div className="flex flex-col  gap-1 md:block">
          {/* <button
            className="bg-gray-300 mb-1 w-28 text-gray-100 font-bold p-1 rounded-lg flex items-center justify-center  transition-all hover:bg-teal-600 "
            onClick={handleClickRegresar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
            <p className="text-sm">BOT</p>
          </button> */}
          {/* <Switch isOn={isOn} handleToggle={toggleSwitch} /> Jose */}
          <BtnVenta ruta={elemento} telefono={id} />
          <BtnRechazar ruta={elemento} telefono={id} />
    {condicionAdmin && (
                       <BtnResidual ruta={elemento} telefono={id} />
                    )}

        {/*   <BtnResidual ruta={elemento} telefono={id} /> */}
          {/* Botón cotizar --------------------------------------------------->>> */}
     {/*      <BtnCotizado ruta={elemento} telefono={id} /> */}

          {/* <button
            className={`bg-gray-300 text-gray-100 mb-1 w-28 font-bold p-1 rounded-lg flex items-center justify-center ${
              elemento === "temporal"
                ? "hover:bg-red-600"
                : "hover:bg-amber-600"
            }  transition-all ${infoChat?.confirmado && "hidden"}`}
            onClick={() => handleClickRechazar()}
          >
            {elemento === "temporal" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}

            <p className="text-sm">
              {elemento === "temporal" ? "Rechazar" : "Temporal"}
            </p>
          </button> */}
          {/*  <button
            className={`bg-gray-300 text-gray-100 w-28 font-bold p-1 rounded-lg flex items-center justify-center ${
              elemento === "ventas"
                ? "hover:bg-green-600"
                : "hover:bg-indigo-600"
            }  transition-all ${infoChat?.confirmado && "hidden"}`}
            onClick={() => handleClick()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            <p className="text-sm">
              {elemento === "ventas"
                ? "Confirmar"
                : elemento === "pre-venta"
                ? "Venta"
                : "Pre-venta"}
            </p>
          </button> */}
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default IconosHeader;
