import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { usuario } = useAuth();
  console.log(usuario);
  return (
    <header className="bg-indigo-400 border-b border-stone-300 px-4 py-5">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-center font-black text-white">
          Andes <span className="text-gray-700">Comercial</span>
        </h2>
        <input
          type="search"
          placeholder="Buscar"
          className="rounded-lg lg:w-96 block p-2 border"
        />
        <div className="flex items-center gap-4">
          <Link to="/proyectos" className="font-bold uppercase">
            Ventas
          </Link>
          <button
            type="button"
            className="uppercase bg-indigo-200 text-white p-3 rounded-md font-bold text-sm hover:bg-indigo-600 transition-colors"
          >
            Cerrar Sesion
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
