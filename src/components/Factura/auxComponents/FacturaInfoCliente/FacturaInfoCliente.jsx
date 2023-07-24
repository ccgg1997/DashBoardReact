import React from "react";
import "./FacturaInfoCliente.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import BasicTable from "../FacturaTable/FacturaTable";
import { infoPreciosClienteEspecial } from "../../../Api/apiAddress";
const FacturaInfo = () => {
  const clientes = useSelector((state) => state.clientes);
  const token = useSelector((state) => state.auth.token);

  const { cliente } = clientes;

  const uniqueNames = [...new Set(cliente.map((item) => item.negocio))];
  const [selected, setSelected] = useState("");

  const [selectedItem, setSelectedItem] = useState("");

    // Estado para almacenar la lista de productos
    const [producto, setProductos] = useState([]);
    const [preciosEspeciales, setPreciosEspeciales] = useState([]); 

    // Función para actualizar el estado de productos
    const handleProductosChange = (newProductos) => {
      setProductos(newProductos);
    };

  const fechaActual = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

    useEffect(() => {
    if (selected === "") {
      return;
    }
    // Busca el objeto cliente correspondiente al valor seleccionado
    const selectedCliente = cliente.find((item) => item.negocio === selected);
    // Asigna el objeto cliente seleccionado a selectedItem
    setSelectedItem(selectedCliente);

    // Busca los precios especiales del cliente seleccionado
    const fetchPreciosEspeciales = async () => {
      try {
        const preciosEspecialesData = await infoPreciosClienteEspecial(selectedCliente.id, token);
        setPreciosEspeciales(preciosEspecialesData);
      } catch (error) {
        console.error("Error al obtener los precios especiales:", error);
      }
    };
    console.log(preciosEspeciales);

    fetchPreciosEspeciales();
  }, [selected, cliente, token]);


  return (
    <div
      className="FacturaInfo"
      style={{ overflowY: "scroll", maxHeight: "450px" }}
    >
      <div className="FacturaInfo__title">
        <h1>Bolsas Romy</h1>
      </div>
      <div className="FacturaInfo__info">
        <div className="FacturaInfo__info__fecha">
          <p>{fechaActual}</p>
        </div>
        <div className="FacturaInfo__info__cliente">
          <p>
            Cliente:{" "}
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
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
      </div>
      <div className="FacturaInfo__table">
        <BasicTable onProductosChange={handleProductosChange} />
      </div>
    </div>
  );
};


export default FacturaInfo;
