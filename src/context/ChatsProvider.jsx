import { createContext, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { io } from "socket.io-client";

const ChatsContext = createContext();
let socket;

const ChatsProvider = ({ children }) => {
  const [modalChatInicial, setModalChatInicial] = useState(false);
  const [modalPlantillaRes, setModalPlantillaRes] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [modalVenta, setModalVenta] = useState(false);
  const [modalRechazo, setModalRechazo] = useState(false);
  const [modalCotizado, setModalCotizado] = useState(false);
  const [modalTimer, setModalTimer] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [chatInicial, setChatInicial] = useState({});
  const [mensajes, setMensajes] = useState([]);
  const [chats, setChats] = useState([]);
  const [chatsRes, setChatsRes] = useState([]);
  const [chatsPre, setChatsPre] = useState([]);
  const [chatsVen, setChatsVen] = useState([]);
  const [chatsRech, setChatsRech] = useState([]);
  const [chatsTemp, setChatsTemp] = useState([]);
  const [chatsCoti, setChatsCoti] = useState([]);
  const [chatsCotiasesor, setChatsCotiasesor] = useState([]);
  const [contChats, setContChats] = useState({});
  const [infoChat, setInfoChat] = useState({});
  const [imageURL, setImageURL] = useState("");
  const referencia = useRef(null);

  // const socket = io(`${import.meta.env.VITE_BACKEND_URL}:443`);
  const { auth, usuario } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    limpiar();
    
    const inicial = async () => {
      await listaChats();
    };
    return () => {
      inicial();
    };
  }, [auth]);

  useEffect(() => {
    socket = io(`${import.meta.env.VITE_BACKEND_URL}:443`);

    return () => {
      socket.disconnect(); // Manejar la desconexión al desmontar el componente
    };
  }, []);

  /* useEffect(() => {
    const fnUpdateNoti = (objeto) => {
      console.log(objeto);
      switch (objeto.condicion) {
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
      }
    };
    socket.on("noti-update", fnUpdateNoti);

    return () => {
      socket.off("noti-update", fnUpdateNoti);
    };
  }); */

  useEffect(() => {
    setTimeout(() => {
      setImageURL("");
    }, [5000]);
  }, [imageURL]);

  useEffect(() => {
    const ejecucion = async () => {
      await listaChats();
    };
    ejecucion();
  }, [location]);

  const handleModalPlantillaRes = () => {
    setModalPlantillaRes(!modalPlantillaRes);
  };

  const handleModalChatInicial = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    setAlerta({});
    setModalChatInicial(!modalChatInicial);
  };

  const handleModalTimer = () => {
    setModalTimer(!modalTimer);
  };

  const handleModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };

  const submitChatInicial = async (chat) => {
    try {
      setChatInicial(chat);
      const salida = [];
      salida.push(chat.descripcion);
      const objSalida = {
        operador: usuario._id,
        nombre: chat.nombre,
        msjSalida: salida,
        from: chat.telefono,
      };
      // cambio de la funcionalidad del chat inicial
      // enviarMsj(objSalida);
      const objeto = {
        platinum: chat.cotizacion.platinum,
        black: chat.cotizacion.black,
        titanium: chat.cotizacion.titanium,
      }
      const url = `${process.env.VITE_BACKEND_URL}/pruebas/mensaje-inicial?telefono=${chat.telefono}&condicion=${chat.condicion}&operador=${usuario._id}&categoria=${chat.categoria}`
      const { data } = await axios.post(url,objeto);

      const index = chats.findIndex(
        (element) => element.telefono === objSalida.from
      );

      if (index === -1) {
        setChats([chat, ...chats]);
      }
    } catch (error) {
      console.log("Tuvimos un error desde el FrontEnd>> este es el error:", error);

    }
  };

  const listaMensajes = async (numero, path = "") => {
    setMensajes([]);
    const celular = numero;
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/chats/lista-mensajes",
        { celular },
        config
      );
      setMensajes(data);

      /*  if (path === "chats") {
        const chat = chats.find((chat) => chat.telefono === `${numero}@c.us`);
        setInfoChat(chat);
      }
      if (path === "pre-venta") {
        const chat = chatsPre.find(
          (chat) => chat.telefono === `${numero}@c.us`
        );
        setInfoChat(chat);
      }
      if (path === "ventas") {
        const chat = chatsVen.find(
          (chat) => chat.telefono === `${numero}@c.us`
        );
        setInfoChat(chat);
      }
      if (path === "residual") {
        const chat = chatsRes.find(
          (chat) => chat.telefono === `${numero}@c.us`
        );
        setInfoChat(chat);
      }
      if (path === "temporal") {
        const chat = chatsTemp.find(
          (chat) => chat.telefono === `${numero}@c.us`
        );
        setInfoChat(chat);
      }
      if (path === "rechazado") {
        const chat = chatsRech.find(
          (chat) => chat.telefono === `${numero}@c.us`
        );
        setInfoChat(chat);
      }
      if (path === "cotizado") {
        const chat = chatsCoti.find(
          (chat) => chat.telefono === `${numero}@c.us`
        );
        setInfoChat(chat);
      } */
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "jwt expired") {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const cerrarSesionChats = () => {
    limpiar();
    setMensajes([]);
  };

  const listaChats = async (pagina = 1) => {
    // console.log(`pagina ${pagina}`);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/chats/lista-chats?page=${pagina}&pageSize=100`,
        config
      );
      // const listaAbiertos = data.filter((dat) => dat.condicion === "Abierto");
      const listaAbiertos = data.chatsAbiertos;
      const listaResiduales = data.chatsRes;
      const listaVentas = data.chatsVenta;
      const listaRechazados = data.chatsRech;
      const listaTemporales = data.chatsTemp;
      const listaCotiasesor = data.chatsCotiasesor;
      const listaPreVenta = data.chatsPre;
      const listaCotizado = data.chatsCoti;

      

      setChatsPre(listaPreVenta);
      setChats(listaAbiertos);
      setChatsRes(listaResiduales);
      setChatsVen(listaVentas);
      setChatsRech(listaRechazados);
      setChatsTemp(listaTemporales);
      setChatsCoti(listaCotizado);
      setChatsCotiasesor(listaCotiasesor);
      setContChats({
        totalAbiertos: data.totalAbiertos,
        totalResiduales: data.totalResiduales,
        totalPreVenta: data.totalPreVenta,
        totalCoti: data.totalCoti,
        totalRech: data.totalRech,
        totalVenta: data.totalVenta,
        totalTemp: data.totalTemp,
        totalCotiasesor: data.totalCotiasesor
      });
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "jwt expired") {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const sumarChats = async (pagina, rootpath) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/chats/lista-chats?page=${pagina}&pageSize=100`,
        config
      );

     
      return data
      
    } catch (error) {
      console.log(error);
    }
  }

  const buscarChat = async (nro) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const numero = `${nro}`;

      const { data } = await clienteAxios.post(
        "/chats/buscar-chat",
        { numero },
        config
      );
      
      setInfoChat(data.chat);
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "jwt expired") {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const resetSinLeer = async (nro) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/chats/reset-sin-leer/${nro}`,
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const enviarMsj = async (datos) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/chats/enviar-mensaje",
        datos,
        config
      );
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "jwt expired") {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const insertarVenta = async (numero, cond = true) => {
    try {
      const tokeno = localStorage.getItem("token");
      if (!tokeno) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokeno}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/chats/confirmar-venta",
        { numero, cond },
        config
      );
      setChats(chats.filter((chat) => chat.telefono !== numero));
    } catch (error) {
      console.log(error);
    }
  };

  const descargarImagen = async (nombre) => {
    try {
      const url = "/chats/imagen-url";

      const tokeno = localStorage.getItem("token");
      if (!tokeno) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokeno}`,
        },
      };

      const { data } = await clienteAxios.post(url, { nombre }, config);

      setImageURL(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const enviarPlantilla = async (celular) => {
    try {
      const url = `https://comercial.createch.com.ar/pruebas/enviar-mensaje?celular=${celular}&mensaje=residual`;

      const tokeno = localStorage.getItem("token");
      if (!tokeno) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokeno}`,
        },
      };

      const { data } = await axios(url);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarChat = async () => {
    try {
      console.log(infoChat);

      // return;

      const url = `/chats/eliminar-chat/${infoChat._id}`;

      const tokeno = localStorage.getItem("token");
      if (!tokeno) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokeno}`,
          telefono: `${infoChat.telefono}`,
        },
      };

      const { data } = await clienteAxios.delete(url, config);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReferencia = (valor) => {
    // setReferencia(valor);
    referencia.current = valor;
  };

  const fnVenta = async (objeto) => {
    // console.log(objeto);
    const url = `/ventas`;

    const tokeno = localStorage.getItem("token");
    if (!tokeno) throw new Error("Error con el Token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokeno}`,
      },
    };

    const { data } = await clienteAxios.post(url, objeto, config);

    // console.log(data);
  };

  const fnRechazo = async (objeto) => {
    // console.log(objeto);
    const url = `/chats/rechazo`;

    const tokeno = localStorage.getItem("token");
    if (!tokeno) throw new Error("Error con el Token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokeno}`,
      },
    };

    const { data } = await clienteAxios.post(url, objeto, config);

    // console.log(data);
  };

  const fnCotizado = async (objeto) => {
    const url = `/chats/cotizado`;

    const tokeno = localStorage.getItem("token");
    if (!tokeno) throw new Error("Error con el Token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokeno}`,
      },
    };

    const { data } = await clienteAxios.post(url, objeto, config);
  }

  const listaVerificaciones = (pagina = 1) => {
    try {
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "jwt expired") {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };


  const limpiar = () => {
    setChats([]);
    setChatsRes([]);
    setChatsVen([]);
    setChatsRech([]);
    setInfoChat([]);
  };

  const handleModalVenta = () => {
    setModalVenta(!modalVenta);
  };

  const handleModalRechazo = () => {
    setModalRechazo(!modalRechazo);
  };

  const handleModalCotizado = () => {
    setModalCotizado(!modalCotizado);
  };

  const pasarResidual = async (telefono) => {
    try {

      const tokeno = localStorage.getItem("token");
      if (!tokeno) throw new Error("Error con el Token");
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokeno}`,
        },
      };

      const { data } = await clienteAxios(`/chats/pasar-residual?telefono=${telefono}`, config)

      if(data.msg === 'ok'){
        return true
      }else {
        return false
      }
    } catch (error) {
      console.log(error);
    }
  }

  const primeraGestion = async (desde,hasta) => {
    try {

      const tokeno = localStorage.getItem("token");
      if (!tokeno) throw new Error("Error con el Token");
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokeno}`,
        },
      };
      const { data } = await clienteAxios(`/chats/primera-gestion?desde=${desde}&hasta=${hasta}`, config)

      return data
      
    } catch (error) {
      console.log(error);
    }
  }

  const cargaExcel = async (file) => {
    try {
      const url = '/chats/carga-excel'
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const formData = new FormData()
      formData.append('file',file)
      const  { data } = await clienteAxios.post(url,formData,config)

      return data
    } catch (error) {
      return error.response.data
    }
  }

  const fnBusqueda = async (cadena) => {
    try {
      const url = `/chats/busqueda?cadena=${cadena}`
      const tokeno = localStorage.getItem("token");
      if (!tokeno) throw new Error("Error con el Token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokeno}`,
        },
      };
      const { data } = await clienteAxios(url,config)

      return data
    } catch (error) {
      console.log(error);
    }
  }

  

  const asesoras = [
    {
      id: '66a7edce1508ebca4070a637',
      nombre: 'Jofre Jessica'
    },
    {
      id: '66a7ee201508ebca4070a7d8',
      nombre: 'Rojo Yesica'
    },
    {
      id: '66a7eea51508ebca4070a9c8',
      nombre: 'Lopez Mariela'
    },
    {
      id: '66a7ef3f1508ebca4070acef',
      nombre: 'Garcia Florencia'
    },
    {
      id: '66a7ef931508ebca4070ae26',
      nombre: 'Loiero Mariela'
    },
    {
      id: '123',
      nombre: 'Jose Bot'
    },
   
  ]

 /*  const asesoras = [
    {
      id: '123',
      nombre: 'Jose Bot'
    },
   
  ] */

  /* 
Marcelo Marino
Juan Pablo Belmonte
Gino Cornejo
Santiago Mas
Raul Lucania
*/
const operadores = [
  "63ade3a73abf97575a693496",
  "658abdd514b24b2e09b36a84",
  "6578b831c9fd0334b809b0cb",
  "657b5ed94d95ab0900fd91e1",
  "664cc9c06a046b8c840f3781"
]

/* const operadores = [
  "6732050494775e2b04367069",
]
 */

  return (
    <ChatsContext.Provider
      value={{
        modalChatInicial,
        modalPlantillaRes,
        handleModalChatInicial,
        handleModalPlantillaRes,
        alerta,
        setAlerta,
        chatInicial,
        submitChatInicial,
        listaMensajes,
        setMensajes,
        mensajes,
        listaChats,
        chats,
        setChats,
        buscarChat,
        infoChat,
        setInfoChat,
        enviarMsj,
        handleModalTimer,
        modalTimer,
        cerrarSesionChats,
        chatsRes,
        setChatsRes,
        chatsVen,
        setChatsVen,
        chatsRech,
        setChatsRech,
        chatsTemp,
        setChatsTemp,
        chatsPre,
        setChatsPre,
        chatsCoti,
        chatsCotiasesor,
        insertarVenta,
        modalConfirmar,
        handleModalConfirmar,
        descargarImagen,
        imageURL,
        setImageURL,
        eliminarChat,
        referencia,
        handleReferencia,
        contChats,
        resetSinLeer,
        listaVerificaciones,
        enviarPlantilla,
        socket,
        handleModalVenta,
        modalVenta,
        handleModalRechazo,
        modalRechazo,
        modalCotizado,
        fnVenta,
        fnRechazo,
        fnCotizado,
        handleModalCotizado,
        asesoras,
        operadores,
        pasarResidual,
        primeraGestion,
        cargaExcel,
        fnBusqueda,
        sumarChats
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export { ChatsProvider };

export default ChatsContext;
