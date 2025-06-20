import React, { useEffect, useState } from "react";
import User from "./User";
import { useChats } from "../hooks/useChats";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as herramientas from "../helpers/herramientas";
import { jwtDecode } from "jwt-decode";


const Item = ({ chat }) => {

  /* console.log('el chat recibido ES-->', chat) */
 /*  console.log('el chat msg ES----------------###>', chat.msg) */
  const [noti, setNoti] = useState();
  const [flag, setFlag] = useState(false);
  const {
    chats,
    setChats,
    chatsPre,
    setChatsPre,
    chatsVen,
    setChatsVen,
    chatsRes,
    setChatsRes,
    chatsTemp,
    setChatsTemp,
    chatsRech,
    setChatsRech,
    chatsCoti,
    setChatsCoti,
    listaMensajes,
    setInfoChat,
    resetSinLeer,
    buscarChat,
    socket,
    operadores
  } = useChats();
  const { sinLeer } = chat;
  const location = useLocation();
  const navigate = useNavigate();
  let fecha;
  let numeroLimpio;
  let nombre2 = chat.nombre

  let condOpe
  if ('operador' in chat) {
    if (chat.operador !== null) {
      condOpe = true
    } else {
      condOpe = false
    }
  }
  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token)


  if (chat?.updatedAt) {
    fecha = herramientas.formatearFecha(chat.updatedAt);
  }

  let regexNro = /@c.us\b/;
  const cond = regexNro.test(chat.telefono);
  if (cond) {
    numeroLimpio = herramientas.limpiarNumero(chat.telefono);
  }

  const fechaActual = new Date().toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const ruta = location.pathname.split("/");
  const cadRuta = ruta[1];

  const path = `/${cadRuta}/${cond ? numeroLimpio : chat.telefono}`;

  useEffect(() => {
    if (chat.nota === "urgente" || chat.nota === "normal") {
      setFlag(true)
    }
  }, [])

  useEffect(() => {
    setNoti(sinLeer);
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const showNotification = (title, body) => {
    if (Notification.permission === "granted") {
      const notification = new Notification(title, {
        body: body,
        icon: "../andes.jpg", // Puedes agregar un icono si lo deseas
      });

      // Reproducir sonido
      const audio = new Audio("../sound-msg.mp3");
      audio.play();
    }
  };

  useEffect(() => {
    const fnUpdateNoti = (objeto) => {

      if (chat.telefono === objeto.telefono && (objeto.nota === "normal" || objeto.nota === "urgente")) {
        setFlag(true)
      } else if (chat.telefono === objeto.telefono) {
        if (ruta[2] !== undefined) {
          setNoti();
          socket.emit("noti", { msg: "success", telefono: chat.telefono });
          return;
        }

        showNotification(`+${objeto.telefono}`, `${objeto.mensaje}`);
        setNoti(objeto.sinLeer);
      }
      /*  switch (objeto.condicion) {
        case "Abierto":
          const nuevo = chats.map((chat) => {
            if (chat.telefono === objeto.telefono) {
              return { ...chat, sinLeer: objeto.sinLeer };
            }
            return chat;
          });
          break;

        default:
          break;
      } */
    };
    socket.on("noti-update", fnUpdateNoti);

    return () => {
      socket.off("noti-update", fnUpdateNoti);
    };
  }, [socket]);

  useEffect(() => {
    // console.log(chat);
    const modificarCondicion = (cond) => {
      /*  console.log(chat);
      console.log(cond);
      console.log(cadRuta); */

      if (cadRuta === "chats") {
        const chatsFiltrado = chats.filter(
          (chato) => chato.telefono !== chat.telefono
        );
        setChats(chatsFiltrado);
      }

      if (cadRuta === "residual") {
        const chatsFiltrado = chatsRes.filter(
          (chato) => chato.telefono !== chat.telefono
        );
        setChatsRes(chatsFiltrado);
      }

      if (cadRuta === "ventas") {
        const chatsFiltrado = chatsRes.filter(
          (chato) => chato.telefono != chat.telefono
        );
        setChatsRes(chatsFiltrado);
        setChatsVen([chat, ...chatsVen]);
      }

      if (cadRuta === "rechazado") {
        const chatsFiltrado = chatsRes.filter(
          (chato) => chato.telefono != chat.telefono
        );
        setChatsRes(chatsFiltrado);
        setChatsRech([chat, ...chatsRech]);
      }
    };
    socket.on(`condicion-${chat.telefono}`, modificarCondicion);

    return () => {
      socket.off(`condicion-${chat.telefono}`, modificarCondicion);
    };
  }, [socket]);



  const funcPrueba = async () => {



    setNoti();
    // setFlag(false)
    await Promise.all([
      listaMensajes(chat.telefono, cadRuta),
      buscarChat(chat.telefono),
    ]);
  };

  return (
    <>
      <Link
        to={path}
        onClick={funcPrueba}
      >
        <div
          className={`
      relative
    group
    rounded-md
    px-3 py-2
    mb-2
    flex items-center
    text-sm
    transition-colors
  ${chat.segunda 
  ? `border-2 border-dotted ${
      chat.msg === "casiventa"
        ? "border-red-500"
        : chat.msg === "venta"
        ? "border-green-500"
        : "border-indigo-500"
    }`
  : "border border-slate-500"}
    ${operadores.includes(decoded.id) && condOpe
              ? "bg-lime-200 hover:bg-lime-400"
              : "bg-white hover:bg-slate-500"}
    shadow-sm ring-1 ring-gray-200
    hover:text-white
  `}
        
        >
          <div className="flex flex-col items-center justify-center mr-3">
            <User />
            {flag && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`h-5 w-5 mt-1 ${chat.nota === "urgente" ? "text-red-600" : "text-yellow-500"}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                />
              </svg>
            )}
          </div>

          <div className="relative flex items-center"> {/* Agregamos 'relative' para posicionar la notificación dentro de este contenedor */}
            <div className="flex-1">
              <div className="flex items-center mb-1"> {/* Eliminamos justify-between */}
                <p className="font-semibold truncate mr-7">{chat?.nombre || "Customer"}</p> {/* mr-auto empuja la fecha a la derecha */}
                <span className="text-xs text-gray-500 group-hover:text-white">{chat?.updatedAt ? fecha : fechaActual}</span>
              </div>

              <p className="block font-black text-md group-hover:text-white">
                +{cond ? numeroLimpio : chat.telefono}
              </p>
             {/*  <p className="block font-black text-md group-hover:text-white">
                {chat.email}
              </p> */}
            </div>

            {noti > 0 && (
              <div className="ml-4"> {/* Añadimos un margen izquierdo para separar la notificación del contenido principal */}
                <div className="h-5 w-5 text-xs font-bold text-white rounded-full bg-red-500 flex items-center justify-center">
                  {noti}
                </div>
              </div>
            )}
          </div>
          </div>

          {/*  <div className="flex-1">
            <div className="flex justify-between items-center mb-1 mr-2">
              <p className="font-semibold truncate">{chat?.nombre || "Customer"}</p>
              <span className="text-xs text-gray-500">{chat?.updatedAt ? fecha : fechaActual}</span>
            </div>

            <p className="block font-black text-md group-hover:text-white">
              +{cond ? numeroLimpio : chat.telefono}
            </p>
            <p className="block font-black text-md group-hover:text-white">
              {chat.email}
            </p>
          </div>

          {noti > 0 && (
            <div className="absolute top-2 right-2">
              <div className="h-5 w-5 text-xs font-bold text-white rounded-full bg-red-500 flex items-center justify-center">
                {noti}
              </div>
            </div>
          )}
        </div> */}
      </Link>

    {/*   <Link
        to={path}
        onClick={() => {
          funcPrueba();
        }}
      >
        <div className={` ${chat.segunda && "border-4 border-dotted border-indigo-500"} ${operadores.includes(decoded.id) && condOpe ? "bg-lime-300 hover:bg-lime-600" : "bg-slate-300 hover:bg-slate-600"}    hover:text-white rounded-lg p-4 mb-3 flex  transition-colors`}>
          <div className="flex flex-col items-center justify-center mr-2">
            <User />
            {flag && (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`h-6 w-6 ${chat.nota === "urgente" ? "text-red-600" : "text-yellow-600"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                  />
                </svg>
              </div>
            )}

          </div>

          <div className="w-full overflow-hidden">
            <div className="flex mb-1 items-center ">
              <p className="flex-grow">
                {chat?.nombre ? chat.nombre : "Customer"}
              </p>
              <small className="font-light text-sm">
                {chat?.updatedAt ? fecha : fechaActual}
              </small>
            </div>

            <small className="overflow-ellipsis overflow-hidden whitespace-nowrap block font-black text-md">
              +{cond ? numeroLimpio : chat.telefono}
            </small>
            <small className="overflow-ellipsis overflow-hidden whitespace-nowrap block font-black text-md">
              {chat.email}
            </small>
            {noti > 0 && (
              <div className="absolute">
                <p className="relative left-48 bottom-8  h-8 w-8  text-center text-white rounded-full  bg-red-500  border-2 border-slate-300">
                  {noti}
                </p>
              </div>
            )}
          </div>
        </div>
      </Link> */}
    </>
  );
};

export default Item;
