import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChats } from "../hooks/useChats";

const BtnVenta = ({ ruta, telefono }) => {
  const [cond, setCond] = useState(true);

  const navigate = useNavigate();

  const {
    socket,
    chatsRes,
    setChatsRes,
    chatsVen,
    setChatsVen,
    handleModalVenta,
  } = useChats();
  useEffect(() => {
    if (ruta === "residual" || ruta === "cotiasesor") {
      setCond(false);
    }
  }, []);

  const handleClickButton = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      handleModalVenta();
      return;
      const chat = chatsRes.find((chat) => chat.telefono === telefono);
      const chatsFiltrados = chatsRes.filter(
        (chat) => chat.telefono !== telefono
      );
      console.log(chatsFiltrados);
      chat.condicion = "Venta";
      setChatsRes(chatsFiltrados);
      setChatsVen([chat, ...chatsVen]);
      socket.emit("venta", { chat, token });
      navigate(`/${ruta}`);
      //   navigate(`/chats`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className={`bg-gray-300 text-gray-100 mb-1 w-28 font-bold p-1 rounded-lg flex items-center justify-center ${
        cond
          ? "cursor-not-allowed"
          : "hover:bg-green-600 transition-all cursor-pointer"
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
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>

      <p className="text-sm">Venta</p>
    </button>
  );
};

export default BtnVenta;
