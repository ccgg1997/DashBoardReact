import { useState } from "react";
import logo from "./imagenesLogin/logo";
import axios from "axios";
import "./Login.css";
import ReactModal from "react-modal";
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../features/auth/auth';
ReactModal.setAppElement(document.getElementById("root"));

export function Login(props) {
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const dispatch = useDispatch();

  //hacer Login
  const handlelogin = async (e) => {
    e.preventDefault(); // Cancelar el envío del formulario

    try {
      setIsLoading(true);
      // Configura los datos de autenticación (cedula y contraseña)
      const data = { id: cedula, password: password };
      // Realiza la petición POST a la API enviando los datos en el cuerpo
      const response = await axios.post(
        "http://localhost:5000/api/users/signin",
        data
      );
      const token = response.data;

      // Maneja la respuesta de la API con los datos del usuario
      console.log(token);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Espera 1 segundo antes de cambiar a false
      dispatch(setAuthData({ token, usuario:cedula }));
    } catch (error) {
      setShowErrorModal(true);
      // Cierra el modal después de 2 segundos
      setTimeout(() => {
        setShowErrorModal(false);
      }, 1000);
      // Maneja el error de la petición
      console.log(error.response.data);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="auth-form-container">
        <div className="logo-container">
          <img
            className="image"
            src={logo}
            alt="Logo"
            style={{ width: "180px", height: "auto" }}
          />
        </div>
        <form className="formLogin" onSubmit={handlelogin}>
          <div className="input-container">
            <label className="label">Usuario:</label>
            <input
              className="input"
              value={cedula}
              type="text"
              onChange={(e) => setCedula(e.target.value)}
              placeholder="1144***1"
              autoComplete="current-password"
            ></input>
            <label className="label">Contraseña:</label>
            <input
              className="input"
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
              autoComplete="current-password"
            ></input>
          </div>
          <button className="btn-login">
            {isLoading ? "Cargando..." : "Log in"}
          </button>
        </form>
        <ReactModal
          className="error-modal"
          isOpen={showErrorModal}
          onRequestClose={() => setShowErrorModal(false)}
        >
          <h2>Credenciales inválidas</h2>
        </ReactModal>
      </div>
      <footer className="footer">
        <p>&copy; 2023 Bolsas Romy. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
