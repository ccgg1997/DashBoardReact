import "./App.css";
import MainDash from "./components/MainDash/MainDash";
import Sidebar from "./components/Sidebar/Sidebar";
import { Login } from "./components/Login/Login";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./components/Product/Product";
import Clientes from "./components/Clientes/Clientes";


function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const isAuthorized = isAuthenticated;
  //const isAuthorized = true;

  
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

              {/* Agrega más rutas para tus nuevas pestañas aquí */}
            </Routes>
            
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
