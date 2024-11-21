import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import Alerta from "./Alerta";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useChats } from "../hooks/useChats";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const provincias = [
  { id: 1, name: "mendoza", unavailable: false },
  { id: 2, name: "san luis", unavailable: false },
  { id: 3, name: "san juan", unavailable: false },
  { id: 4, name: "cordoba", unavailable: false },

];

const categoria = [
  { id: 1, name: "ADH", unavailable: false },
  { id: 2, name: "MON", unavailable: false },
  { id: 3, name: "REL", unavailable: false },
];

const motivos2 = [
  { id: 1, name: "parametro", unavailable: false },
  { id: 2, name: "provincia", unavailable: false },
  { id: 3, name: "mora de aportes", unavailable: false },
  { id: 4, name: "espera opcion de cambio", unavailable: false },
  { id: 5, name: "sin interes", unavailable: false },
  { id: 6, name: "precio elevado", unavailable: false },
];

const ModalCotizado = () => {
  const [titanium, setTitanium] = useState("");
  const [black, setBlack] = useState("");
  const [platinum, setPlatinum] = useState("");
  const [capitas, setCapitas] = useState("");

  const [selected, setSelected] = useState(provincias[0]);
  const [selec, setSelec] = useState(categoria[0]);

  const today = new Date().toISOString().split("T")[0];

  const location = useLocation();

  const elemento = location.pathname.split("/")[1];
  const telefono = location.pathname.split("/")[2];

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

  const { handleModalCotizado, modalCotizado, fnCotizado, chatsRes, setChatsRes } = useChats();

  const params = useParams();

  const navigate = useNavigate();

  const limpiar = () => {
    setTitanium("");
  };

  // const user = usuarios.find((user) => user._id === params.id);

  useEffect(() => {
    setSelec({ id: 0, name: "seleccione una opcion", unavailable: false });
    setSelected({ id: 0, name: "seleccione una opcion", unavailable: false });
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
     

      if (selec.id === 0 || selected.id === 0) {
        throw new Error("Debe seleccionar una opción");
      }

      if (titanium === "" || black === "" || platinum === "" || capitas === "") {
        throw new Error("Debe ingresar datos en los campos titanium, black, platinum o capitas");
      }

      // alert(` 
      //   titanium: ${titanium} \n
      //   black: ${black} \n
      //   platinum: ${platinum} \n
      //   provincia: ${selected.name} \n
      //   categoria: ${selec.name} \n
      //   capitas: ${capitas}
      // `)

    // console.log(telefono);
    // console.log(chatsRes);
    // const filtradosRes = chatsRes.filter(chat => chat.telefono !== telefono) 
    // console.log(filtradosRes);
    
    

      await fnCotizado({
        telefono,
        cotizacion: {
          titanium,
          black,
          platinum,
          provincia: selected.name,
          categoria: selec.name,
          grupo: +capitas
        }
      });

      setAlerta({
        msg: "Cotización registrada",
        error: false,
      });

      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.message,
        error: true,
      });
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  };

  const handleClose = () => {
    handleModalCotizado();
    limpiar();
    setAlerta({});
    if (elemento === "ventas") {
      navigate("/ventas");
    }

    if (elemento === "chats") {
      navigate("/chats");
    }

    if (elemento === "residual") {
      navigate("/residual");
    }
  };

  const { msg } = alerta;

  return (
    <Transition.Root show={modalCotizado} as={Fragment}>
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
                    Cotizado / Ficha de datos
                  </Dialog.Title>
                  {msg && <Alerta alerta={alerta} />}
                  <form className="my-10" onSubmit={handleSubmit}>
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
                        Categoria
                      </label>
                      <div className="w-full text-center p-1 bg-slate-200 rounded-lg font-bold text-gray-600">
                        <Listbox value={selec} onChange={setSelec}>
                          <Listbox.Button className="w-full uppercase">
                            {selec.name}
                          </Listbox.Button>
                          <Listbox.Options>
                              {categoria.map((plan) => (
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

                    <div className="mb-5">
                      <label
                        htmlFor="titanium"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Titanium
                      </label>
                      <input
                        type="number"
                        id="titanium"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Ej: 25000"
                        value={titanium}
                        onChange={(e) => setTitanium(e.target.value.toString())}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="black"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Black
                      </label>
                      <input
                        type="number"
                        id="black"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Ej: 25000"
                        value={black}
                        onChange={(e) => setBlack(e.target.value.toString())}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="platinum"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Platinum
                      </label>
                      <input
                        type="number"
                        id="platinum"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Ej: 25000"
                        value={platinum}
                        onChange={(e) => setPlatinum(e.target.value.toString())}
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
                        placeholder="4"
                        value={capitas}
                        onChange={(e) => setCapitas(e.target.value.toString())}
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-yellow-300 flex items-center justify-center hover:bg-yellow-600 text-sm cursor-pointer w-full font-bold p-3 text-white uppercase rounded-lg transition-colors"
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
                          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                        />
                      </svg>
                      {/* {params?.id ? "Guardar Cambios" : "Crear Usuario"} */}
                      
                      Cotizar
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

export default ModalCotizado;
