import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import Alerta from "./Alerta";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useChats } from "../hooks/useChats";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const provincias = [
  { id: 1, name: "mendoza", unavailable: false },
  { id: 2, name: "san luis", unavailable: false },
  { id: 3, name: "san juan", unavailable: false },
  { id: 4, name: "cordoba", unavailable: false },
];

const planes = [
  { id: 1, name: "platinum", unavailable: false },
  { id: 2, name: "black", unavailable: false },
  { id: 3, name: "titanium", unavailable: false },
];

const ModalVenta = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [cuil, setCuil] = useState("");
  const [medio, setMedio] = useState("");
  const [fecha, setFecha] = useState("");
  const [capitas, setCapitas] = useState(1);
  const [hora, setHora] = useState(0);
  const [selected, setSelected] = useState({
    id: 0,
    name: "seleccione una provincia",
    unavailable: false,
  });
  const [selec, setSelec] = useState({
    id: 0,
    name: "seleccione un plan",
    unavailable: false,
  });

  const today = new Date().toISOString().split("T")[0];

  const {
    handleModalCrearUsuario,
    modalCrearUsuario,
    alerta,
    usuarios,
    setAlerta,
    usuarioXID,
    signUp,
    listaUsuarios,
    actualizar,
  } = useAuth();

  const { handleModalVenta, modalVenta, fnVenta } = useChats();

  const params = useParams();

  const navigate = useNavigate();

  const limpiar = () => {
    setNombre("");
    setEmail("");
    setCuil("");
    setMedio("");
    setFecha("");
    setHora();
  };

  // const user = usuarios.find((user) => user._id === params.id);
 
  useEffect(() => {
    /*   if (params?.id) {
      usuarioXID(params.id);
      setNombre(user.username);
      setEmail(user.email);
    } else {
      setNombre("");
      setEmail("");
      setPassword("");
    } */
  }, [params]);

  const handleSubmit = async (e) => {
    const regex = /^\d{11}$/
    try {
      e.preventDefault();
      if (nombre === "" || email === "" || cuil === "" || medio === "") {
        throw new Error("Todos los campos son obligatorios");
      }

      if (selected.id === 0) {
        throw new Error("Debe seleccionar una provincia");
      }

      if (selec.id === 0) {
        throw new Error("Debe seleccionar un plan");
      }

      if(!regex.test(cuil)){
        throw new Error("Formato incorrecto para el cuil");
      }
      
      if(capitas < 1 || capitas > 10){
        throw new Error("Capitas > 0 && Capitas < 11");
      }

      await fnVenta({
        nombre,
        email,
        cuil,
        medio,
        provincia: selected.name,
        plan: selec.name,
        telefono: params.id,
        capitas,
        fecha,
        hora,
      });

      setAlerta({
        msg: "Venta registrada",
        error: false,
      });
      /*  const roles = [];
      if (params?.id) {
        roles.push(selected.name);
        await actualizar(nombre, email, password, roles, params.id);
        handleClose();
      } else {
        roles.push(selected.name);
        const usuario = await signUp(nombre, email, password, roles);
        setAlerta({
          msg: "Usuario Creado Correctamente",
          error: false,
        });
      }
 */
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.message,
        error: true,
      });
     /*  setTimeout(() => {
        handleClose();
      }, 3000); */
    }
  };

  const handleClose = () => {
    handleModalVenta();
    limpiar();
    setAlerta({});
    navigate("/residual");
  };

  const { msg } = alerta;

  return (
    <Transition.Root show={modalVenta} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => handleClose()}
      >
        <div className="flex items-end justify-center min-h-screen pt-2 px-4 pb-16 text-center sm:block sm:p-0">
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-2 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => handleClose()}
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
                    Venta / Datos Verificación Telefónica
                  </Dialog.Title>
                  {msg && <Alerta alerta={alerta} />}
                  <form className="my-10" onSubmit={handleSubmit}>
                    <div className="mb-5">
                      <label
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Carolina Diaz"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="carolina.diaz@andessalud.ar"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="cuil"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Cuil
                      </label>
                      <input
                        type="text"
                        id="cuil"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="20454445550"
                        value={cuil}
                        onChange={(e) => setCuil(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="medio"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Medio de pago
                      </label>
                      <input
                        type="text"
                        id="medio"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="CBU, Mercado Pago, Débito..."
                        value={medio}
                        onChange={(e) => setMedio(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="capitas"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Capitas
                      </label>
                      <input
                        type="number"
                        id="capitas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Ej: 3"
                        value={capitas}
                        onChange={(e) => setCapitas(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="fecha"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Fecha VT
                      </label>
                      <input
                        type="date"
                        id="fecha"
                        min={today}
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="CBU, Mercado Pago, Débito..."
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="hora"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Hora VT
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={2359}
                        id="hora"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="17"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="provincia"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Provincia
                      </label>
                      <div className="w-full text-center p-1 bg-slate-200 rounded-lg font-bold text-gray-600">
                        <Listbox value={selected} onChange={setSelected}>
                          <Listbox.Button className="w-full uppercase">
                            {selected.name}
                          </Listbox.Button>
                          <Listbox.Options>
                            {provincias.map((person) => (
                              <Listbox.Option
                                key={person.id}
                                value={person}
                                disabled={person.unavailable}
                                className="hover:bg-slate-400 hover:text-white transition-colors rounded-lg uppercase hover:cursor-pointer"
                              >
                                {person.name}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Listbox>
                      </div>
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="plan"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Plan
                      </label>
                      <div className="w-full text-center p-1 bg-slate-200 rounded-lg font-bold text-gray-600">
                        <Listbox value={selec} onChange={setSelec}>
                          <Listbox.Button className="w-full uppercase">
                            {selec.name}
                          </Listbox.Button>
                          <Listbox.Options>
                            {planes.map((plan) => (
                              <Listbox.Option
                                key={plan.id}
                                value={plan}
                                disabled={plan.unavailable}
                                className="hover:bg-slate-400 hover:text-white transition-colors rounded-lg uppercase hover:cursor-pointer"
                              >
                                {plan.name}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Listbox>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-indigo-300 flex items-center justify-center hover:bg-indigo-600 text-sm cursor-pointer w-full font-bold p-3 text-white uppercase rounded-lg transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mr-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                        />
                      </svg>
                      {/* {params?.id ? "Guardar Cambios" : "Crear Usuario"} */}
                      Crear Venta
                    </button>
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

export default ModalVenta;
