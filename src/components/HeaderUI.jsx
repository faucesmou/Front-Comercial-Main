import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../hooks/useAuth";
import { useChats } from "../hooks/useChats";
import { Link, useParams, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderUI() {
  const [btnChats, setBtnChats] = useState(false);
  const [btnUsers, setBtnUsers] = useState(false);
  const [btnVentas, setBtnVentas] = useState(false);
  const [btnResidual, setBtnResidual] = useState(false);
  const [btnRechazado, setBtnRechazado] = useState(false);
  const [btnCotizado, setBtnCotizado] = useState(false);
  const [btnCotiasesor, setBtnCotiasesor] = useState(false);
  const [btnVerificaciones, setBtnVerificaciones] = useState(false);
  const [infoCero,setInfoCero] = useState("")
  const [showCero, setShowCero] = useState(false)
  const [infoUno,setInfoUno] = useState("")
  const [showUno, setShowUno] = useState(false)
  const [infoDos,setInfoDos] = useState("")
  const [showDos, setShowDos] = useState(false)
  const [infoTres,setInfoTres] = useState("")
  const [showTres, setShowTres] = useState(false)
  const [infoCuatro,setInfoCuatro] = useState("")
  const [showCuatro, setShowCuatro] = useState(false)
  const [infoCinco,setInfoCinco] = useState("")
  const [showCinco, setShowCinco] = useState(false)
  const [infoSeis,setInfoSeis] = useState("")
  const [showSeis, setShowSeis] = useState(false)
  const { usuario, cerrarSesion } = useAuth();
  const { cerrarSesionChats, setMensajes, setInfoChat, operadores } = useChats();
  const params = useParams();

  const { id } = params;

  let navigation = [];

  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token)

  const condicion = operadores.includes(decoded.id)


  const location = useLocation();
  const pathname = location.pathname;
  const elemento = pathname.split("/")[1];

  useEffect(() => {
    const pathname = location.pathname;
    const elemento = pathname.split("/")[1];

    switch (elemento) {
      case "chats":
        setBtnChats(true);
        break;
      case "ventas":
        setBtnVentas(true);
        break;
      case "usuarios":
        setBtnUsers(true);
        break;
      case "residual":
        setBtnResidual(true);
        break;
      case "rechazado":
        setBtnRechazado(true);
        break;
      case "verificaciones":
        setBtnVerificaciones(true);
        break;
      case "cotizado":
        setBtnCotizado(true);
        break;
      case "cotiasesor":
        setBtnCotiasesor(true);
        break;
     
    }

    return () => {
      setBtnChats(false);
      setBtnUsers(false);
      setBtnVentas(false);
      setBtnResidual(false);
      setBtnRechazado(false);
      setBtnCotizado(false);
      setBtnCotiasesor(false);
      setBtnVerificaciones(false);
    };
  }, [location]);

  useEffect(() => {
    if(usuario.roles[0].name === "admin"){
      setInfoCero("Chats abiertos")
      setInfoUno("Clientes que están listos para comprar")
      setInfoDos("Chats que han quedado en suspenso o sin respuesta")
      setInfoTres("Rechazos temporales y definitivos")
      setInfoCuatro("Gestión de usuarios")
     /*  setInfoCuatro("Chats cotizados por el Bot") */
      setInfoCinco("Chats cotizados por los asesores")
      setInfoSeis("Gestión de usuarios")
    }else if(usuario.roles[0].name === "user"){
      /* REVISAR SI VAMOS A DEJAR ESTA VARIACION ENTRE USERS Y ADMINS: ------------>>>> */
      setInfoCero("1° y 2° Gestión")
      setInfoUno("Chats Cotizados")
      setInfoDos("Chats Ventas")
      setInfoTres("Rechazos temporales y definitivos")
    }
  },[])

  if (usuario.roles[0].name === "admin") {
    navigation = new Array(
      { name: "Bot", href: "/chats", current: btnChats },
      // { name: "Usuarios", href: "/usuarios", current: btnUsers },
      // { name: "Pre-Venta", href: "/pre-venta", current: false },
      { name: "Ventas", href: "/ventas", current: btnVentas },
      { name: "Residual", href: "/residual", current: btnResidual },
      // { name: "Temporal", href: "/temporal", current: false },
      { name: "Rechazado", href: "/rechazado", current: btnRechazado },
    /*   { name: "CotiBot", href: "/cotizado", current: btnCotizado }, */
     /*  { name: "Cotizados", href: "/cotiasesor", current: btnCotiasesor }, */
      { name: "Usuarios", href: "/usuarios", current: btnUsers }
      /*  {
        name: "Verificaciones",
        href: "/verificaciones",
        current: btnVerificaciones,
      } */
    );
  } else if (usuario.roles[0].name === "user") {
    navigation = new Array(
      {
        name: "Mis Ingresos",
        href: "/residual",
        current: btnResidual,
      },
 /*      {
        name: "Mis Cotizados",
        href: "/cotiasesor",
        current: btnCotiasesor,
      }, */
      {  name: "Ventas", href: "/ventas", current: btnVentas },
      {  name: "Rechazado", href: "/rechazado", current: btnRechazado }
    );
  } else if (usuario.roles[0].name === "moderator") {
    navigation = new Array({
      name: "Residual",
      href: "/residual",
      current: btnVerificaciones,
    });
  }

  const handleCerrarSesion = () => {
    cerrarSesion();
    cerrarSesionChats();
  };

  const handleBoton = (item) => {
    setInfoChat({});
    setMensajes({});
  };
  return (
    <Disclosure as="nav" className="bg-gray-900 m-0 h-16 fixed w-full">
      {({ open }) => (
        <>
          <div className="m-0 mx-auto max-w-7xl px-2 sm:px-3 lg:px-3">
            <div className=" flex h-16 items-center justify-between">
              <div className=" inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button 
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="ml-3 text-white text-md uppercase">
                    {usuario.username}
                  </p>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 static" >
                    {navigation.map((item, index) => (
                        <Link
                          key={item.name}
                          onClick={() => handleBoton(item)}
                          onMouseEnter={() => {
                            switch(index){
                              case 0:
                                setShowCero(true)
                                break;
                              case 1:
                                setShowUno(true)
                                break;
                              case 2:
                                setShowDos(true)
                                break;
                              case 3:
                                setShowTres(true)
                                break;
                              case 4:
                                setShowCuatro(true)
                                break;
                              case 5:
                                setShowCinco(true)
                                break;
                              case 6:
                                setShowSeis(true)
                                break;
                            }
                          }}
                          onMouseLeave={() => {
                            setShowCero(false)
                            setShowUno(false)
                            setShowDos(false)
                            setShowTres(false)
                            setShowCuatro(false)
                            setShowCinco(false)
                            setShowSeis(false)
                          }}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-300 text-gray-900 font-medium"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-md font-medium static"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                          {(showCero && index === 0) && (
                            <span className="absolute p-1 bg-amber-200 rounded text-gray-700">
                              {infoCero}
                            </span>
                          )}
                           {(showUno && index === 1) && (
                            <span className="absolute p-1 bg-amber-200 rounded text-gray-700">
                              {infoUno}
                            </span>
                          )}
                           {(showDos && index === 2) && (
                            <span className="absolute p-1 bg-amber-200 rounded text-gray-700">
                              {infoDos}
                            </span>
                          )}
                          {(showTres && index === 3) && (
                            <span className="absolute p-1 bg-amber-200 rounded text-gray-700">
                              {infoTres}
                            </span>
                          )}
                          {(showCuatro && index === 4) && (
                            <span className="absolute p-1 bg-amber-200 rounded text-gray-700">
                              {infoCuatro}
                            </span>
                          )}
                          {(showCinco && index === 5) && (
                            <span className="absolute p-1 bg-amber-200 rounded text-gray-700">
                              {infoCinco}
                            </span>
                          )}
                          {(showSeis && index === 6) && (
                            <span className="absolute p-1 bg-amber-200 rounded text-gray-700">
                              {infoSeis}
                            </span>
                          )}
                        </Link>
                    ))}
                  </div>
                </div>
              </div>
             
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"> 
                {/* icono para la carga */}
                {condicion && (
                  <>
                  
                    <Link
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      to={'/buscador'}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor" 
                        className="h-6 w-6 text-white"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
                        />
                      </svg>

                    </Link>
                    <Link
                      to={"/herramientas"}
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="h-6 w-6 text-white"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
                        />
                      </svg>


                    </Link>
                  </>
                  
                )}
               
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-13 rounded-full"
                        // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        src="../../favicon2-CropCircle.png"
                        alt="logo Perfil"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                     {/*  <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-200" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Perfil
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-200" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Configuración
                          </a>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-200" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={handleCerrarSesion}
                          >
                            Cerrar Sesión
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
