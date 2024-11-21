import React, { useEffect, useState } from "react";
import { useFidelity } from "../hooks/useFidelity";
import Persona from "../components/Persona";

const Fidelity = () => {
  const { personas } = useFidelity();
  console.log(personas);
  return (
    <>
      <div className="bg-gray-200 h-full px-20  flex flex-col justify-center items-center">
        <div className="overflow-scroll scrollbar-hide w-full bg-slate-300 h-[500px] rounded-lg flex flex-col gap-2 p-10">
          {personas.map(
            (persona) =>
              `${persona.movil}`.length === 7 && (
                <Persona key={persona.idPersona} persona={persona} />
              )
          )}
        </div>
      </div>
    </>
  );
};

export default Fidelity;
