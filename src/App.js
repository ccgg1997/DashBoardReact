import "./App.css";
import MainDash from "./components/MainDash/MainDash";
import Sidebar from "./components/Sidebar/Sidebar";
import { Login } from "./components/Login/Login";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./components/Product/Product";
import Clientes from "./components/Clientes/Clientes";
import Factura from "./components/Factura/Factura";
import Analytics from "./components/Analytics/Analytics";
import Calendario from "./components/Calendar/Calendar";
import { useEffect } from "react";
import { clearAuthData } from "./features/auth/auth";
import { useDispatch } from "react-redux";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const {timeExp} = useSelector((state) => state.auth);
  const { rol } = useSelector((state) => state.auth);
  const isAdmin = rol === "admin";
  const isAuthorized = isAuthenticated;
  const timeExpDate = new Date(timeExp).getTime();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const currentTime = new Date().getTime();
      if (currentTime > timeExpDate) {
        dispatch(clearAuthData());
      }
    };

    //verificamos el token de expiración cada 30 minutos
    const tokenExpirationTimer = setInterval(checkTokenExpiration, 3600000);

    return () => {
      clearInterval(tokenExpirationTimer);
    };

  } , [timeExp,isAuthenticated,timeExpDate]);

  return (
    <div className="App" >
      {!isAuthorized && <Login />}
      {isAuthorized && (
        <div className="AppGlass" >
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/" element={<MainDash />} />
              <Route path="/Product" element={<Product />} />
              <Route path="/Clientes" element={<Clientes />} />
              <Route path="/Factura" element={<Factura />} />
              {isAdmin && <Route path="/Analytics" element={<Analytics />} />}
              <Route path="/Calendario" element={<Calendario />} />
              {/* Agrega más rutas para tus nuevas pestañas aquí */}
            </Routes>

          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
