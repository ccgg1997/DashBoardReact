import { useState } from "react";
import logo from "./imagenesLogin/logo.jpg";
import "./Login.css";
import ReactModal from "react-modal";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../features/auth/auth";
import { setInventario } from "../../features/inventario/inventario";
import { setCliente } from "../../features/clientes/clientes";
import { setPrecio } from "../../features/precios/precios";
import { setProduccion } from "../../features/ordenesproduccion/ordenesproduccion";
import{setFamilia} from "../../features/familias/familia";
import { setBodega } from "../../features/bodega/bodega";
import{setProducto} from "../../features/productos/producto";
import{setPersona} from "../../features/persona/persona";
import{setFacturasHoy} from "../../features/facturasHoy/facturasHoy";
import { setInfoVentas } from "../../features/analytics/analytics";

import { signin, infoInventario, createCookie,infoClientes, infoPrecios,infoFamilia, infoProduccion,infoBodegas,infoProductos, infoPersonas,searchFacturaByDate,searchFacturaByLast3Months } from "../Api/apiAddress";
ReactModal.setAppElement(document.getElementById("root"));

export function Login(props) {
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const dispatch = useDispatch();
  const [fechaHoy, fechaManana] = fecharHoyMañana();
  const data = {
    fechainicio: fechaHoy,
    fechafin: fechaManana,
  }

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

      //conexion a la api para inventario, clientes
      const responseInventario = await infoInventario(token);
      const responseClientes = await infoClientes(token);
      const responsePrecios = await infoPrecios(token);
      const responseFamilia = await infoFamilia(token);
      const responseProduccion = await infoProduccion(token);
      const responseBodegas = await infoBodegas(token);
      const responseProductos = await infoProductos(token);
      const responsePersonas = await infoPersonas(token);
      const responseFacturasHoy = await searchFacturaByDate(data,token);
      const responseInfoVentas = await searchFacturaByLast3Months(token);
      

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

      //setiar la variable global del inventario
      dispatch(setInventario(responseInventario));
      dispatch(setCliente(responseClientes));
      dispatch(setPrecio(responsePrecios));
      dispatch(setFamilia(responseFamilia));
      dispatch(setProduccion(responseProduccion));
      dispatch(setBodega(responseBodegas));
      dispatch(setProducto(responseProductos));
      dispatch(setPersona(responsePersonas));
      dispatch(setFacturasHoy(responseFacturasHoy));
      dispatch(setInfoVentas(responseInfoVentas));

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

function fecharHoyMañana() {
  const hoy = new Date();
  const manana = new Date(hoy);
  manana.setDate(hoy.getDate() + 1);

  const formatoFecha = fecha => {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fechaHoyFormateada = formatoFecha(hoy);
  const fechaMananaFormateada = formatoFecha(manana);

  return [fechaHoyFormateada, fechaMananaFormateada];
}

