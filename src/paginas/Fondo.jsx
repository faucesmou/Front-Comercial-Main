import React from "react";

const Fondo = () => {
  return (
    <div className="items-center bg-white h-full flex justify-center">
      {/* <h1>Fondo con imagen de Andes</h1> */}
      <img
        src="../andes.jpg"
        alt="imagen andes"
        className="rounded-full w-25 h-25"
      />
    </div>
  );
};

export default Fondo;
