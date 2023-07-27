import React, { useState, useEffect } from "react";
import "./FCInv.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Notificacion from "../../../../../../../../Basicos/Notificacion/Notificacion";
import { setInventario } from "../../../../../../../../../features/inventario/inventario";
import {
  crearInventario,
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
  const [familiaNombre, setFamiliaNombre] = useState("");
  const [tipoProducto, setTipoProducto] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [nombreProductSelected, setNombreProductSelected] = useState("");

  //datos del estado global
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { bodega } = useSelector((state) => state.bodega);
  const { inventario } = useSelector((state) => state.inventario);
  const { producto } = useSelector((state) => state.producto);
  const { familia } = useSelector((state) => state.familia);
  const idsProducto = producto.map((producto) => producto.producto_id);
  const nombresBodega = bodega.map((bodega) => bodega.bodegaId);

  const objetCrearInventario = {
    inventarioId: bodegaSelected + "-" + productoSelected,
    bodegaId: bodegaSelected,
    productoId: productoSelected,
    nombreProducto:nombreProductSelected,
    tipo: tipoProducto,
    cantidad: cantidad,
    familiaNombre: familiaNombre,
    estilos: inventoryDataModified,
  };

  const handleChangeCantidad = (index, cantidad) => {
    const newInventoryDataModified = [...inventoryDataModified];
    newInventoryDataModified[index].cantidad = Number(cantidad);
    setInventoryDataModified(newInventoryDataModified);
    const newtotal= newInventoryDataModified.reduce((total, item) => total + item.cantidad, 0);
    setCantidad(newtotal);
  };

  //funcion para validar los datos del inventario
  const validarInventario = () => {

    //validar campos llenos
    if (bodegaSelected === "0" || productoSelected === "0") {
      setMensaje("selecciona un producto y una bodega", "error");
      return false;
    }
    //validar que el inventario no exista
    const inventarioSeleccionado = bodegaSelected + "-" + productoSelected;
    const inventarioEncontrado = inventario.find(
      (inventario) => inventario.inventarioId === inventarioSeleccionado
    );
    if (inventarioEncontrado) {
      setMensaje("El inventario ya existe", "error");
      return false;
    }

    //buscar familia y producto
    setNuevoInventario(true);
    const productoSelectedObject = producto.find(
      (producto) => producto.producto_id === productoSelected
    );
    const familia_product = productoSelectedObject.familia_id;

    //setiar los datos de familia y producto
    setFamiliaNombre(familia_product);
    setTipoProducto(productoSelectedObject.tipo);
    setNombreProductSelected(productoSelectedObject.nombre);
    const items_familia = familia.find(
      (familia) => familia.nombre === familia_product
    );

    //setiar los datos de estilos
    const estilos = items_familia.estilos;
    const estilosInventario = estilos.map((estilo) => ({
      ...estilo,
      cantidad: 0,
    }));

    //setiar los datos de inventario
    setInventoryDataModified(estilosInventario);
  };

  //funcion para crear el inventario
  const crearInventarioApi = async() => {
    console.log(objetCrearInventario);
    crearInventario(objetCrearInventario, token);
    setMensaje("Inventario creado correctamente", "success");
    setBodegaSelected("0");
    setProductoSelected("0");
    setNuevoInventario(false);
    const responseInventario = await infoInventario(token);
    dispatch(setInventario(responseInventario));
    

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
  

  return (
    <div className="FCreateInv">
      <div className="InputGroupCreateInv">
        <GenericSelect
          id="Producto"
          value={productoSelected}
          onChange={(event) => {
            setNuevoInventario(false);
            setProductoSelected(event.target.value);
          }}
          options={idsProducto}
        />
        <GenericSelect
          id="Bodega "
          value={bodegaSelected}
          onChange={(event) => {
            setNuevoInventario(false);
            setBodegaSelected(event.target.value);
          }}
          options={nombresBodega}
        />
        {!nuevoInventario && (
          <button className="botonCreateInv" onClick={validarInventario}>
            Ingresar cantidad
          </button>
        )}
        {nuevoInventario && (
          <button className="botonCreateInv" onClick={crearInventarioApi}>
            Crear Inventario
          </button>
        )}
      </div>
      {nuevoInventario && (
        <div className="InputGroupValues">
          <div className="createInventoryModificationData">
            <div className="createInventoryDataM">
              <h3>Cantid. Crear</h3>
              {inventoryDataModified.map((estilo, index) => (
                <div key={index}>
                  <label>{estilo.nombre}</label>
                  <input
                    type="number"
                    value={estilo.cantidad}
                    onChange={(e) =>
                      handleChangeCantidad(index, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
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
