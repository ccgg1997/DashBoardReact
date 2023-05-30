import React from "react";
import { useState } from "react";
import "./FormEliminar.css";

const FormEliminar = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const items = ["Item 1", "Item 2", "Item 3"];

  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmationAccept = () => {
    // Aquí puedes agregar la lógica para eliminar el elemento seleccionado
    setShowConfirmation(false);
  };

  const handleConfirmationCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="FormContainerDelete">
      <div className="mensaje">
        <span>
          {" "}
          «Vender se trata realmente de tener conversaciones con la gente y
          ayudar a mejorar su empresa o su vida.»
        </span>
        <span> —Lori Richardson</span>
      </div>
      <div className="selectNegocio">
        <select value={selectedItem} onChange={handleItemChange}>
          <option value="">Selecciona un elemento</option>
          {items.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {selectedItem && <button onClick={handleDeleteClick}>Eliminar</button>}
        {showConfirmation && (
          <div className="confirmation">
            <p>¿Estás seguro de que quieres eliminar {selectedItem}?</p>
            <button onClick={handleConfirmationAccept}>Aceptar</button>
            <button onClick={handleConfirmationCancel}>Cancelar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormEliminar;
