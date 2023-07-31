import React, { useState, useEffect } from "react";
import "./FMB.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Notificacion from "../../../../../../../../Basicos/Notificacion/Notificacion";
import { v4 as uuidv4 } from 'uuid';
import { setInventario } from "../../../../../../../../../features/inventario/inventario";
import {
  movInventario,
  infoInventario,
  movEntreBodegas,
} from "../../../../../../../../Api/apiAddress";

const FormMovBod = () => {
  //estados del componente
  const [productSelected, setProductSelected] = useState("");
  const [bodegaSelected, setBodegaSelected] = useState("");
  const [inventoryData, setInventoryData] = useState([]);
  const [inventoryDataModified, setInventoryDataModified] = useState([]);
  const [tipo, setTipo] = useState("");
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const [tipoNotificacion, setTipoNotificacion] = useState("");
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");

  //datos del estado global
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { inventario } = useSelector((state) => state.inventario);

  // Filtrado de datos y creación del arreglo de estilos con cantidad mayor a 0
  const uniqueProduct = [
    ...new Set(inventario.map((inven) => inven.productoId)),
  ];
  const ProductSelectedFilter = inventario.filter(
    (inventario) => inventario.productoId === productSelected
  );
  const uniqueBodega = [
    ...new Set(ProductSelectedFilter.map((inven) => inven.bodegaId)),
  ];

  //Funciones para seleccionar inventario en base al producto y bodega
  useEffect(() => {
    const inventoryDataSelected = ProductSelectedFilter.filter((inventario) => {
      return (
        inventario.bodegaId === bodegaSelected &&
        inventario.productoId === productSelected
      );
    }).map(({ familiaNombre, estilos, tipo }) => ({
      familiaNombre,
      estilos,
      tipo,
    }));
    setInventoryData(inventoryDataSelected);
    const inventoryDataModified = inventoryDataSelected.map(({ estilos }) => {
      const modifiedEstilos = estilos.map((estilo) => ({
        ...estilo,
        cantidad: 0,
        key: uuidv4(), // Agregamos una key única
      }));
      return { estilos: modifiedEstilos };
    });

    setInventoryDataModified(inventoryDataModified);
  }, [bodegaSelected, productSelected]);

  const FunctionbodegaSelected = (event) => {
    const selectedBodega = event.target.value;
    setBodegaSelected(selectedBodega);

    const inventoryDataSelected = ProductSelectedFilter.filter(
      (inventario) =>
        inventario.bodegaId === selectedBodega &&
        inventario.productoId === productSelected
    ).map(({ familiaNombre, estilos, tipo }) => ({
      familiaNombre,
      estilos: estilos.map((estilo) => ({
        ...estilo,
        cantidad: 0,
        key: uuidv4(), // Agregamos una key única
      })),
      tipo,
    }));
    setInventoryData(inventoryDataSelected);
    setInventoryDataModified(inventoryDataSelected);
    setTipo("0");
  };

  const handleChangeCantidad = (index, subIndex, cantidad) => {
    const diferencia=inventoryData[index].estilos[subIndex].cantidad
    if(cantidad>diferencia){
      setMensaje("La cantidad no puede ser mayor a la cantidad de la produccion", "error");
      return true;
    }
    const updatedEstilos = [...inventoryDataModified];
    updatedEstilos[index].estilos[subIndex].cantidad = cantidad;
    setInventoryDataModified(updatedEstilos);
  };

  //Funcion para crear el movimiento de inventario
  const createMovInventario = async () => {
    try {
      //detectar si esta vacia la data y si los estilos estan en 0
      if (
        tipo === "" ||
        bodegaSelected === "" ||
        productSelected === "" ||
        inventoryDataModified.length === 0
      ) {
        setMensaje(
          "Faltan datos por llenar (producto, bodega o tipo)",
          "error"
        );
        return;
      }
      //detectar si la bodega 2 es igual a la 1
      if (
        bodegaSelected === tipo
      ) {
        setMensaje(
          "No puedes mover un producto a la misma bodega",
          "error"
        );
        return;
      }

      //transformar objeto de inventario modificado
      const objetoInvModificado = inventoryDataModified[0].estilos;
      const totalAcumulado = objetoInvModificado.reduce(
        (acumulado, elemento) => {
          return acumulado + parseInt(elemento.cantidad, 10);
        },
        0
      );

      //verificar si la cantidad de estilos es  0
      if (totalAcumulado === 0) {
        setMensaje(
          "No se puede crear un movimiento con todos los valores en 0",
          "error"
        );
        return;
      }
      //si al menos un stilo es diferente de cero,  se filtran los estilos con cantidad mayor a 0

      const estilosConCantidadMayorA0 = objetoInvModificado
        .filter((elemento) => elemento.cantidad > 0)
        .map(({ nombre, cantidad }) => ({ nombre, cantidad }));

      //crear objeto tipo movimiento de inventario

      const familiaP = inventario.find(
        (inventario) => inventario.productoId === productSelected
      ).familiaNombre;
      const inventarioActualizado = {
        bodegaIdFuturo: tipo,
        bodegaIdActual: bodegaSelected,
        productoId: productSelected,
        estilos: estilosConCantidadMayorA0,
        familia: familiaP,
      };
      //se hace la consulta a la api
      await updateInventarioApi(inventarioActualizado);
      
      if (updateInventarioApi) {
        limpiar();
        return setMensaje("Movimiento de inventario creado", "success");
      } else {
        setMensaje("Error al crear movimiento desde la api", "error");
      }
    } catch (error) {
      setMensaje("Error al crear movimiento", "error");
      console.log(error);
    }
  };

  //Funcion para hacer peticion a la API actualizar el inventario, actualiza nuevo estado global
  const updateInventarioApi = async (inventarioActualizado) => {
    //se hace la consulta a la api para modificar el inventario
    await movEntreBodegas(inventarioActualizado, token);

    //se hace la consulta a la api para actualizar el inventario
    const responseInventario = await infoInventario(token);

    //setiar varianle global del inventario
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
  const limpiar = () => {
    setBodegaSelected("");
    setProductSelected("");
    setTipo("");
    setInventoryData([]);
    setInventoryDataModified([]);
    setMensajeNotificacion("");
    setTipoNotificacion("");
    return true;
  };

  return (
    <div className="FormMovBod">
      <div className="SelectContainerEditInventory">
        <div className="InputGroup">
          <label>Producto:</label>
          <select
            onChange={(event) => {
              setProductSelected(event.target.value);
              setBodegaSelected("");
              setTipo("");
            }}
            value={productSelected}
          >
            <option value={""}>Selecciona un valor</option>
            {uniqueProduct.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
        <div className="InputGroup">
          <label> Bodega:</label>
          <select onChange={FunctionbodegaSelected} value={bodegaSelected}>
            <option value="">Selecciona un valor</option>
            {uniqueBodega.map((bodega, index) => (
              <option key={index} value={bodega}>
                {bodega}
              </option>
            ))}
          </select>
        </div>
        <div className="InputGroup">
          <label> Bodega2:</label>
          <select
            onChange={(event) => {
              setTipo(event.target.value);
            }}
            value={tipo}
          >
            <option value="">Selecciona un valor</option>
            {uniqueBodega.map((bodega, index) => (
              <option key={index} value={bodega}>
                {bodega}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => {
            createMovInventario();
          }}
        >
          Modificar
        </button>
      </div>
      <div className="ColumnContainer">
        <div className="dataRead">
          <div className="InventoryData">
            <h3>Inventario Actual</h3>
            {inventoryData.map((item, index) => (
              <div key={index}>
                {item.estilos.map((estilo, subIndex) => (
                  <div key={`${index}-${subIndex}`}>
                    <label>{estilo.nombre}</label>
                    <input type="number" value={estilo.cantidad} readOnly />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="InventoryModificationData">
          <div className="InventoryDataM">
            <h3>Cantid. Modificar</h3>
            {inventoryDataModified.map((item, index) => (
              <div key={index}>
                {/* <h3>{item.familiaNombre}</h3> */}
                {item.estilos.map((estilo, subIndex) => (
                  <div key={`${"index"}-${subIndex}`}>
                    <label>{estilo.nombre}</label>
                    <input
                      type="number"
                      value={estilo.cantidad}
                      onChange={(e) =>
                        handleChangeCantidad(index, subIndex, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Notificacion
        mensaje={mensajeNotificacion}
        tipoNotificacion={tipoNotificacion}
        mostrarNotificacion={mostrarNotificacion}
      />
    </div>
  );
};

export default FormMovBod;
