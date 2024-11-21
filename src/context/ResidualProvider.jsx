import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { useChats } from "../hooks/useChats";

const ResidualContext = createContext();

const ResidualProvider = ({ children }) => {
  const [residuales, setResiduales] = useState([]);
  const [modalResidual, setModalResidual] = useState(false);

  const { chats, setChats } = useChats();

  const insertarResidual = async (numero) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/residual/crear-residual",
        { numero },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const listaResiduales = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/residual/lista-residuales", config);
      setResiduales(data);
    } catch (error) {
      console.log(error);
    }
  };
  const setPersona = async (numero, condicion) => {
    try {
      const tokeno = localStorage.getItem("token");
      if (!tokeno) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokeno}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/residual/crear-residual",
        { numero, condicion },
        config
      );
      setChats(chats.filter((chat) => chat.telefono !== numero));
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalResidual = () => {
    setModalResidual(!modalResidual);
  };

  return (
    <ResidualContext.Provider
      value={{
        insertarResidual,
        residuales,
        setPersona,
        handleModalResidual,
        modalResidual,
      }}
    >
      {children}
    </ResidualContext.Provider>
  );
};

export { ResidualProvider };

export default ResidualContext;
