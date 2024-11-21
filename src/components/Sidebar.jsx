import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Item from "./Item";
import { useChats } from "../hooks/useChats";
import ModalChatInicial from "./ModalChatInicial";
import { fcoBusqueda } from "../helpers/herramientas";

const Sidebar = () => {
  const [busqueda, setBusqueda] = useState("");
  const [arrBusqueda, setArrBusqueda] = useState([]);
  const {
    handleModalChatInicial,
    chats,
    setChats,
    chatsRech,
    setChatsRech,
    chatsVen,
    setChatsVen,
    contChats,
    socket,
  } = useChats();

  const location = useLocation();

  

  const path = location.pathname;

  useEffect(() => {
    const chatEntrante =  (chat) => {

      if(chat.condicion !== "Abierto") return
      let nuevaLista
      let existe = chats.some(cht => cht.telefono === chat.telefono)
      
      if(existe)
        nuevaLista = chats.filter(cht => cht.telefono !== chat.telefono)

      existe ? 
      setChats([chat, ...nuevaLista]) :
      setChats([chat, ...chats]) 

    };

    socket.on("chat", chatEntrante);

    const condicionVenta = (telefono) => {
      const chatsFiltrados = chats.filter((chat) => chat.telefono !== telefono);
      setChats(chatsFiltrados);
      const chatFiltrado = chats.find((chat) => chat.telefono === telefono);
      chatFiltrado.condicion = "Venta";
      setChatsVen([...chatsVen, chatFiltrado]);
      /*  infoChat.condicion = cond;
      if (cond === "Venta" || cond === "Residual") {
        const num = `${id}@c.us`;

        setChats(chats.filter((chat) => chat.telefono !== num));
      }
      */
      /* chats.map((chat) => {
        if (cond === "Rechazado") {
          // console.log("POR ACA VIENEN LAS CHOTAS");
          const chatsFiltrado = chats.filter(
            (chato) => chato.telefono !== chat.telefono
          );

          // console.log(chatsFiltrado);

          setChats(chatsFiltrado);
          setChatsRech((prevChats) => [...prevChats, chat]);
        }
      }); */
    };

    const condicionRechazo = (telefono) => {
      const chatsFiltrados = chats.filter((chat) => chat.telefono !== telefono);
      setChats(chatsFiltrados);
      const chatFiltrado = chats.find((chat) => chat.telefono === telefono);
      chatFiltrado.condicion = "Rechazado";
      setChatsRech([...chatsRech, chatFiltrado]);
    };

    socket.on(`venta`, condicionVenta);

    socket.on("rechazo", condicionRechazo);

    /*   chats.map((chat) => {
      socket.on(`venta-${chat.telefono}`, modificarCondicion);
    }); */

    // messagesEndRef.current?.scrollIntoView();

    return () => {
      socket.off("chat", chatEntrante);
      socket.off("rechazo", condicionRechazo);
      socket.off("venta", condicionVenta);
    };
  });

  useEffect(() => {
    const resultado = fcoBusqueda(chats, busqueda);
    setArrBusqueda(resultado);
  }, [busqueda]);

  return (
    <>
      <aside className="md:w-80 lg:w-3/12 px-5 py-5 bg-gray-100 overflow-hidden  border-r border-stone-400 h-full md:block hidden">
        <button
          type="button"
          className="w-full flex items-center justify-center bg-indigo-300 hover:bg-indigo-600  font-medium text-lg transition ease-out duration-150 p-2 rounded-lg text-white mb-2 mt-16"
          // className="w-full flex items-center justify-center bg-indigo-300 font-medium text-lg transition ease-out duration-150 p-2 rounded-lg text-white mb-2 mt-16"
          onClick={handleModalChatInicial}
          // disabled={true}
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
              d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          Iniciar un Chat
        </button>
        <div className="w-full  p-2 bg-gray-300 text-gray-900 font-bold text-center rounded-lg flex justify-center items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>

          <p className="uppercase text-base">
            Total{" "}
            <span className="ml-3 text-base">{contChats.totalAbiertos}</span>
          </p>
        </div>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-400  mt-2 p-2 focus:outline-none"
          placeholder="Busqueda por email o celular"
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <div className="overflow-scroll  scrollbar-hide mt-4 drop-shadow-sm h-3/4 border-b border-t border-stone-400 pt-4 pb-10 mb-2">
          {arrBusqueda.length > 0
            ? arrBusqueda.map((chat) => (
                <Item key={chat?._id ? chat._id : chat.telefono} chat={chat} />
              ))
            : chats.map((chat) => (
                <Item key={chat?._id ? chat._id : chat.telefono} chat={chat} />
              ))}
        </div>
      </aside>
      <ModalChatInicial />
    </>
  );
};


export default Sidebar;
