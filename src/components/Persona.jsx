import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useChats } from "../hooks/useChats";

const Persona = ({ persona }) => {
  const { submitChatInicial } = useChats();
  const { nombre, fechaAlta, email, movil, pais } = persona;

  const handleSubmitMsj = (user, movil) => {
    const descripcion = `¡Hola ${user.trim()}! Te contactamos desde Andes Salud 😊. Nos dejaste tus datos en nuestra plataforma. ¿Estás disponible para que te envíe información acerca de las distintas opciones de cobertura médica que tenemos para ofrecerte?`;
    console.log(descripcion);
    const telefono = `${persona.codigoPais}${persona.pref3}${movil}`;
    console.log(telefono);
    const nombre = user.trim();
    submitChatInicial({ nombre, telefono, descripcion });
  };
  return (
    <>
      <Disclosure as="div" className="mt-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-500 px-4 py-2 text-left text-md  text-white hover:bg-slate-700 focus:outline-none focus-visible:ring focus-visible:ring-indigo-600 focus-visible:ring-opacity-75">
              <span>{nombre}</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-white`}
              />
            </Disclosure.Button>
            <Disclosure.Panel
              as="div"
              className="px-5 pt-4 pb-2 text-md text-gray-800 bg-slate-200 rounded-lg mt-2 flex justify-between items-center"
            >
              <ul>
                <li>email: {email}</li>
                <li>telefono: {movil}</li>
                <li>Campaña: {pais}</li>
                <li>fecha: {fechaAlta}</li>
                <li>
                  Responsable:{" "}
                  {`${persona.personaDep?.nombre} ${persona.personaDep?.apellido}`}
                </li>
              </ul>
              <button
                className="flex justify-evenly items-center w-fit h-fit p-3 rounded-lg transition-colors   bg-slate-400 mt-2 text-white  text-md hover:bg-indigo-700"
                onClick={() => handleSubmitMsj(nombre, movil)}
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
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
                Enviar Mensaje
              </button>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Persona;
