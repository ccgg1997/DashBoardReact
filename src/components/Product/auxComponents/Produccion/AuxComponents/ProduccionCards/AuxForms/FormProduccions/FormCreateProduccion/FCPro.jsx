import React, { useState, useEffect } from "react";
import "./FCPro.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Notificacion from "../../../../../../../../Basicos/Notificacion/Notificacion";
import { setProduccion } from "../../../../../../../../../features/ordenesproduccion/ordenesproduccion";
import {
  crearProduccion, infoProduccion,
} from "../../../../../../../../Api/apiAddress";

const FCreatePro = () => {

  //estados del componente
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const [tipoNotificacion, setTipoNotificacion] = useState("");
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");
  const [nuevoInventario, setNuevoInventario] = useState(false);
  const [inventoryDataModified, setInventoryDataModified] = useState([]);
  const [familiaNombre, setFamiliaNombre] = useState("");
  const [personaNameSelected, setPersonaNameSelected] = useState("0");
  const [idPersona, setIdPersona] = useState("0");
  const [tipoProducto, setTipoProducto] = useState("");
  const [productoSelected, setProductoSelected] = useState("0");
  const [nombreProductSelected, setNombreProductSelected] = useState("");
  const [cantidad, setCantidad] = useState(0);

  //datos del estado global
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { persona } = useSelector((state) => state.persona);
  const { producto } = useSelector((state) => state.producto);
  const { familia } = useSelector((state) => state.familia);
  const idsProducto = producto.map((producto) => producto.producto_id);
  const nombresPersona = persona.map((persona) => persona.nombre);


  const objetCrearProduccion = {
  
    productoId: productoSelected,
    personaId:idPersona,
    nombrePersona:personaNameSelected,
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
    if (personaNameSelected === "0" || productoSelected === "0") {
      setMensaje("selecciona un producto y una persona", "error");
      return false;
    }

    //buscar familia y producto
    setNuevoInventario(true);
  

    const productoSelectedObject = producto.find(
      (producto) => producto.producto_id === productoSelected
    );
    const personaSelectedObject = persona.find(
      (persona) => persona.nombre === personaNameSelected
    );

    
  
    const familia_product = productoSelectedObject.familia_id;

    //setiar los datos de familia,persona y producto
    setIdPersona(personaSelectedObject.personaId);
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
    console.log(objetCrearProduccion);
    if(cantidad===0){
      setMensaje("No se puede crear una produccion con 0 unidades", "error");
      return false;
    }
    await crearProduccion(objetCrearProduccion, token);
    setMensaje("Inventario creado correctamente", "success");
    setPersonaNameSelected("");
    setProductoSelected("0");
    setNuevoInventario(false);
    const responseInventario = await infoProduccion(token);
    dispatch(setProduccion(responseInventario));
    

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
    <div className="FCreatePro">
      <div className="InputGroupCreateInv">
        <GenericSelect
          id="Producto"
          value={productoSelected}
          onChange={(event) => {
            setNuevoInventario(false);
            setProductoSelected(event.target.value);
            setPersonaNameSelected("0");
          }}
          options={idsProducto}
        />
        <GenericSelect
          id="Persona "
          value={personaNameSelected}
          onChange={(event) => {
            setNuevoInventario(false);
            setPersonaNameSelected(event.target.value);
          }}
          options={nombresPersona}
        />
        {!nuevoInventario && (
          <button className="botonCreateProd" onClick={validarInventario}>
            Ingresar cantidad
          </button>
        )}
        {nuevoInventario && (
          <button className="botonCreateProd" onClick={crearInventarioApi}>
            Crear Produccion
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

export default FCreatePro;
