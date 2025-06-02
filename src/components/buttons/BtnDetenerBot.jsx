/* import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useChats } from "../../hooks/useChats"; */
import { useEffect, useState } from "react";
import { useChats } from "../../hooks/useChats";
import { useNavigate } from "react-router-dom";

let socket;

const BtnDetenerBot = ({ ruta, telefono }) => {
  const [cond, setCond] = useState(true);
   const [activoBot, setActivoBot] = useState(true); 
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
    if (ruta === "chats" || ruta === "residual" || ruta === "ventas" || ruta === "cotiasesor"|| ruta === "rechazado" ) {
      setCond(false);
    }

    // 🔁 Pedimos el estado actual del bot
     socket.emit("getBotStatus", { telefono });
  
     // ⏬ Escuchamos la respuesta del backend
     socket.on("botStatus", (estado) => {
       setActivoBot(estado);
     });
  return () => {
      socket.off("botStatus");
    };

  }, []);


    

  const handleDesactivarBot = () => {
  const chat = chats.find((c) => c.telefono === telefono);
  if (!chat) return;

  // Enviar solo este campo sin tocar la condición
  socket.emit("toggleBotActivo", {
    telefono,
    activoBot: false,
  });

  alert("Bot desactivado para este chat");
};


  const handleClickButton2 = () => {
    try {
      handleModalRechazo();
   
      const chat = chats.find((chat) => chat.telefono === telefono);
      const chatsFiltrados = chats.filter((chat) => chat.telefono !== telefono);
      chat.condicion = "Rechazado";
      setChats(chatsFiltrados);
      setChatsRech([chat, ...chatsRech]);
      socket.emit("condicion", chat);
      navigate(`/${ruta}`);
    } catch (error) {
      console.error(error);
    }
  };

//prueba botón
 const handleToggleBot = () => {
    const nuevoEstado = !activoBot;

    socket.emit("toggleBotActivo", {
      telefono,
      activoBot: nuevoEstado,
    });

    setActivoBot(nuevoEstado);

    /* alert(`Bot ${nuevoEstado ? "conectado" : "desactivado"} para este chat`); */
  };

  const handleClickButton = () => {
    try {
      handleModalRechazo();
      const chat = chats.find((chat) => chat.telefono === telefono);
      const chatsFiltrados = chats.filter((chat) => chat.telefono !== telefono);
      chat.condicion = "Rechazado";
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
      className={`${
        cond
          ? "cursor-not-allowed bg-gray-500"
          : activoBot
          ? "hover:bg-red-600 bg-gray-500"
          : "hover:bg-green-600 bg-green-500"
      } text-gray-100 mb-1 w-35 font-bold p-1 rounded-lg flex items-center justify-center transition-all`}
     /*  disabled={cond} */
      onClick={handleToggleBot}
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

      <p className="text-sm pr-2">
        {activoBot ? "Detener Bot" : "Conectar Bot"}
      </p>
    </button>
  );
/*   return (
    <button
      className={`bg-gray-500 text-gray-100 mb-1 w-35 font-bold p-1 rounded-lg flex items-center justify-center ${
        cond
          ? "cursor-not-allowed"
          : "hover:bg-red-600 transition-all cursor-pointer"
      }`}
      disabled={cond}
      onClick={handleDesactivarBot}
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

      <p className="text-sm pr-2">Detener Bot</p>
    </button>
  ); */
};

export default BtnDetenerBot;
