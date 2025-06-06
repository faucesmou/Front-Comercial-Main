import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Item from "./Item";
import { useChats } from "../hooks/useChats";
import { fcoBusqueda } from "../helpers/herramientas";
import ModalChatInicial from "./ModalChatInicial";
import { jwtDecode } from "jwt-decode";




const SidebarResVen = () => {
  const [listOp,setListOp] = useState(false)
  const [condList, setCondList] = useState(false)
  const [condStyle, setCondStyle] = useState(false)
  const [busqueda, setBusqueda] = useState("");
  const [arrBusRes, setArrBusRes] = useState([]);
  const [arrBusVen, setArrBusVen] = useState([]);
  const [arrBusRech, setArrBusRech] = useState([]);
  const [arrBusTemp, setArrBusTemp] = useState([]);
  const [arrBusPre, setArrBusPre] = useState([]);
  const [arrBusCot, setArrBusCot] = useState([]);
  const [arrBusBus, setArrBusBus] = useState([]);
  const [filtrar, setFiltrar] = useState(false)
  const [asesor, setAsesor] = useState({})
  const [arrBusCotAse, setArrBusCotAse] = useState([]);
  const [rootPath, setRootPath] = useState("");
  const [paginador, setPaginador] = useState(1);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const {
    chatsRes,
    chatsVen,
    chatsRech,
    chatsTemp,
    chatsPre,
    chatsCoti,
    chatsCotiasesor,
    contChats,
    listaChats,
    socket,
    handleModalChatInicial,
    asesoras,
    operadores,
    fnBusqueda,
    sumarChats
  } = useChats();

  const location = useLocation();

  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token)

  const elemento = location.pathname.split('/')[1]

  useEffect(()=>{
    
    const chatEntrante =  (chat) => {
      
      if(chat.operador !== decoded.id) return
      

      switch(chat.condicion){
        case "Residual":
          
          let nuevaLista
          let existe = arrBusRes.some(cht => cht.telefono === chat.telefono)
          
          if(existe)
            nuevaLista = arrBusRes.filter(cht => cht.telefono !== chat.telefono)

          existe ? 
          setArrBusRes([chat, ...nuevaLista]) :
          setArrBusRes([chat, ...arrBusRes])
          break
        case "Venta":
          
          let nuevaLista2
          let existe2 = arrBusVen.some(cht => cht.telefono === chat.telefono)
          
          if(existe2)
            nuevaLista2 = arrBusVen.filter(cht => cht.telefono !== chat.telefono)

          existe2 ? 
          setArrBusVen([chat, ...nuevaLista2]) :
          setArrBusVen([chat, ...arrBusVen])
          break
        case "Cotiasesor":
          let nuevaLista3
          let existe3 = arrBusCotAse.some(cht => cht.telefono === chat.telefono)
          
          if(existe3)
            nuevaLista3 = arrBusCotAse.filter(cht => cht.telefono !== chat.telefono)

          existe3 ? 
          setArrBusCotAse([chat, ...nuevaLista3]) :
          setArrBusCotAse([chat, ...arrBusCotAse])
          break
        case "Cotizado":
          let nuevaLista4
          let existe4 = arrBusCot.some(cht => cht.telefono === chat.telefono)
          
          if(existe4)
            nuevaLista4 = arrBusCot.filter(cht => cht.telefono !== chat.telefono)

          existe4 ? 
          setArrBusCot([chat, ...nuevaLista4]) :
          setArrBusCot([chat, ...arrBusCot])
          break
        case "Rechazado":
          let nuevaLista5
          let existe5 = arrBusRech.some(cht => cht.telefono === chat.telefono)
          
          if(existe5)
            nuevaLista5 = arrBusRech.filter(cht => cht.telefono !== chat.telefono)

          existe5 ? 
          setArrBusRech([chat, ...nuevaLista5]) :
          setArrBusRech([chat, ...arrBusRech])
          break
      }
    };

    socket.on("chat",chatEntrante)

    return () => {
      socket.off("chat",chatEntrante)
    }
  })


  /* useEffect(() => {
    const inicial = async () => {
      await listaChats();
    };
    return () => {
      inicial();
    };
  }, []); */

  useEffect(()=>{
    setCondList(false)
    
  },[])
  
  useEffect(() => {
    setPaginador(1);
  }, [rootPath]);

  useEffect(() => {
    let cantPaginas;
    if(paginador > 1){
      
    
      const ejecucion = async () => {
        const result = await sumarChats(paginador)
        return result
      }
      ejecucion()
        .then(data => {

          switch(rootPath){
            case "ventas":
              if(data.chatsVenta.length > 0){
                setArrBusVen([...arrBusVen, ...data.chatsVenta])
              }
              break
            case "residual":
              if(data.chatsRes.length > 0){
                setArrBusRes([...arrBusRes,...data.chatsRes])
              }
              break
            case "rechazado":
              if(data.chatsRech.length > 0){
                setArrBusRech([...arrBusRech,...data.chatsRech])
              }
              break
            case "cotiasesor":
              if(data.chatsCotiasesor.length > 0){
                setArrBusCotAse([...arrBusCotAse,...data.chatsCotiasesor])
              }
              break
            default:
              break
          }
        })
        .catch(err => {
          console.log(err);
        })
      
    }

  /*   if (rootPath === "residual") {
      cantPaginas = Math.ceil(contChats.totalResiduales / 100);
      if (cantPaginas > 1 && paginador <= cantPaginas) {
        // alert(`cantidad de paginas ${cantPaginas}\npaginador ${paginador}`);
      }
    }

    if (rootPath === "ventas") {
      cantPaginas = Math.ceil(contChats.totalVenta / 100);
      if (cantPaginas > 1 && paginador <= cantPaginas) {
        // alert(`cantidad de paginas ${cantPaginas}\npaginador ${paginador}`);
        //TODO: Hacer consulta al back para traerme mas datos del paginador hacie el state
      }
    }

    if (rootPath === "pre-venta") {
      cantPaginas = Math.ceil(contChats.totalPreVenta / 100);
      if (cantPaginas > 1 && paginador <= cantPaginas) {
        // alert(`cantidad de paginas ${cantPaginas}\npaginador ${paginador}`);
      }
    } */
  }, [paginador]);

  useEffect(() => {
    const ejecucion = () => {
      setRootPath("");
      const rootArray = window.location.pathname.split("/");
      setRootPath(rootArray[1]);
    };
    ejecucion();
    setListOp(false)
    if(elemento === "residual" || elemento === "cotiasesor" || elemento === "ventas" || elemento === "rechazado"){
      setCondList(true)
    }else {
      setCondList(false)
    }

    if(elemento === "cotiasesor" || elemento === "ventas" || elemento === "rechazado"){
      setCondStyle(true)
    }else {
      setCondStyle(false)
    }
  }, [location]);

  useEffect(() => {

    if(busqueda.trim().length === 0){
      setArrBusBus([])
    }
    // TODO: actualizar lista de chats de acuerdo a los mensajes entrantes
   
    if(!filtrar && elemento !== 'buscador'){
      const resultRes = fcoBusqueda(chatsRes, busqueda);
      setArrBusRes(resultRes);
      const resultVen = fcoBusqueda(chatsVen, busqueda);
      setArrBusVen(resultVen);
      const resultRech = fcoBusqueda(chatsRech, busqueda);
      setArrBusRech(resultRech);
      const resultTemp = fcoBusqueda(chatsTemp, busqueda);
      setArrBusTemp(resultTemp);
      const resultPre = fcoBusqueda(chatsPre, busqueda);
      setArrBusPre(resultPre);
      const resultCot = fcoBusqueda(chatsCoti, busqueda);
      setArrBusCot(resultCot);
      const resultCotAse = fcoBusqueda(chatsCotiasesor, busqueda);
      setArrBusCotAse(resultCotAse);
    }else if(busqueda.trim().length > 0 && elemento === 'buscador') {
      fnBusqueda(busqueda.trim()).then(datos => {
        if(datos.status === 200){
          setArrBusBus(datos.chats)
        }
      })
    }
   
  }, [busqueda, contChats, filtrar]);

  

  const handleFilter = () => {
    setListOp(!listOp)
  }

  const handleFilltar = (asesor) => {
    
    let filtrados
    setAsesor(asesor)
    setFiltrar(true)
    switch(elemento){
      case "residual":
        if(asesor.id === '123'){
          filtrados = chatsRes.filter(chat => chat.operador == null)
          setArrBusRes(filtrados)
        }else{
          filtrados = chatsRes.filter(chat => chat.operador === asesor.id)
          setArrBusRes(filtrados)
        }
       
        break;
      case "rechazado":
        if(asesor.id === '123'){
          filtrados = chatsRech.filter(chat => chat.operador == null)
          setArrBusRech(filtrados)
        }else{
          filtrados = chatsRech.filter(chat => chat.operador === asesor.id)
          setArrBusRech(filtrados)
        }
        
        break
      case "cotiasesor":
        filtrados = chatsCotiasesor.filter(chat => chat.operador === asesor.id)
        setArrBusCotAse(filtrados)
        break
      case "ventas":
        if(asesor.id === '123'){
          filtrados = chatsVen.filter(chat => chat.operador == null)
          setArrBusVen(filtrados)
        }else{
          filtrados = chatsVen.filter(chat => chat.operador === asesor.id)
          setArrBusVen(filtrados)
        }
        
        break
    }
    setListOp(false)
  }

  const handleChangeBusqueda = async (e) => {

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(()=>{
      setBusqueda(e.target.value)
    },1000)

    setTypingTimeout(timeout)


  }

  const handleClickX = () => {
    setFiltrar(false)
    setAsesor()
  }

  return (
    <>
      <aside className="md:w-80 lg:w-3/12 px-5 py-5 bg-gray-100 overflow-hidden  border-r border-stone-400 h-full md:block hidden">
      {elemento === "residual" && (
        <button
            type="button"
            className="w-full flex items-center justify-center bg-[#b9c2c7] hover:bg-[#a29de0] hover:text-white text-[#1f2937] font-medium text-lg transition ease-out duration-150 p-1 rounded-lg text-white mb-2 mt-16"
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
      )}
        
        <div className={`w-full  p-1 bg-[#b9c2c7] hover:bg-[#a29de0] hover:text-white text-[#1f2937] font-bold text-center rounded-lg flex justify-center items-center ${elemento !== "residual" ? "mt-16" : ""}`}>
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
         {asesor?.nombre ? (
          <>
            <p className="uppercase text-base">
              Total{" "}
              <span className="ml-3 text-base">
                {/* {rootPath === "residual" && arrBusRes.length} */}
                {/* {rootPath === "residual" && arrBusRes.length} */}
                {rootPath === "residual" && arrBusRes.length}
                {rootPath === "ventas" && arrBusVen.length}
                {rootPath === "rechazado" && arrBusRech.length}
                {rootPath === "cotizado" && contChats.totalCoti}
                {rootPath === "cotiasesor" && arrBusCotAse.length}
              </span>
            </p>
          </>
         ) : (
          <>
            <p className="uppercase text-base">
              Total{" "}
              <span className="ml-3 text-base">
                {/* {rootPath === "residual" && arrBusRes.length} */}
                {/* {rootPath === "residual" && arrBusRes.length} */}
                {rootPath === "residual" && contChats.totalResiduales}
                {rootPath === "ventas" && contChats.totalVenta}
                {rootPath === "rechazado" && contChats.totalRech}
                {rootPath === "temporal" && contChats.totalTemp}
                {rootPath === "pre-venta" && contChats.totalPreVenta}
                {rootPath === "cotizado" && contChats.totalCoti}
                {rootPath === "cotiasesor" && contChats.totalCotiasesor}
                {rootPath === "buscador" && arrBusBus.length}
              </span>
            </p>
          </>
         )}
          
        </div>
        <div className="flex items-center justify-center">
          <input
            type="text"
            className={`w-full ${condList && operadores.includes(decoded.id) ? "rounded-l-lg" : "rounded-lg"} border border-gray-400  p-2 mt-2 focus:outline-none`}
            placeholder="Busqueda por email o celular"
            onChange={handleChangeBusqueda}
          />
          {condList && operadores.includes(decoded.id)  && (
            <>
              <div className="bg-indigo-500 p-1.5 mt-2 rounded-r-lg">
                <button onClick={handleFilter}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    className="h-6 w-6 text-white"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" 
                    />
                  </svg>
                </button>
              </div>
              {listOp && (
                <div className={`absolute ${condStyle ? "top-[175px]" : "top-[225px]" }  bg-indigo-100 w-[300px] opacity-85 flex rounded-lg z-50`}>
                  <ul className="flex flex-col items-center justify-center w-full">
                    {asesoras.map(asesor => (
                      <li className="w-full text-center hover:bg-indigo-500 hover:text-white rounded-lg" key={asesor.id}>
                        <button type="button" className="w-full" key={asesor.id} onClick={() => handleFilltar(asesor)}>
                          {asesor.nombre}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
            </>
          )}
        </div>
        {asesor?.nombre && condList && (
          <p className="p-1 bg-pink-200 rounded-lg text-center mt-2 flex justify-around">
            {asesor.nombre}
            <button onClick={handleClickX}>
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
                  d="M6 18 18 6M6 6l12 12" 
                />
              </svg>

            </button>
          </p>
        )}
        <div className={`overflow-scroll  scrollbar-hide mt-4 drop-shadow-sm  ${elemento !== "residual" ? "h-2/3" : "h-[57%]"} border-b border-t border-stone-400 pt-4`}>
          {rootPath === "residual" &&
            arrBusRes.map((chat) => <Item key={chat._id} chat={chat} />)}
          {rootPath === "ventas" &&
            arrBusVen.map((chat) => <Item key={chat._id} chat={chat} />)}
          {rootPath === "rechazado" &&
            arrBusRech.map((chat) => <Item key={chat._id} chat={chat} />)}
          {rootPath === "temporal" &&
            arrBusTemp.map((chat) => <Item key={chat._id} chat={chat} />)}
          {rootPath === "pre-venta" &&
            arrBusPre.map((chat) => <Item key={chat._id} chat={chat} />)}
          {rootPath === "cotizado" &&
            arrBusCot.map((chat) => <Item key={chat._id} chat={chat} />)}
          {rootPath === "cotiasesor" &&
            arrBusCotAse.map((chat) => <Item key={chat._id} chat={chat} />)}
          {(rootPath === "buscador" && arrBusBus.length === 0 ) ? (
            <p>Sin resultados</p>
          ) : (
            arrBusBus.map((chat) => <Item key={chat._id} chat={chat} />)
          )}
        </div>
        <div className=" w-full rounded py-1 px-4 bg-indigo-500 mt-4 flex flex-row justify-between">
          <button className="active:scale-80 active:border-white active:border-2 active:rounded-lg" onClick={() => setPaginador(paginador + 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className=" w-5 h-5 text-white font-bold cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
          <div>
            <h3 className="text-white font-semibold">
              Cantidad chats: {rootPath === "residual" && arrBusRes.length}
              {rootPath === "ventas" && arrBusVen.length}
              {rootPath === "rechazado" && arrBusRech.length}
              {rootPath === "temporal" && arrBusTemp.length}
              {rootPath === "pre-venta" && arrBusPre.length}
              {rootPath === "cotizado" && arrBusCot.length}
              {rootPath === "cotiasesor" && arrBusCotAse.length}
              {rootPath === "buscador" && arrBusBus.length}
            </h3>
          </div>
        </div>
      </aside>
      <ModalChatInicial />

    </>
  );
};

export default SidebarResVen;
