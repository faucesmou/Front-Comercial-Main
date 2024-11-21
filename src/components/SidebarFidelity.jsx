import React, { useState, useEffect } from "react";
import { fcoBusqueda } from "../helpers/herramientas";

const SidebarFidelity = () => {
  const [busqueda, setBusqueda] = useState("");
  const [arrBusRes, setArrBusRes] = useState([]);
  const [paginador, setPaginador] = useState(1);

  useEffect(() => {
    // console.log("Estoy cargando el sidebar fidelity");
  }, []);

  useEffect(() => {
    const resultRes = fcoBusqueda([], busqueda);
    setArrBusRes(resultRes);
  }, [busqueda]);

  return (
    <>
      <aside className="md:w-80 lg:w-3/12 px-5 py-5 bg-gray-100 overflow-hidden  border-r border-stone-400 h-full md:block hidden">
        <div className="w-full  p-2 bg-gray-300 text-gray-900 font-bold text-center rounded-lg flex justify-center items-center mt-16">
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

          <p className="uppercase text-base">
            Total{" "}
            <span className="ml-3 text-base">
              {/* {rootPath === "residual" && arrBusRes.length} */}
              666
            </span>
          </p>
        </div>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-400  p-2 mt-2 focus:outline-none"
          placeholder="Busqueda por email o celular"
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <div className="overflow-scroll  scrollbar-hide mt-4 drop-shadow-sm  h-2/3 border-b border-t border-stone-400 pt-4">
          {arrBusRes.map((chat) => (
            <Item key={chat._id} chat={chat} />
          ))}
        </div>
        <div className=" w-full rounded py-1 px-4 bg-indigo-500 mt-4 flex flex-row justify-between">
          <button className="" onClick={() => setPaginador(paginador + 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-3 w-5 h-5 text-white font-bold cursor-pointer"
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
              Cantidad chats: {arrBusRes.length}
            </h3>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarFidelity;
