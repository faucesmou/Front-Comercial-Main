import React, { useState, useEffect } from "react";
import { useChats } from "../hooks/useChats";
import { useNavigate } from "react-router-dom";

let socket;

const BtnResidual = ({ ruta, telefono }) => {
  const [cond, setCond] = useState(true);
  const {
    chats,
    setChats,
    chatsRech,
    setChatsRech,
    socket,
    handleModalRechazo,
  } = useChats();

  const navigate = useNavigate();

  /*  useEffect(() => {
    socket = io(`${import.meta.env.VITE_BACKEND_URL}:443`);

    return () => {
      socket.disconnect(); // Manejar la desconexión al desmontar el componente
    };
  }, []); */

  useEffect(() => {
    if (ruta === "chats" || ruta === "residual" || ruta === "ventas" || ruta === "cotiasesor") {
      setCond(false);
    }
  }, []);

  const handleClickButton = () => {
    try {
      handleModalRechazo();
    /*   return; */
      const chat = chats.find((chat) => chat.telefono === telefono);
      const chatsFiltrados = chats.filter((chat) => chat.telefono !== telefono);
      chat.condicion = "Residual";
      setChats(chatsFiltrados);
      setChatsRech([chat, ...chatsRech]);
      socket.emit("condicion", chat);
      navigate(`/${ruta}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className={`bg-gray-300 text-gray-100 mb-1 w-28 font-bold p-1 rounded-lg flex items-center justify-center ${
        cond
          ? "cursor-not-allowed"
          : "hover:bg-red-600 transition-all cursor-pointer"
      }`}
      disabled={cond}
      onClick={handleClickButton}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>

      <p className="text-sm">Residual</p>
    </button>
  );
};

export default BtnResidual;
