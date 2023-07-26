import React, { useState, useEffect } from "react";
import "./FCInv.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Notificacion from "../../../../../../../../Basicos/Notificacion/Notificacion";
import { setInventario } from "../../../../../../../../../features/inventario/inventario";
import {
  movInventario,
  infoInventario,
} from "../../../../../../../../Api/apiAddress";

const FCreateInv = () => {
  //estados del componente
  const [productSelected, setProductSelected] = useState("");
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const [tipoNotificacion, setTipoNotificacion] = useState("");
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");
  const [bodegaSelected, setBodegaSelected] = useState("0");
  const [productoSelected, setProductoSelected] = useState("0");
  const [nuevoInventario, setNuevoInventario] = useState(false);
  const [inventoryDataModified, setInventoryDataModified] = useState([]);

  //datos del estado global
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { bodega } = useSelector((state) => state.bodega);
  const { inventario } = useSelector((state) => state.inventario);
  const { producto } = useSelector((state) => state.producto);
  const idsProducto = producto.map((producto) => producto.producto_id);
  const nombresBodega = bodega.map((bodega) => bodega.bodegaId);


  const handleChangeCantidad = (index, subIndex, cantidad) => {
    const updatedEstilos = [...inventoryDataModified];
    updatedEstilos[index].estilos[subIndex].cantidad = cantidad;
    setInventoryDataModified(updatedEstilos);
  };
  

  //funcion para validar los datos del inventario
  const validarInventario = () => {
    const inventarioSeleccionado = bodegaSelected+"-"+productoSelected
    const inventarioEncontrado = inventario.find((inventario) => inventario.inventarioId === inventarioSeleccionado);
    if (inventarioEncontrado) {
      setMensaje("El inventario ya existe", "error");
      return false;
    }
    setNuevoInventario(true);
    console.log("encontrado:77 "+inventarioEncontrado);
    console.log("validando inventario77"+inventarioSeleccionado);

  };

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
  const limpiar = () => {
    setProductSelected("");
    setMensajeNotificacion("");
    setTipoNotificacion("");
    return true;
  };

  return (
    <div className="FCreateInv">
      <div className="InputGroupCreateInv">
        <GenericSelect
          id="Producto"
          value={productoSelected}
          onChange={(event) =>  {setNuevoInventario(false);setProductoSelected(event.target.value)}}
          options={idsProducto}
        />
        <GenericSelect
          id="Bodega"
          value={bodegaSelected}
          onChange={(event) => {setNuevoInventario(false);
            setBodegaSelected(event.target.value)}}
          options={nombresBodega}
        />
        <button onClick={validarInventario}>Ingresar cantidad</button>
      </div>
      {nuevoInventario && <div className="InputGroupValues">

      </div>}
      <Notificacion
        mensaje={mensajeNotificacion}
        tipoNotificacion={tipoNotificacion}
        mostrarNotificacion={mostrarNotificacion}
      />
    </div>
  );
};

const GenericSelect = ({ id, value, onChange, options }) => {
  return (
    <>
      <div className="contenedorSelect">
        <label>{id + ": "}</label>
        <select id={id} value={value} onChange={onChange}>
          <option value="0">Seleccione una opción</option>
          {options.map((nombre, index) => (
            <option key={index} value={nombre}>
              {nombre}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default FCreateInv;
