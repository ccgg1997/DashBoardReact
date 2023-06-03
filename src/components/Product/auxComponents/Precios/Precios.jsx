import React from "react";
import "./Precios.css";
import { useState } from "react";
import TableFilter from "../../../Basicos/TableFilter/TableFilter";
import { useSelector } from "react-redux";
import RightSide from "../../../Basicos/RightSide/RightSide";
import Update from "../../../MainDash/AuxMainDash/Update/Update";

export const Precios = () => {
  //variables iniciales (clientes, precios, token)
  const cliente = useSelector((state) => state.clientes);
  const clientes = cliente.cliente;
  const { precio } = useSelector((state) => state.precios);
  const { token } = useSelector((state) => state.auth);
  const [selectedItem, setSelectedItem] = useState("");

  //acciones de select
  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
  };

  //valores del select
  const uniqueIds = [...new Set(clientes.map((cliente) => cliente.id))];

  //valores de la tabla
  const columnas = Object.keys(precio[0]).map((key) => {
    return {
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      width: key === "id" ? 10 : 130,
      type: typeof precio[0][key] === "number" ? "number" : undefined,
    };
  });

  console.log("columnas:", columnas);
  return (
    <>
      <div className="Precios">
        <div className="contenedorOpcionesPrecios">
          <select value={selectedItem} onChange={handleItemChange}>
            <option value="">Selecciona un elemento</option>
            {uniqueIds.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button>busca lista de precio especial</button>
        </div>
        <div className="precioContainer">
          <div className="containerTablefilter">
            <TableFilter
              nombre={"PRECIOS"}
              nombreColumnas={columnas}
              datosFilas={precio}
            />
          </div>
          {selectedItem && (
            <div>
              <TableFilter
                nombre={"PRECIOS ESPECIAL"}
                nombreColumnas={columnas}
                datosFilas={precio}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Precios;
