import React from "react";
import "./FacturaInfoCliente.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import BasicTable from "../FacturaTable/FacturaTable";
import { Button } from "@mui/material";
const FacturaInfo = () => {
  const clientes = useSelector((state) => state.clientes);

  const { cliente } = clientes;

  const uniqueNames = [...new Set(cliente.map((item) => item.negocio))];
  const [selected, setSelected] = useState("");

  const [selectedItem, setSelectedItem] = useState("");

  const fechaActual = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    // Busca el objeto cliente correspondiente al valor seleccionado
      const selectedCliente = cliente.find((item) => item.negocio === selected);
      // Asigna el objeto cliente seleccionado a selectedItem
      setSelectedItem(selectedCliente);
  }, [selected]);

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
        <BasicTable
        />
      </div>
    </div>
  );
};

export default FacturaInfo;
