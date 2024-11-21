import { Fragment, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'
import { Dialog, Transition, Listbox } from "@headlessui/react";
import Alerta from "./Alerta";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const roles = [
  { id: 1, name: "admin", unavailable: false },
  { id: 2, name: "moderator", unavailable: false },
  { id: 3, name: "user", unavailable: false },
];

const ModalCrearUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState(roles[0]);

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

  const params = useParams();

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token)
  const cond = decoded.id === '63ade3a73abf97575a693496'



  const key = params?.id?.split('&')[0]

  const navigate = useNavigate();

  const user = usuarios.find((user) => user._id === key);

  

  useEffect(() => {
    setAlerta({});
    setNombre("");
    setEmail("");
    setPassword("");
  }, []);

  useEffect(() => {
    if (params?.id) {
      usuarioXID(params.id);
      setNombre(user.username);
      setEmail(user.email);
    } else {
      setNombre("");
      setEmail("");
      setPassword("");
    }
  }, [params]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre.length === 0 || email.length === 0 || password.length === 0) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
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
    const roles = [];
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

    setTimeout(() => {
      handleClose();
      listaUsuarios();
      setAlerta({});
    }, 3000);
  };

  const handleClose = () => {
    handleModalCrearUsuario();
    setNombre("");
    setEmail("");
    setPassword("");
    navigate("/usuarios");
  };

  const { msg } = alerta;

  return (
    <Transition.Root show={modalCrearUsuario} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => handleClose()}
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
                    Crear un Nuevo Usuario
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
                        htmlFor="pass"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Contraseña
                      </label>
                      <input
                        type="password"
                        id="pass"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="CaroDiaz_$%&"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {cond && (
                        <div className="mb-5">
                          <label
                            htmlFor="role"
                            className="text-gray-700 uppercase font-bold text-sm"
                          >
                            Roles
                          </label>
                          <div className="w-full text-center p-1 bg-slate-200 rounded-lg font-bold text-gray-600">
                            <Listbox value={selected} onChange={setSelected}>
                              <Listbox.Button className="w-full uppercase">
                                {selected.name}
                              </Listbox.Button>
                              <Listbox.Options>
                                {roles.map((person) => (
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
                    )}
                  

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
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                      {params?.id ? "Guardar Cambios" : "Crear Usuario"}
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

export default ModalCrearUsuario;
