import React, { useState, useEffect } from "react";
import "./FacturaInfoCliente.css";
import { useSelector } from "react-redux";
import { infoPreciosClienteEspecial } from "../../../Api/apiAddress";
import BasicTable from "../FacturaTable/FacturaTable";
import { useCallback } from "react";

const FacturaInfo = () => {
  // State variables
  const [producto, setProductos] = useState([]);
  const [preciosEspeciales, setPreciosEspeciales] = useState([]);
  const [total, setTotal] = useState(0);

  // Redux state
  const clientes = useSelector((state) => state.clientes);
  const token = useSelector((state) => state.auth.token);
  const { cliente } = clientes;

  const [isOpen, setIsOpen] = useState(false);

  // Date formatting
  const fechaActual = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate the total price
  const updateTotal = useCallback(() => {
    let total = 0;
    producto.forEach((item) => {
      total += item.precio * item.cantidad;
    });
    setTotal(total);
  }, [producto]);

  // Function to handle product changes
  const handleProductosChange = useCallback(
    (newProductos) => {
      setProductos(newProductos);
      // Dado que `setProductos` es asíncrono, podemos llamar a `updateTotal` en un callback
      // para asegurarnos de que use el estado actualizado.
    },
    []
  );

  // Unique business names for dropdown
  const uniqueNames = [...new Set(cliente.map((item) => item.negocio))];
  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch prices for selected client
  const fetchPreciosEspeciales = async (selectedCliente, token) => {
    try {
      const preciosEspecialesData = await infoPreciosClienteEspecial(
        selectedCliente,
        token
      );
      setPreciosEspeciales(preciosEspecialesData);
    } catch (error) {
      console.error("Error al obtener los precios especiales:", error);
    }
  };

  const handleCliente = async (e) => {
    const selec = e.target.value;
    console.log("selec", selec);
    if (selec === "Selecciona un cliente") {
      setSelectedCliente(selec);
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
    setSelectedCliente(selec);
    // Find the selected client object
    const selectedCliente = cliente.find((item) => item.negocio === selec);
    setSelectedItem(selectedCliente);
    console.log("selectedCliente", selectedCliente);
    
    // Fetch prices for the selected client
    fetchPreciosEspeciales(selectedCliente.id, token);
    setPreciosEspeciales(preciosEspeciales);
  };


  return (
    <div
      className="FacturaInfo"
      style={{ overflowY: "scroll", maxHeight: "450px" }}
    >
      {/* Title */}
      <div className="FacturaInfo__title">
        <h1>Bolsas Romy</h1>
      </div>
      {/* Information */}
      <div className="FacturaInfo__info">
        <div className="FacturaInfo__info__fecha">
          <p>{fechaActual}</p>
        </div>
        <div className="FacturaInfo__info__cliente">
          <p>
            Cliente:{" "}
            <select
              value={selectedCliente}
              onChange={handleCliente}
            >
              <option>Selecciona un cliente</option>
              {uniqueNames.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </p>
        </div>
        {/* Selected client details */}
        {selectedItem && (
          <>
            <div className="FacturaInfo__info__duenio">
              <p>Dueño: {selectedItem.duenio}</p>
            </div>
            <div className="FacturaInfo__info__direccion">
              <p>Dirección: {selectedItem.direccion}</p>
            </div>
            <div className="FacturaInfo__info__telefono">
              <p>Teléfono: {selectedItem.telefono}</p>
            </div>
            <div className="FacturaInfo__info__barrio">
              <p>Barrio: {selectedItem.barrio}</p>
            </div>
          </>
        )}
        <div className="FacturaInfo__info__total">
          {/* Total price */}
          <p>Total: ${total}</p>
        </div>
      </div>
      {/* Product table */}
      <div className="FacturaInfo__table">
        {isOpen &&
          <BasicTable onProductosChange={handleProductosChange} preciosEspeciales={preciosEspeciales} isSelected={selectedCliente} />
        }
      </div>
    </div>
  );
};

export default FacturaInfo;
