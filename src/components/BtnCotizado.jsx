import React, { useState, useEffect } from "react";
import { useChats } from "../hooks/useChats";
import { useNavigate } from "react-router-dom";

const BtnCotizado = ({ruta, telefono}) => {
    const [cond, setCond] = useState(true);
    const {
      chats,
      setChats,
      chatsRech,
      setChatsRech,
      socket,
      handleModalCotizado,
    } = useChats();
  
    const navigate = useNavigate();

    useEffect(() => {
        if (ruta === "residual" || ruta === "cotiasesor" ) {
          setCond(false);
        }
    }, []);

    const handleClickButton = () => {
        handleModalCotizado()
    }
  
  return (
    <button
      className={`bg-gray-300 text-gray-100 mb-1 w-28 font-bold p-1 rounded-lg flex items-center justify-center ${
        cond
          ? "cursor-not-allowed"
          : "hover:bg-yellow-600 transition-all cursor-pointer"
      }`}
      disabled={cond}
      onClick={handleClickButton}
    >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
    </svg>

      <p className="text-sm">Cotizar</p>
    </button>
  )
}

export default BtnCotizado