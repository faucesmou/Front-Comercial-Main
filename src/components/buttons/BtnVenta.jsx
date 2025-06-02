import { useEffect, useState } from "react";
import { useChats } from "../../hooks/useChats";
import { useNavigate } from "react-router-dom";

const BtnVenta = ({ ruta, telefono }) => {
  console.log("Ruta en BtnVenta----:", ruta);
  console.log("Teléfono en BtnVenta:----", telefono);
  
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

/*   useEffect(() => {
    if (ruta === "residual" || ruta === "cotiasesor") {
      setCond(false);
    }
  }, []); */

  const handleClickButton = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      handleModalVenta();
      return;
      const chat = chatsRes.find((chat) => chat.telefono === telefono);
      console.log("Chat encontrado====>>>:", chat);
      console.log("Chat chat.telefono====>>>:", chat.telefonot);
      const chatsFiltrados = chatsRes.filter(
        (chat) => chat.telefono !== telefono
      );
      console.log(chatsFiltrados);
      chat.condicion = "Venta";
      setChatsRes(chatsFiltrados);
      setChatsVen([chat, ...chatsVen]);
      socket.emit("venta", { chat, token });
      navigate(`/${ruta}`);
        navigate(`/chats`);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasarAVenta = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/pasar-a-venta`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify({ telefono }), // solo enviás el teléfono
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Chat pasado a venta exitosamente");

      // Actualiza el estado del frontend
      const chatActualizado = chatsRes.find((c) => c.telefono === telefono);
      if (chatActualizado) {
        chatActualizado.condicion = "Venta";
        setChatsVen([chatActualizado, ...chatsVen]);
        setChatsRes(chatsRes.filter((c) => c.telefono !== telefono));
      }

      navigate(`/${ruta}`);
    } else {
      console.error("Error al pasar a venta:", data);
    }
  } catch (error) {
    console.error("Error en handlePasarAVenta:", error);
  }
};

const handlePasarAVenta2 = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const url = "/api/pasar-a-venta"; // Ruta hacia tu backend
    const objeto = { telefono }; // Solo mandamos el teléfono
    const config = {
      headers: {
        "x-token": token,
      },
    };

    const { data } = await clienteAxios.post(url, objeto, config);
    console.log("Respuesta del backend:", data);

    // Actualizamos el estado local si el backend responde bien
    const chatActualizado = chatsRes.find((c) => c.telefono === telefono);
    if (chatActualizado) {
      chatActualizado.condicion = "Venta";
      setChatsVen([chatActualizado, ...chatsVen]);
      setChatsRes(chatsRes.filter((c) => c.telefono !== telefono));
    }

    navigate(`/${ruta}`);
  } catch (error) {
    console.error("Error al pasar a venta:", error.response?.data || error.message);
  }
};



  return (
    <button
      className={`bg-gray-500 text-gray-100 mb-1 w-28 font-bold p-1 rounded-lg flex items-center justify-center hover:bg-green-600 transition-all cursor-pointer`
      /* ${
        cond
          ? "cursor-not-allowed"
          : "hover:bg-green-600 transition-all cursor-pointer"
      }` */
    }
     /*  disabled={cond} */
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
