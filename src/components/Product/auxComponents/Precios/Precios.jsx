import React from "react";
import "./Precios.css";
import { useState,useEffect } from "react";
import TableFilter from "../../../Basicos/TableFilter/TableFilter";
import { useSelector } from "react-redux";
import { infoPreciosClienteEspecial } from "../../../Api/apiAddress";
import { FormPrecioEspecial } from "./FormPrecioEspecial/FormPrecioEspecial";
import Notificacion from "../../../Basicos/Notificacion/Notificacion";

export const Precios = () => {

  //estados del componente
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const [tipoNotificacion, setTipoNotificacion] = useState("");
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");

  //variables iniciales (clientes, precios, token)
  const cliente = useSelector((state) => state.clientes);
  const clientes = cliente.cliente;
  const { precio } = useSelector((state) => state.precios);
  const { token } = useSelector((state) => state.auth);
  const [selectedItem, setSelectedItem] = useState("");
  const [preciosEspecial, setPreciosEspecial] = useState([]);
  const [cargando, setCargando] = useState(false); //para el spinner
  const [nombreClienteEspecial, setNombreClienteEspecial] = useState("");

  //acciones de select
  const handleItemChange = async (e) => {
    setSelectedItem(e.target.value);
  };

  const handleSearchClick = async (e) => {
    if(selectedItem === "") return setMensaje("Selecciona un cliente", "error");
    e.preventDefault();
    setCargando(true);
    const preciosEspecial = await infoPreciosClienteEspecial(
      selectedItem,
      token
    );
    setPreciosEspecial(preciosEspecial);
    const nombreCliente = await clientes.find(
      (cliente) => cliente.id.toString() === selectedItem.toString()
    );
    setNombreClienteEspecial(nombreCliente.negocio);
    setCargando(false);
  };

  //valores de la tabla
  const uniqueIds = [...new Set(clientes.map((cliente) => cliente.id))];
  const columnas = Object.keys(precio[0]).map((key) => {
    return {
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      width: key === "id" ? 10 : 130,
      type: typeof precio[0][key] === "number" ? "number" : undefined,
    };
  });

  //funciones para controlar el comportamiento de la notificacion
  useEffect(() => {
    if (mostrarNotificacion) {
      setMostrarNotificacion(false);
    }
  }, [mostrarNotificacion]);

  const setMensaje = (mensaje, tipo) => {
    setMensajeNotificacion(mensaje);
    setTipoNotificacion(tipo);
    setMostrarNotificacion(true);
    return true;
  };

  return (
    <>
      <div className="Precios">
        <div className="containerFormPrecioEspecial">
              <FormPrecioEspecial />
          <div className="opcion-Boton">
            <select value={selectedItem} onChange={handleItemChange}>
              <option value="">Selecciona un elemento</option>
              {uniqueIds.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <button className="button" onClick={handleSearchClick}>
              {cargando ? "Cargando..." : "Buscar lista de precio especial"}
            </button>
          </div>
        </div>

        <div className="precioContainer">
          <div className="containerTablefilter">
            <TableFilter
              nombre={"PRECIOS REGULARES"}
              nombreColumnas={columnas}
              datosFilas={precio}
            />
          </div>
          {selectedItem && (
            <div className="precioEspecialContenedo">
              <TableFilter
                nombre={"PRECIOS ESPECIAL DE " + nombreClienteEspecial}
                nombreColumnas={columnas}
                datosFilas={preciosEspecial}
              />
            </div>
          )}
        </div>
        <Notificacion
        mensaje={mensajeNotificacion}
        tipoNotificacion={tipoNotificacion}
        mostrarNotificacion={mostrarNotificacion}
      />
      </div>
    </>
  );
};

export default Precios;
