import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [modalCrearUsuario, setModalCrearUsuario] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [usuario, setUsuario] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [modalEliminar, setModalEliminar] = useState(false);

  useEffect(() => {
    const autenticarUsuario = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setCargando(false);
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios("/auth/perfil", config);
        setUsuario(data);
        setAuth({ token });
        // listaUsuarios();
        setCargando(false);
      } catch (error) {
        console.log(error.response);
        setAuth({});
      }
    };
    autenticarUsuario();
  }, []);

  useEffect(() => {
    const ejecucion = async () => {
      await listaUsuarios();
    };

    ejecucion();
  }, [auth]);

  const cerrarSesion = () => {
    setAuth({});
    setUsuario({});
    setUsuarios([]);
    localStorage.removeItem("token");
  };

  const listaUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/auth/usuarios", config);
      setUsuarios(data);
    } catch (error) {
      console.log(error);
    }
  };

  const usuarioXID = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/auth/usuario", { id }, config);
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (username, email, password, roles) => {
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
        "/auth/signup",
        { username, email, password, roles },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const actualizar = async (username, email, password, roles, id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/auth/actualizar/${id}`,
        { username, email, password, roles },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(
        `/auth/eliminar/${id}`,
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalCrearUsuario = () => {
    setModalCrearUsuario(!modalCrearUsuario);
  };

  const handleModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        setCargando,
        setUsuario,
        usuario,
        cerrarSesion,
        listaUsuarios,
        handleModalCrearUsuario,
        modalCrearUsuario,
        alerta,
        setAlerta,
        usuarios,
        usuarioXID,
        signUp,
        actualizar,
        eliminar,
        handleModalEliminar,
        modalEliminar,
        setLoading,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
