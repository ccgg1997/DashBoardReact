import React, { useState, useEffect } from "react";
import "./fep.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Notificacion from "../../../../../../../../Basicos/Notificacion/Notificacion";
import { setInventario } from "../../../../../../../../../features/inventario/inventario";
import {
  movInventario,
  infoInventario,
} from "../../../../../../../../Api/apiAddress";

const FormEditPro = () => {
  //mensajes
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const [tipoNotificacion, setTipoNotificacion] = useState("");
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");

  //estados del componente global
  const { token } = useSelector((state) => state.auth);
  const { produccion } = useSelector((state) => state.produccion);
  const { producto } = useSelector((state) => state.producto);
  const idsProduccion = produccion ? produccion.map((produccion) => produccion.produccionId) : [];
  const tamaniosId = ["M", "GC", "PL", "2P", "HOLOGRAMA"];
  const [productsList, setProductsList] = useState([]); //lista de productos de la produccion seleccionada
  const [inventoryDataModified, setInventoryDataModified] = useState([]);
  const [inventoryDataActualRead, setInventoryDataActualRead] = useState([]); //lista de tamanios de la produccion seleccionada

  //estados del componente
  const [produccionSelected, setProduccionSelected] = useState("0");
  const [mostrarDetalleProduccion, setMostrarDetalleProduccion] =
    useState(false);
  const [productoSelected, setProductoSelected] = useState("0");
  const [tamanioSelected, setTamanioSelected] = useState("0");
  const [nombrePersona, setNombrePersona] = useState("");

  //objeto para mandar en la api
  const produccionObject = {
    produccionId: produccionSelected,
    productoId: productoSelected,
    tamanio: tamanioSelected,
    estilos: inventoryDataModified,
  };

  //funcion para mostrar la info de la produccion
  const mostrarInfoProduccion = () => {
    if (
      productoSelected === "0" ||
      produccionSelected === "0" ||
      tamanioSelected === "0"
    ) {
      setMensaje("Seleccione una produccion, un producto y un tamaño", "error");
      return true;
    }
    setMostrarDetalleProduccion(true);
    
  };

  const handleChangeCantidad = (index, cantidad) => {
    const updatedEstilos = [...inventoryDataModified];
    updatedEstilos[index].cantidad= cantidad;
    setInventoryDataModified(updatedEstilos);
    console.log("cambio de cantidad", updatedEstilos,"");
  };

  const accionRecibirMaterial = () => {
    console.log("mostrar info produccion", produccionObject);
  };


  useEffect(() => {
    // Verificar que haya datos en 'produccion'
    if (produccion && produccion.length > 0) {
      const produccionObject = produccion.find(
        (produccion) => produccion.produccionId === produccionSelected
      );
      if (produccionObject) {
        const familiaProductoSelected = produccionObject.familiaNombre;
        const family_products = producto
          .filter((product) => product.familia_id === familiaProductoSelected)
          .map((product) => product.producto_id);
  
        const nombrePersonaaux = produccionObject.nombrePersona;
        const estilos = produccionObject.estilos;
        const estilosAux = estilos.map((estilo) => ({ ...estilo, cantidad: 0 }));
        setNombrePersona(nombrePersonaaux);
        setInventoryDataActualRead(produccionObject.estilos);
        setInventoryDataModified(estilosAux);
  
        setProductsList(family_products);
        console.log(
          "lista de productos",
          family_products,
          "familia",
          familiaProductoSelected,
          "produccion",
          produccionObject,
          "nombre persona777",
          nombrePersonaaux
        );
      }
    }
  }, [produccionSelected, produccion, producto]);
  

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
          id="Produccion Id"
          value={produccionSelected}
          onChange={(event) => {
            setMostrarDetalleProduccion(false);
            setProduccionSelected(event.target.value);
            setProductoSelected("0");
            setTamanioSelected("0");
          }}
          options={idsProduccion}
        />
        <GenericSelect
          id="Tam. Entrega "
          value={tamanioSelected}
          onChange={(event) => {
            setMostrarDetalleProduccion(false);
            setTamanioSelected(event.target.value);
            setProductoSelected("0");
          }}
          options={tamaniosId}
        />

        <GenericSelect
          id="Prod Entrega "
          value={productoSelected}
          onChange={(event) => {
            setMostrarDetalleProduccion(false);
            setProductoSelected(event.target.value);
          }}
          options={productsList}
        />
        {!mostrarDetalleProduccion && (<button className="botonCreateProd" onClick={mostrarInfoProduccion}>
          Ver Producción
        </button>)}
        {mostrarDetalleProduccion && (<button className="botonCreateProd2" onClick={accionRecibirMaterial}>
          Recibir Material
        </button>)}
        
      </div>
      <div className="ColumnContainer">
        {mostrarDetalleProduccion && (
          <div className="dataRead">
            <div className="createInventoryModificationData">
              <div className="createInventoryDataM">
                <h3> {nombrePersona} </h3>
                {inventoryDataActualRead.map((estilo, index) => (
                  <div key={index}>
                    <label>{estilo.nombre}</label>
                    <input type="number" value={estilo.cantidad} readOnly />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {mostrarDetalleProduccion && (
          <div className="InventoryModificationData">
            <div className="createInventoryModificationData">
              <div className="createInventoryDataM">
                <h3> {nombrePersona} </h3>
                {inventoryDataModified.map((estilo, index) => (
                  <div key={index}>
                    <label>{estilo.nombre}</label>
                    <input
                          type="number"
                          value={estilo.cantidad}
                          onChange={(e) =>
                            handleChangeCantidad(
                              index,
                              e.target.value
                            )
                          }
                        />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
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

export default FormEditPro;
