import React from "react";
import "./FacturaInfo.css";
import { useSelector } from "react-redux";
import { useState } from "react";

const FacturaInfo = () => {
  const clientes = useSelector((state) => state.clientes);

  const { cliente } = clientes;

  const uniqueIds = [...new Set(cliente.map((cliente) => cliente.id))];

  const [selectedItem, setSelectedItem] = useState("");


  const fechaActual = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
  };

  return (
    <div className="FacturaInfo">
      <div className="FacturaInfo__title">
        <h1>Bolsas Romy</h1>
      </div>
      <div className="FacturaInfo__info">
        <div className="FacturaInfo__info__fecha">
          <p>{fechaActual}</p>
        </div>
        <div className="FacturaInfo__info__cliente">
          <p>
            Cliente:
            <select value={selectedItem} onChange={handleItemChange}>
              <option>Selecciona un cliente</option>
              {uniqueIds.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </p>
        </div>
        <div className="FacturaInfo__info__duenio">
            <p>
                Dueño:
            </p>
        </div>

        <div className="FacturaInfo__info__direccion">
            <p>
                Dirección:
            </p>
        </div>
        <div className="FacturaInfo__info__telefono">
            <p>
                Teléfono:
            </p>
        </div>
        <div className="FacturaInfo__info__barrio">
          <p>
            Barrio:
          </p>
        </div>
        </div>
      </div>
  );
};

export default FacturaInfo;
