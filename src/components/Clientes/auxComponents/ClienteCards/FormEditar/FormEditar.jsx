import React from "react";
import { useState } from "react";
import "./FormEditar.css";
import { useSelector } from "react-redux";
import { editarCliente, infoClientes } from "../../../../Api/apiAddress";
import { useDispatch } from "react-redux";
import { setCliente } from "../../../../../features/clientes/clientes";

const FormEditar = () => {
  // Definiendo dispatch y sacando los datos de la API
  const dispatch = useDispatch();
  const cliente = useSelector((state) => state.clientes);
  const { token } = useSelector((state) => state.auth);
  const clientes = cliente.cliente;
  const uniqueIds = [...new Set(clientes.map((cliente) => cliente.id))];

  // Seleccionando y estableciendo el estado del elemento a editar
  const [selectedItem, setSelectedItem] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState({});
  
  // Mostrar el modal de confirmación
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [clienteEditado, setClienteEditado] = useState(false);

  // Acciones de los botones
  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
    const selectedCliente = clientes.find(
      (cliente) => cliente.id.toString() === e.target.value.toString()
    );
    const { id, ultimoPedido, ultimaLlamada, ...rest } = selectedCliente || {};
    setClienteSeleccionado(rest);
    //const keys = Object.keys(selectedCliente ?? {});
    setClienteEditado(false);
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  // Lógica para editar el elemento seleccionado
  const handleConfirmationAccept = async () => {
    setShowConfirmation(false);
    try {
      await editarCliente(selectedItem,clienteSeleccionado, token);
      const negociosActualizado = await infoClientes(token);
      dispatch(setCliente(negociosActualizado));
      setSelectedItem("");
      setClienteEditado(true);
    } catch (error) {
      // Manejar el error aquí, por ejemplo, mostrar un mensaje de error o realizar alguna acción
      console.error("Error al editar el cliente:", error);
    }
  };
  

  const handleConfirmationCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="FormContainerEditar">
      <div className="selectNegocioEditar">
        <select value={selectedItem} onChange={handleItemChange}>
          <option value="">Selecciona un elemento</option>
          {uniqueIds.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {selectedItem && !showConfirmation && (
          <button onClick={handleDeleteClick}>Editar</button>
        )}
        {showConfirmation && (
          <div className="confirmation">
            <p>¿Estás seguro de que quieres editar {selectedItem}?</p>
            <button onClick={handleConfirmationAccept}>Aceptar</button>
            <button onClick={handleConfirmationCancel}>Cancelar</button>
          </div>
        )}
        {clienteEditado && (
          <div className="checkeliminado">Cliente Editado</div>
        )}
      </div>
      <div className="datosEditar">
        {selectedItem &&
          Object.entries(clienteSeleccionado).map(([key, value]) => (
            <div key={key}>
              <label htmlFor={key}>{key}</label>
              <input
                type="text"
                id={key}
                value={value}
                onChange={(e) =>
                  setClienteSeleccionado((prevData) => ({
                    ...prevData,
                    [key]: e.target.value,
                  }))
                }
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FormEditar;
