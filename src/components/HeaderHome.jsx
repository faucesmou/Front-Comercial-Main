import React from "react";
import "../styles/normalize.css";
import "../styles/landing.css";
import { Link } from "react-router-dom";

const HeaderHome = () => {
  return (
    <header className="header">
      <div className="header__contenedor">
        <div className="header__barra">
          <div className="header__logo">
            <img src="../../glass.png" alt="logo finca" />
          </div>
          <nav className="navegacion">
            <Link to={"/"} className="navegacion__link">
              Iniciar Sesion
            </Link>
            {/* <a href="#" className="navegacion__link">
              Home
            </a>
            <a href="#" className="navegacion__link">
              Quiénes Somos
            </a>
            <a href="#" className="navegacion__link">
              Servicios
            </a>
            <a href="#" className="navegacion__link">
              Contacto
            </a> */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderHome;
