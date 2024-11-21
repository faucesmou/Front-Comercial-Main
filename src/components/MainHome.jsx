import React from "react";
import "../styles/normalize.css";
import "../styles/landing.css";

const MainHome = () => {
  const handleClick = (e) => {
    e.preventDefault();
    window.open("https://wa.link/u7xa8r", "_blank");
  };
  return (
    <main className="main">
      <div className="main__contenedor">
        <div className="main__contenido">
          <h1 className="main__heading">
            <i>
              Conectamos tu empresa con el éxito. Descubre cómo podemos llevar
              tu marca más allá de tus expectativas
            </i>
          </h1>
          <button className="boton" onClick={handleClick}>
            <img
              src="../../support.svg"
              alt="logo pixi"
              className="boton__icono"
            />
          </button>
        </div>
      </div>
    </main>
  );
};

export default MainHome;
