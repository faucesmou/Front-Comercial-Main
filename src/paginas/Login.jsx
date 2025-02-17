import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import { useAuth } from "../hooks/useAuth";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Spinner from "../components/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [hidden, setHidden] = useState(true)

  const { setAuth, setUsuario, setCargando, loading, setLoading, usuario } =
    useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    setLoading(true);

    try {
      const { data } = await clienteAxios.post("/auth/signin", {
        email,
        password,
      });

      // console.log(data);
      setAlerta({});
      localStorage.setItem("token", data.token);

      setAuth(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }

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

    try {
      const { data } = await clienteAxios("/auth/perfil", config);

      // console.log(data);
      setCargando(false);
      setUsuario(data);
      setLoading(false);
      if (data.roles[0].name === "admin") {
        navigate("/chats");
      } else if (data.roles[0].name === "user") {
        navigate("/residual");
      } else if (data.roles[0].name === "moderator") {
        navigate("/ventas");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { msg } = alerta;

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {msg && <Alerta alerta={alerta} />}

      <form
        action=""
        className="w-full bg-zinc-400 shadow-lg rounded-lg p-10 border-4  border-gray-300"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-sky-600 text-center mt-3 font-bold text-3xl capitalize">
            Comercial <span className="text-slate-700 ml-1">Finca Propia</span>
          </h2>
        </div>
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase  block text-sm font-semibold text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-white block text-sm font-semibold"
          >
            Password
          </label>
          <input
            type={hidden ? 'password' : 'text'}
            id="password"
            placeholder="Password de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="relative right-[-400px] bottom-10">
            <button type="button" onClick={() => setHidden(!hidden)}>
             {hidden ? '🙈' : '🙉'} 
            </button>
            


          </div>
        </div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 focus:outline-none"
              aria-hidden="true"
            />
          </span>
          Iniciar Sesión
        </button>
      </form>
    </>
  );
};

export default Login;
