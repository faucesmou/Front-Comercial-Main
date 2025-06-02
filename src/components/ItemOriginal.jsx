import React, { useEffect, useState } from "react";
import User from "./User";
import { useChats } from "../hooks/useChats";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as herramientas from "../helpers/herramientas";
import { jwtDecode } from "jwt-decode";


const Item = ({ chat }) => {
  
  console.log('el chat recibido ES-->', chat)
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
  let nombre2= chat.nombre

  let condOpe
  if('operador' in chat){
    if(chat.operador !== null){
      condOpe = true
    }else {
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

  useEffect(()=>{
    if(chat.nota === "urgente" || chat.nota === "normal"){
      setFlag(true)
    }
  },[])

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

      if(chat.telefono === objeto.telefono && (objeto.nota === "normal" || objeto.nota === "urgente")){
        setFlag(true)
      }else if (chat.telefono === objeto.telefono) {
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
        onClick={() => {
          funcPrueba();
        }}
      >
        <div className={` ${chat.segunda && "border-4 border-dotted border-indigo-500" } ${operadores.includes(decoded.id) && condOpe ? "bg-lime-300 hover:bg-lime-600" :  "bg-slate-300 hover:bg-slate-600"}    hover:text-white rounded-lg p-4 mb-3 flex  transition-colors`}>
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
      </Link>
    </>
  );
};

export default Item;
