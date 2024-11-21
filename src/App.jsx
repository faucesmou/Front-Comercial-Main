import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./paginas/Login";
import Fondo from "./paginas/Fondo";
import Chat from "./paginas/Chat";
import Usuario from "./paginas/Usuario";
import { AuthProvider } from "./context/AuthProvider";
import { ChatsProvider } from "./context/ChatsProvider";
import { ResidualProvider } from "./context/ResidualProvider";

import RutaChats from "./layouts/RutaChats";
import RutaUsuarios from "./layouts/RutaUsuarios";
import RutaResidual from "./layouts/RutaResidual";
import RutaVentas from "./layouts/RutaVentas";
import RutaHome from "./layouts/RutaHome";
import ErrorPage from "./layouts/ErrorPage";
import RutaExcel from "./layouts/RutaExcel";
import Opciones from "./paginas/Opciones";

/* const router = createBrowserRouter([
  {
    path: "/",
    element: "",
    errorElement: "",
  },
]);
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatsProvider>
          <ResidualProvider>
            <Routes>
              <Route
                path="/"
                element={<AuthLayout />}
                errorElement={<ErrorPage />}
              >
                <Route index element={<Login />} />
              </Route>
              <Route
                path="/chats"
                element={<RutaChats />}
                errorElement={<ErrorPage />}
              >
                <Route index element={<Fondo />} />
                <Route path=":id" element={<Chat />} />
              </Route>
              <Route path="/usuarios" element={<RutaUsuarios />}>
                <Route index element={<Fondo />} />
                <Route path=":id" element={<Usuario />} />
              </Route>
              <Route path="/asesores" element={<RutaUsuarios />}>
                <Route index element={<Fondo />} />
                <Route path=":id" element={<Usuario />} />
              </Route>
              <Route path="/residual" element={<RutaResidual />}>
                <Route index element={<Fondo />} />
                <Route path=":id" element={<Chat />} />
              </Route>
              <Route path="/ventas" element={<RutaVentas />}>
                <Route index element={<Fondo />} />
                <Route path=":id" element={<Chat />} />
              </Route>
              <Route path="/cotizado" element={<RutaVentas />}>
                <Route index element={<Fondo />} />
                <Route path=":id" element={<Chat />} />
              </Route>
              <Route path="/rechazado" element={<RutaVentas />}>
                <Route index element={<Fondo />} />
                <Route path=":id" element={<Chat />} />
              </Route>
              <Route path="/temporal" element={<RutaVentas />}>
                <Route index element={<Fondo />} />
                <Route path=":id" element={<Chat />} />
              </Route>
              <Route path="/pre-venta" element={<RutaVentas />}>
                <Route index element={<Fondo />} />
                <Route path=":id" element={<Chat />} />
              </Route>
              <Route path="/cotiasesor" element={<RutaResidual />}>
                <Route index element={<Fondo />} />
                <Route path=":id" element={<Chat />} />
              </Route>
              <Route path="/verificaciones" element={<RutaVentas />}>
                <Route index element={<Fondo />} />
                <Route path=":id" element={<Chat />} />
              </Route>
              <Route path="/herramientas" element={<RutaExcel />}>
                <Route index element={<Fondo />} />
                <Route path=":path" element={<Opciones />} />
              </Route>
              <Route path="/buscador" element={<RutaResidual />}>
                <Route index element={<Fondo />} />
                <Route path=":id" element={<Chat />} />
              </Route>
              <Route path="/home" element={<RutaHome />} />
            </Routes>
          </ResidualProvider>
        </ChatsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
