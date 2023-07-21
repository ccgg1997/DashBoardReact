import React, { useState, useEffect } from "react";
import "./FormEditInventory.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const FormEditInventory = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { inventario } = useSelector((state) => state.inventario);
  const uniqueProduct = [
    ...new Set(inventario.map((inven) => inven.productoId)),
  ];

  //Producto y bodega seleccionados para hacer el cambio en la base de datos
  //inventoryData es el inventario de la bodega seleccionada que esta en readonly y inventoryDataModified es el inventario modificado para actualizar
  const [productSelected, setProductSelected] = useState("");
  const [bodegaSelected, setBodegaSelected] = useState("");
  const [inventoryData, setInventoryData] = useState([]);
  const [inventoryDataModified, setInventoryDataModified] = useState([]);
  const [tipo, setTipo] = useState("");

  //Filtrando el inventario por producto y bodega seleccionados
  const ProductSelectedFilter = inventario.filter(
    (inventario) => inventario.productoId === productSelected
  );
  const uniqueBodega = [
    ...new Set(ProductSelectedFilter.map((inven) => inven.bodegaId)),
  ];

  //Funciones para seleccionar producto y bodega
  const FunctionproductSelected = (event) => {
    const selectedProduct = event.target.value;
    setProductSelected(selectedProduct);
  };
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
        key: estilo.nombre + estilo.codigo, // Agregamos una key única
      })),
      tipo,
    }));

    setInventoryData(inventoryDataSelected);
    setInventoryDataModified(inventoryDataSelected);
  };

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
        key: estilo.nombre + estilo.codigo, // Agregamos una key única
      }));
      return { estilos: modifiedEstilos };
    });
    setInventoryDataModified(inventoryDataModified);
  }, [bodegaSelected, productSelected]);

  const handleChangeCantidad = (index, subIndex, cantidad) => {
    const updatedEstilos = [...inventoryDataModified];
    updatedEstilos[index].estilos[subIndex].cantidad = cantidad;
    setInventoryDataModified(updatedEstilos);
  };

  return (
    <div className="FormEditInventory">
      <div className="SelectContainerEditInventory">
        <div className="InputGroup">
          <label>Producto:</label>
          <select onChange={FunctionproductSelected}>
            <option value="">Selecciona un valor</option>
            {uniqueProduct.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
        <div className="InputGroup">
          <label> Bodega:</label>
          <select onChange={FunctionbodegaSelected}>
            <option value="">Selecciona un valor</option>
            {uniqueBodega.map((bodega, index) => (
              <option key={index} value={bodega}>
                {bodega}
              </option>
            ))}
          </select>
        </div>
        <div className="InputGroup">
          <label> Tipo:</label>
          <select onChange={FunctionbodegaSelected}>
            <option value="">Selecciona un valor</option>
            <option value="ENTRADA">ENTRADA</option>
            <option value="SALIDA">SALIDA</option>
          </select>
        </div>
        <button>Modificar</button>
      </div>
      <div className="ColumnContainer">
        <div className="dataRead">
          <div className="InventoryData">
            <h3>Inventario Actual</h3>
            {inventoryData.map((item, index) => (
              <div key={index}>
                {item.estilos.map((estilo, subIndex) => (
                  <div key={estilo.key}>
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
              <div key={`${index}${item}`}>
                <h3>{item.familiaNombre}</h3>
                {item.estilos.map((estilo, subIndex) => (
                  <div key={estilo.key}>
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
    </div>
  );
};

export default FormEditInventory;
