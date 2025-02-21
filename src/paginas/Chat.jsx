import React, { useEffect, useState, useRef } from "react";
import User from "../components/User";
import IconosHeader from "../components/IconosHeader";
import Mensaje from "../components/Mensaje";
import { useChats } from "../hooks/useChats";
import { useAuth } from "../hooks/useAuth";
import { useParams, useLocation } from "react-router-dom";
import SideInfo from "../components/SideInfo";
import ModalTimer from "../components/ModalTimer";
import ModalConfirmar from "../components/ModalConfirmar";
import ModalResidual from "../components/ModalResidual";
import ModalVenta from "../components/ModalVenta";
import Spinner from "../components/Spinner";
import ModalPlantillaResidual from "../components/ModalPlantillaResidual";
import ModalChatInicial from "../components/ModalChatInicial";
import ModalRechazo from "../components/ModalRechazo";
import ModalCotizado from "../components/ModalCotizado";
import SelectAsesor from "../components/SelectAsesor";
import { jwtDecode } from "jwt-decode";
import { fnDoceHoras } from "../helpers/herramientas";

const rutas = [
  "residual",
  "chats",
  "cotizado",
  "cotiasesor"
]

const operadores = [
  "63ade3a73abf97575a693496", // MM
  "658abdd514b24b2e09b36a84"
]

const usuarios = [
  {
    id: "63ade3a73abf97575a693496",
    nombre: "Marcelo Marino"
  },
  {
    id: "6578b831c9fd0334b809b0cb",
    nombre: "Gino Cornejo"
  },
  {
    id: "657b5ed94d95ab0900fd91e1",
    nombre: "Santiago Mas"
  },
  {
    id: "658abdd514b24b2e09b36a84",
    nombre: "Juan Pablo Belmonte"
  },
  {
    id: "664cc9c06a046b8c840f3781",
    nombre: "Raul Lucania"
  },
  {
    id: "66a7edce1508ebca4070a637",
    nombre: "Jofre Jessica"
  },
  {
    id: "66a7ee201508ebca4070a7d8",
    nombre: "Rojo Yesica"
  },
  {
    id: "66a7eea51508ebca4070a9c8",
    nombre: "Lopez Mariela"
  },
  {
    id: "66a7ef3f1508ebca4070acef",
    nombre: "Garcia Florencia"
  },
  {
    id: "66a7ef931508ebca4070ae26",
    nombre: "Loiero Mariela"
  },
  {
    id: "66e43a8a9abfee773069c98e",
    nombre: "prueba"
  },
  {
    id: "673361c5dd2e609c5d217237",
    nombre: "Gonzalo Morresi"
  },
  
]

/* EN ESTE ARCHIVO TENEMOS EL HEADER CON LAS OPCIONES  */



const Chat = () => {
  const [rootPath, setRootPath] = useState("chats");
  const [btnNota, setBtnNota] = useState(false);
  const [condicion, setCondicion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [lista, setLista] = useState([]);
  const [addFile, setAddFile] = useState(null);
  const [errorFile, setErrorFile] = useState("");
  const [diferencia, setDiferencia] = useState(0)
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token");


  const decoded = jwtDecode(token)

  const {
    listaMensajes,
    mensajes,
    infoChat,
    handleModalChatInicial,
    chats,
    setChats,
    setMensajes,
    socket,
    pasarResidual,
  } = useChats();

  const { usuario, auth } = useAuth();

  const { id } = useParams();

  const regex = /^\d{11,}$/;

  if (!regex.test(id)) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h3 className="bg-slate-700 text-white p-24 rounded-lg text-center shadow-xl">
          Ocurrio un problema <br /> Recurso no encontrado
        </h3>
      </div>
    );
  }

  const location = useLocation();
  const pathname = location.pathname;
  const elemento = pathname.split("/")[1];
  const telefono = pathname.split("/")[2];

  useEffect(() => {
    setErrorFile("");
    setAddFile(null);
    setBtnNota(false)
    
  }, []);


  let ultimo
  useEffect(() => {
    let num = mensajes.length - 1
    ultimo = mensajes[num]
    

    while(ultimo?.msjSalida){
      num -= 1
      ultimo = mensajes[num]
    }

    if(ultimo){
      
      const result = fnDoceHoras(ultimo)
      // console.log(ultimo);
      setDiferencia(result)
      
      
    }else{
      setDiferencia(13)
    }
  },[mensajes])

  useEffect(() => {
    const rootArray = location.pathname.split("/");
    // console.log(typeof rootArray[1]);
    setRootPath(rootArray[1]);
    setMensajes([]);
    setBtnNota(false)
    // setInfoChat({});
    
  }, [location]);

  useEffect(() => {
    const insertCondicion = () => {
      const chatActual = chats.filter((chat) => chat.telefono === `${id}`);
      setCondicion(chatActual[0]?.condicion);
    };
    const ejecucion = async () => {
      await Promise.all([listaMensajes(id)]);
      setLista([]);
    };
    ejecucion();
    if (rootPath === "chats") {
      insertCondicion();
    }
    // console.log(infoChat);
  }, [id]);


  useEffect(() => {
    if (auth.token) {
      const fechaActual = new Date().toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const horaActual = new Date().toLocaleTimeString("en-US", {
        hour12: false,
      });
      const mensajeEntrada = async (message) => {
        const obj = {
          fecha: fechaActual,
          hora: horaActual,
          msjEntrada: message,
        };
        setLista([...lista, obj]);
      };

      const mensajeSalida = async (message) => {
        // en el caso de los mensajes de salida obtenemos un array como respuesta
        const obj = {
          fecha: fechaActual,
          hora: horaActual,
          msjSalida: message,
        };
        setLista([...lista, obj]);
      };

      const modificarCondicion = async (cond) => {
        infoChat.condicion = cond;
        if (cond === "Venta" || cond === "Residual") {
          const num = `${id}`;

          setChats(chats.filter((chat) => chat.telefono !== num));
        }
      };
      socket.on(`entrada-${id}`, mensajeEntrada);
      socket.on(`salida-${id}`, mensajeSalida);
      socket.on(`condicion-${id}`, modificarCondicion);

      messagesEndRef.current?.scrollIntoView();

      return () => {
        socket.off(`entrada-${id}`, mensajeEntrada);
        socket.off(`salida-${id}`, mensajeSalida);
        socket.off(`condicion-${id}`, modificarCondicion);
      };
    }
  }); //Fin del useEffect

  const handleSubmitMensaje = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    const user = usuarios.find(usr => usr.id === decoded.id)

    // condicional para enviar un archivo
    if (addFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        socket.emit("file_upload", {
          fileName: addFile.name,
          fileBuffer: arrayBuffer,
          telefono,
          token,
        });
      };
      reader.readAsArrayBuffer(addFile);
      setAddFile(null);
    }

    if (mensaje === "") return;

    const salida = [];
    salida.push(mensaje.trim());
    const objSalida = {
      operador: usuario._id,
      msjSalida: salida,
      from: id,
    };
    socket.emit("msj-salida", objSalida);
    // enviarMsj(objSalida);

    const objetoMsj = {
      msjSalida: salida,
      operador: user.nombre,
      send: true
    };
    setLista([...lista, objetoMsj]);
    setMensaje("");
  };
  //hola gonzalito

  const handleFileInputClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleAddFile = (e) => {
    const file = e.target.files[0];
    
    const arreglo = file.name.split(" ");
    const regex = /[^a-zA-Z0-9]/g;

    const tipos = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ]

    if(file.size >= 5242880 ){
      setErrorFile("El archivo debe pesar menos de 5MB");
      return
    }

    // if (regex.test(file.name)) {
    if (false) {
      setErrorFile("El nombre del archivo contiene algún caracter especial");
    } else {
      if (tipos.includes(file.type)) {
        setErrorFile("");
        setAddFile(file);
      } else {
        setErrorFile("Solo se permiten archivos pdf, jpeg, png");
      }
    }
  };

  const handleNotaRapida = () => {
    if (mensaje === "") return;

    const user = usuarios.find(usr => usr.id === decoded.id)

    // console.log(user);
    

    // console.log(mensaje);

    // return
    const salida = [];
    salida.push(mensaje.trim());
    const objSalida = {
      operador: usuario._id,
      msjSalida: salida,
      from: id,
      nota: "normal",
    };
    socket.emit("msj-salida", objSalida);
    // enviarMsj(objSalida);

    const objetoMsj = {
      msjSalida: `${mensaje.trim()}`,
      operador: user.nombre,
      nota: "normal"
    };
    setLista([...lista, objetoMsj]);
    setMensaje("");
    
  }

  const handleClickResidual = async () => {
    
      
    const cond = confirm(`Quiere pasar el siguiente número a Mis Ingresos ${telefono}???`)
   
    if(cond){
      const resultado = await pasarResidual(telefono)
      if(resultado){
        alert('Traspaso exitoso')
      }else {
        alert('Hubo un error')
      }
    }
    
  }


  return (
    <>
      {mensajes.length > 0 ? (
        <div className="bg-gray-200 w-full h-full">
          {/*  header */}
          <div className="w-full px-12 border-b border-stone-300 h-1/5 flex justify-between items-center">
           {/*  {telefono === "5492614714607" && (
              <button onClick={handleModalTimer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-slate-400 hover:text-slate-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            )} */}
            <div className="flex  items-center">
              <div className="flex flex-col h-full justify-center gap-4">
            
                {/* {elemento === 'rechazado' && operadores.includes(decoded.id) && ( */}
                {elemento === 'rechazado'  && (
                  <button onClick={handleClickResidual}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth="1.5" 
                      stroke="currentColor" 
                      className="h-6 w-6"
                    >
                      <path 
                        strokeLinecap="round"
                        strokeLinejoin="round" 
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" 
                      />
                    </svg>
                    
                  </button>
                  
                )}
                <User />
                
              </div>
            
            
              <div className="ml-2 self-center">
                <p className="font-medium">
                  {infoChat.nombre ? infoChat.nombre : "Customer"}
                </p>
                <small className="text-gray-100 font-light bg-blue-400 p-1 rounded-lg">
                  Condición: {infoChat.condicion}
                </small>
                {elemento === "rechazado" && (
                  <>
                    <small className="ml-3 text-gray-700 font-light bg-indigo-200 p-1 rounded-lg ">
                      Tipo: {infoChat.tipo}
                    </small>
                    <div className="mt-2 flex flex-col gap-1">
                      <small className=" w-fit text-gray-700 font-light bg-indigo-200 p-1 rounded-lg ">
                        Motivo: {infoChat.motivo}
                      </small>
                      <small className="w-fit text-gray-700 font-light bg-indigo-200 p-1 rounded-lg ">
                        Comentarios: {infoChat.comentarios}
                      </small>
                    </div>
                  </>
                )}
              </div>
              {/* Informacion: cuil y cotizacion */}
              <div className="ml-4 hidden lg:block justify-center">
                <div className="flex flex-col  justiy-center items-center gap-4">
                  {infoChat.cuil && <p>Cuil: {infoChat.cuil}</p>}
                  {infoChat.email && (
                    <p className="ml-2">Email: {infoChat.email}</p>
                  )}
                </div>
              </div>
            </div>
            {((operadores.includes(decoded.id)) && (rutas.includes(rootPath))) && (
              <div className="flex justify-center items-center px-2">
                <SelectAsesor telefono={telefono} />
              </div>
            )}
           
            <div className="w-1/8 flex text-gray-500 justify-center items-end">
              <IconosHeader />
            </div>
          </div>
          {/* body */}
          <div className="px-9 py-6 border-b border-stone-300 h-[62%] overflow-scroll scrollbar-hide  flex flex-col transition-all">
           
            {/* barra lateral con la info */}
            <SideInfo info={infoChat}/>
            {/* contenido principal del chat */}
            <div className="">
              {/* aca comienzan las conversaciones, mensajes */}

              {mensajes.length ? (
                mensajes.map((mensaje) => (
                  <Mensaje key={mensaje._id} mensaje={mensaje} />
                ))
              ) : (
                <p>No hay mensajes guardados</p>
              )}
              {lista.length > 0 &&
                lista.map((msj) => (
                  <Mensaje key={msj.hora} mensaje={msj} />
                ))}
              <div ref={messagesEndRef} />

              {/* fin del mensaje */}
            </div>
          </div>
          {/* footer */}

          {(elemento === "residual" && !infoChat.msjResidual && diferencia > 12 && !btnNota) ||
          (elemento === "rechazado" && diferencia > 12 && !btnNota) || (diferencia > 12 && !btnNota)  ? (
            <div className="px-10 flex items-center justify-center h-1/6 w-full">
              <button
                // onClick={handleModalPlantillaRes}
                onClick={handleModalChatInicial}
                className="w-48 ml-3 p-3 bg-blue-400 hover:bg-blue-700 text-white text-md rounded-lg font-semibold transition ease-out duration-150 cursor-pointer"
              >
                Plantilla
              </button>
              <button
                // onClick={handleModalPlantillaRes}
                onClick={() => setBtnNota(true)}
                className="w-48 ml-3 p-3 bg-blue-400 hover:bg-blue-700 text-white text-md rounded-lg font-semibold transition ease-out duration-150 cursor-pointer"
              >
                Nota
              </button>
            </div>
          ) : (
            <div className="px-10 flex   items-center h-1/6 ">
              <form
                action=""
                className="w-full flex items-center justify-center"
                onSubmit={handleSubmitMensaje}
                encType="multipart/form-data"
              >
                {addFile && (
                  <p className="relative text-gray-500">
                    <span className="font-bold text-gray-700">file:</span>{" "}
                    {addFile.name}
                  </p>
                )}

                {errorFile.length > 0 && (
                  <p className="relative text-red-700">{errorFile}</p>
                )}

                <input
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  className="px-4 py-2 bg-gray-100 w-3/5 focus:outline-none rounded-lg font-light text-gray-700 placeholder-gray-500"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />
                <button
                  type="button"
                  className="p-2"
                  onClick={handleFileInputClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                    />
                  </svg>
                  <input
                    type="file"
                    accept="application/pdf, image/jpeg, image/png"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleAddFile}
                    disabled={btnNota}
                  />
                </button>
               
                <button
                  type="submit"
                  className={`${btnNota ? "cursor-not-allowed" : 'cursor-pointer hover:bg-gray-700'}  ml-1 p-3 bg-gray-400  text-white text-md rounded-lg font-semibold transition ease-out duration-150`}
                  disabled={btnNota}
                >
                  Enviar
                </button>

                <button 
                  type="button"
                  className="ml-1 p-3 bg-gray-400 hover:bg-gray-700 text-white text-md rounded-lg font-semibold transition ease-out duration-150 cursor-pointer"
                  onClick={handleNotaRapida}
                >
                  Nota rápida
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <Spinner />
      )}
      <ModalTimer />
      <ModalConfirmar />
      <ModalResidual />
      <ModalVenta />
      <ModalRechazo />
      <ModalCotizado />
      <ModalPlantillaResidual />
      <ModalChatInicial/>
    </>
  );
};

export default Chat;
