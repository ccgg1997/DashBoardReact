import { useState } from "react";
import logo from "./imagenesLogin/logo";
import "./Login.css";
import ReactModal from "react-modal";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../features/auth/auth";
import { setInventario } from "../../features/inventario/inventario";
import { signin, infoInventario, createCookie } from "../Api/apiAddress";
ReactModal.setAppElement(document.getElementById("root"));

export function Login(props) {
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const dispatch = useDispatch();

  const handlelogin = async (e) => {
    e.preventDefault(); // Cancelar el envío del formulario
    try {
      //definicion de variables
      setIsLoading(true);

      // Llama a la función signin de la API
      const responseSignin = await signin(cedula, password);
      const token = responseSignin.token;
      if (!token || token === "" || token === undefined) {
        setIsLoading(false);
        throw new Error("Credenciales inválidas");
      }

      //conexion a la api para inventario
      const responseInventario = await infoInventario(token);

      //setiar la variable global del token e inventario
      dispatch(
        setAuthData({
          token,
          usuario: cedula,
          name: responseSignin.name,
          rol: responseSignin.roles,
          timeExp: responseSignin.time_Exp,
        })
      );
      dispatch(setInventario(responseInventario));

      // Crea la cookie
      createCookie(
        "myCookie",
        JSON.stringify({
          token,
          usuario: cedula,
          name: responseSignin.name,
          rol: responseSignin.roles,
          timeExp: responseSignin.time_Exp,
        })
      );
    } catch (error) {
      setWrongCredentials(true);
      setIsLoading(false);
      // Maneja el error de la petición
      console.log(error);
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
              className={`input ${wrongCredentials ? "input-wrong" : ""}`}
              value={cedula}
              type="text"
              onChange={(e) => setCedula(e.target.value)}
              placeholder="1144***1"
              autoComplete="current-password"
            ></input>
            <label className="label">Contraseña:</label>
            <input
              className={`input ${wrongCredentials ? "input-wrong" : ""}`}
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
              autoComplete="current-password"
            ></input>
            {wrongCredentials && (
              <span className="error-message">{"Credenciales no validas"}</span>
            )}
          </div>
          <button className="btn-login">
            {isLoading ? "Cargando..." : "Log in"}
          </button>
        </form>
      </div>
      <footer className="footer">
        <p>&copy; 2023 Bolsas Romy. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
