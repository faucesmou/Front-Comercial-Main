import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition, Listbox} from "@headlessui/react";
// import { useProyectos } from "../hooks/useProyectos";
import { fnDoceHoras } from "../helpers/herramientas";
import { useChats } from "../hooks/useChats";
import Alerta from "./Alerta";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const plantillas = [
  { 
    id: 0, 
    name: "Inicio", 
    description: `Te doy la bienvenida a la Primera Prepaga Totalmente Digital del País 😊. 
    Te escribo porque completaste el formulario con tus datos en nuestra página.
    ¿Estás buscando una opción de medicina prepaga que sea accesible y completamente digital?
    Ofrecemos el mejor servicio y los mejores precios del país. 
    ¿Estás disponible para que te cotice?`, 
    unavailable: false 
  },
  { 
    id: 1, 
    name: "Residual", 
    description: `¡Bienvenido a Andes Salud 😊, la primera prepaga digital del país!
    Afiliate sin moverte de tu casa 📲. ¡Tenemos los mejores precios del país!
    ¿Puedo contarte sobre los distintos planes que tenemos para ofrecerte y sus beneficios?
    ¡Aguardo tu respuesta para poder asesorarte!
    Muchas gracias😊`,
    unavailable: false 
  },
  {
    id: 2,
    name: "Cordoba",
    description: `¿Estás en relación de dependencia y sos soltero o soltera? ¿Estás ganando $750.000 mensuales?
    ¡Podés acceder a cualquiera de nuestros planes prestacionales solo con tu aporte!

    ¿Estás en relación de dependencia y tenés grupo familiar? ¿Estás ganando $1.100.000 mensuales?
    ¡Podés acceder a cualquiera de nuestros planes prestacionales! ¡Desde $32.000 para todo el grupo familiar!

    ¡Cotizá y comprobalo vos mismo!
    No te pierdas la oportunidad de ser parte de la primera prepaga totalmente digital del país!`,
    unavailable: false
  },
  {
    id: 3,
    name: "Saludo Inicial",
    description: `¡Hola! Es un gusto poder asesorarte, me contacto de Andes Salud debido a que dejaste tus datos en nuestra plataforma.
    ¿Estás disponible para que repasemos los planes que tenemos para ofrecerte? Gracias.
    `
  },
  {
    id: 4,
    name: "Ingreso",
    description: `¿Cómo querés adherirte? ¿Trabajás en relación de dependencia, sos monotributista o buscás hacerlo de forma particular?
    `
  },
  {
    id: 5,
    name: "cuyo",
    description: `¿Estás en relación de dependencia y sos soltero? ¿Estás ganando $750.000 mensuales?
    ¡Podés acceder a cualquiera de nuestros planes prestacionales, solo con tu aporte!

    ¿Estás en relación de dependencia y tenés grupo familiar? ¿Estás ganando $1.100.000 mensuales?
    ¡Podés acceder a cualquiera de nuestros planes prestacionales desde $7.000, para todo el grupo familiar!

    ¡Cotizá y comprobalo vos mismo!
    No te pierdas la oportunidad de ser parte de la primera prepaga totalmente digital del país.
    `
  },
  {
    id: 6,
    name: "coti cuyo",
    description: `Teniendo en cuenta la información que nos enviaste, esta sería la cotización para vos:

    Plan Titanium: {{Titanium}}
    Plan Black: {{Black}}
    Plan Platinum: {{Platinum}}

    ¿Querés que avancemos con alguno? ¡Si tenés alguna duda, acá estoy!
    `
  },
  {
    id: 7,
    name: "coti cba",
    description: `Teniendo en cuenta la información que nos enviaste, esta sería la cotización para vos:

    Plan Titanium: {{Titanium}}
    Plan Black: {{Black}}

    ¿Querés que avancemos con alguno? ¡Si tenés alguna duda, acá estoy!
    `
  },
  {
    id: 8,
    name: "cierre",
    description: `¡Hola! Tus datos han sido ingresados correctamente en el sistema de Afiliaciones. 
    Te pido, por favor, que estés atento al mensaje de WhatsApp donde se coordinará la llamada para la verificación telefónica de los datos afiliatorios.
    Saludos cordiales.
    `
  },
  {
    id: 9,
    name: "cotizado",
    description: `¡Hola! Me contacto nuevamente desde Andes Salud para conocer tu opinión sobre la cotización enviada. 

    Somos la primera Prepaga 100% digital del País. 
    ✔️Precios a tu alcance
    ✔️Adhesión rápida y sencilla
    ✔️Principales Clínicas y Sanatorios de tu ciudad
    ✔️App móvil de Autogestión y Credencial digital
    ✔️PIXI: Asistente virtual las 24 hs

    ¿Qué plan vas a elegir para el cuidado de tu salud y el de tu familia?

    ¡Espero tu mensaje, saludos!`
  }
];

const ModalChatInicial = () => {
  const [error,setError] = useState("")
  const [nombre, setNombre] = useState("");
  const [selected, setSelected] = useState(plantillas[0])
  const [telefono, setTelefono] = useState("");
  const [descripcion, setDescripcion] = useState(
    "¡Hola! Te contactamos desde Andes Salud 😊. Nos dejaste tus datos en nuestra plataforma. ¿Estás disponible para que te envíe información acerca de las distintas opciones de cobertura médica que tenemos para ofrecerte?"
  );
  const [black, setBlack] = useState("")
  const [titanium, setTitanium] = useState("")
  const [platinum, setPlatinum] = useState("")

  const fecha = new Date()
  const diaHora = fecha.toLocaleString("es-AR",{
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric", 
    hour: "2-digit", 
    minute: "2-digit", 
    hour12: false
  })
  const arregloFecha = diaHora.split(', ')

  const params = useParams();
  const location = useLocation()
  const navigate = useNavigate();

  const numero = location.pathname.split('/')[2]
  const categoria = location.pathname.split('/')[1]

  const {
    modalChatInicial,
    handleModalChatInicial,
    alerta,
    setAlerta,
    chats,
    setChats,
    submitChatInicial,
    listaMensajes,
    mensajes
  } = useChats();

  

  useEffect(()=>{
    setSelected(plantillas[0])
    setBlack('')
    setPlatinum('')
    setTitanium('')
    setTelefono('')
    setError('')
  },[,location])

  let ultimo
  useEffect(()=>{
    if(numero !== undefined){
      setTelefono(numero)

      let num = mensajes.length - 1
      ultimo = mensajes[num]
      
      while(ultimo?.nota || ultimo?.msjSalida){
        num -= 1
        ultimo = mensajes[num]
      }

     
      // listaMensajes(numero)
      // console.log(mensajes);
      // console.log(ultimo)
      if(ultimo){
        
        const diferencia = fnDoceHoras(ultimo)


        if(diferencia < 12){
          setError('La diferencia para enviar plantillas debe ser mayor o igual a 12 hs')
        }
      }
      
      
      
    }
  },[mensajes, error])

  //TODO: verificar funcionalidad en este useEffect
  useEffect(() => {
    const cadena = `¡Hola ${nombre}! Te contactamos desde Andes Salud 😊. Nos dejaste tus datos en nuestra plataforma. ¿Estás disponible para que te envíe información acerca de las distintas opciones de cobertura médica que tenemos para ofrecerte?`;
    setDescripcion(cadena);
  }, [nombre]);

  useEffect(()=>{
    if(selected.name === ""){
      console.log(selected.name);
      
    }
  },[selected])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = /^549\d{10}$/;

    if ([descripcion, telefono].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (!regex.test(telefono)) {
      setAlerta({
        // msg: "El número debe tener al menos 13 caracteres",
        msg: "El número no cumple con el siguiente formato 549{10}",
        error: true,
      });
      return;
    }

    if(selected.name === "coti cuyo" && (platinum <= 1000 || black <= 1000 || titanium <= 1000)){
      setAlerta({
        // msg: "El número debe tener al menos 13 caracteres",
        msg: "Ningún valor de la cotización puede ser menor o igual a 1000",
        error: true,
      });
      return;
    }

    if(selected.name === "coti cba" && ( black <= 1000 || titanium <= 1000)){
      setAlerta({
        // msg: "El número debe tener al menos 13 caracteres",
        msg: "Ningún valor de la cotización puede ser menor o igual a 1000",
        error: true,
      });
      return;
    }


    // aca tenemos que proceder a enviar los datos al provider para luego enviarlos
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    await submitChatInicial({ nombre, telefono, descripcion, condicion: selected.id, categoria, cotizacion: {platinum, black, titanium} });
    if(params.id === telefono){
      listaMensajes(telefono)
    }

   /*  const objeto = {
      condicion: 'Abierto',
      msjResidual: false,
      nota: 'vacio',
      segunda: false,
      telefono
    }
    setChats([...chats,objeto]) */

    setAlerta({
      msg: "Mensaje Enviado Correctamente",
      error: false,
    });

    setTimeout(() => {
      handleModalChatInicial();
      setNombre("");
      setTelefono("");
    }, 3000);
  };

 

  const { msg } = alerta;

  return (
    <Transition.Root show={modalChatInicial} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalChatInicial}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalChatInicial}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    Enviar Plantilla
                  </Dialog.Title>
                  {msg && <Alerta alerta={alerta} />}
                  <form className="my-10" onSubmit={handleSubmit}>
                    {/*  <div className="mb-5">
                      <label
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Nombre contacto
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Ej: Maria Cecilia"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div> */}
                    <div className="mb-5">
                      <label
                        htmlFor="telefono"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Telefono contacto
                      </label>
                      <input
                        type="number"
                        id="telefono"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Ej: 5492615666777"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="role"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Plantillas
                      </label>
                      <div className="w-full text-center p-1 bg-slate-200 rounded-lg font-bold text-gray-600">
                        <Listbox value={selected} onChange={setSelected}>
                          <Listbox.Button className="w-full uppercase">
                            {selected.name}
                          </Listbox.Button>
                          <Listbox.Options>
                            {plantillas.map((plantilla) => (
                              <Listbox.Option
                                key={plantilla.id}
                                value={plantilla}
                                disabled={plantilla.unavailable}
                                className="hover:bg-slate-400 hover:text-white transition-colors rounded-lg uppercase hover:cursor-pointer"
                              >
                                {plantilla.name}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Listbox>
                      </div>
                    </div>
                    {(selected.name === "coti cuyo" || selected.name === "coti cba") && (
                      <div className="mb-5">
                        <label
                          htmlFor="titanium"
                          className="text-gray-700 uppercase font-bold text-sm"
                        >
                          Plan Titanium
                        </label>
                        <input
                          type="number"
                          id="titanium"
                          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                          placeholder="Ej: $55000"
                          value={titanium}
                          onChange={(e) => setTitanium(e.target.value)}
                        />
                      </div>
                    )}

                    {(selected.name === "coti cuyo" || selected.name === "coti cba") && (
                      <div className="mb-5">
                        <label
                          htmlFor="black"
                          className="text-gray-700 uppercase font-bold text-sm"
                        >
                          Plan Black
                        </label>
                        <input
                          type="number"
                          id="black"
                          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                          placeholder="Ej: $45000"
                          value={black}
                          onChange={(e) => setBlack(e.target.value)}
                        />
                      </div>
                    )}

                    {(selected.name === "coti cuyo") && (
                      <div className="mb-5">
                        <label
                          htmlFor="platinum"
                          className="text-gray-700 uppercase font-bold text-sm"
                        >
                          Plan Platinum
                        </label>
                        <input
                          type="number"
                          id="platinum"
                          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                          placeholder="Ej: $35000"
                          value={platinum}
                          onChange={(e) => setPlatinum(e.target.value)}
                        />
                      </div>
                    )}
                   
                    <div className="mb-5">
                      <label
                        htmlFor="descripcion"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Descripcion del Mensaje
                      </label>
                      <textarea
                        id="descripcion"
                        disabled
                        className="border-2 w-full h-36 p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Descripcion del Mensaje"
                        value={selected.description}
                        onChange={(e) => setDescripcion(e.target.value)}
                        // onChange={() =>{}}
                      />
                    </div>

                   
                    {error !== '' ? (
                      <p 
                        className="from-red-400 to-red-600 bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10"
                      >
                        {error}
                      </p>
                    ): (
                      <button
                        type="submit"
                        className="bg-indigo-300 flex items-center justify-center hover:bg-indigo-600 text-sm cursor-pointer w-full font-bold p-3 text-white uppercase rounded-lg transition-colors"
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
                        Iniciar Chat
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalChatInicial;
