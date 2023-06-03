import React from "react";
import { useState } from "react";
import "./FormEliminar.css";
import { useSelector } from "react-redux";
import { eliminarCliente,infoClientes } from "../../../../Api/apiAddress";
import { useDispatch } from "react-redux";
import { setCliente } from "../../../../../features/clientes/clientes";


const FormEliminar = () => {
  //definiendo dispatch y sacando los datos de la api
  const dispatch = useDispatch();
  const cliente  = useSelector((state) => state.clientes);
  const { token } = useSelector((state) => state.auth);
  const clientes = cliente.cliente;

  //estados variables
  const [selectedItem, setSelectedItem] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const uniqueIds = [...new Set(clientes.map(cliente => cliente.id))];
  const [clienteEliminado, setClienteEliminado] = useState(false);

  //acciondes de los botones
  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
    setClienteEliminado(false);
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
    
  };

  const handleConfirmationAccept = async() => {
    // Aquí puedes agregar la lógica para eliminar el elemento seleccionado
    setShowConfirmation(false);
    await eliminarCliente(selectedItem, token);
    const negociosActualizado = await infoClientes(token);
    dispatch(setCliente(negociosActualizado));
    setSelectedItem("");
    setClienteEliminado(true);

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
          {uniqueIds.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {selectedItem && !showConfirmation && <button onClick={handleDeleteClick}>Eliminar</button>}
        {showConfirmation && (
          <div className="confirmation">
            <p>¿Estás seguro de que quieres eliminar {selectedItem}?</p>
            <button onClick={handleConfirmationAccept}>Aceptar</button>
            <button onClick={handleConfirmationCancel}>Cancelar</button>
          </div>
        )}
        {
        clienteEliminado && <div className="checkeliminado">Cliente Eliminado</div>
      }
      </div>
      
    </div>
  );
};

export default FormEliminar;
