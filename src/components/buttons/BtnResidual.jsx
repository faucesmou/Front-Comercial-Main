import { useEffect, useState } from "react";
import { useChats } from "../../hooks/useChats";
import { useNavigate } from "react-router-dom";
let socket;

const BtnResidual = ({ ruta, telefono }) => {
  console.log("ingresando a BtnResidual-----------");
  console.log("ruta es-----------", ruta);
  
  const [cond, setCond] = useState(true);
  const {
    chats,
    setChats,
    chatsRech,
    setChatsRech,
    socket,
    ModalResidual,
    handleModalRechazo,
    pasarResidual
  } = useChats();

  const navigate = useNavigate();

  /*  useEffect(() => {
    socket = io(`${import.meta.env.VITE_BACKEND_URL}:443`);

    return () => {
      socket.disconnect(); // Manejar la desconexión al desmontar el componente
    };
  }, []); */

  useEffect(() => {
    if (ruta === "chats" || ruta === "residual" || ruta === "ventas" || ruta === "cotiasesor"|| ruta === "rechazado") {
      setCond(false);
    }
  }, []);

  const handleClickButton = () => {
    try {
      ModalResidual();
     /*  handleModalRechazo(); */
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
  const handleClickButton2 = () => {
      console.log('INGRESANDO A handleClickButton2 de btnResidual-----------');
    try {
      pasarResidual(telefono);
     /*  handleModalRechazo(); */
      return;
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
      className={`bg-gray-500 text-gray-100 mb-1 w-28 font-bold p-1 rounded-lg flex items-center justify-center hover:bg-yellow-600 transition-all cursor-pointer `}
    /*   disabled={cond} */
      onClick={handleClickButton2}
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
