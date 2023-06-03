import React from "react";
import "./TableFilter.css";
import { DataGrid } from "@mui/x-data-grid";
export default function TableFilter(props) {
  const { nombre, nombreColumnas, datosFilas } = props;
  const numberRows = datosFilas.length === 0 ? 1 : datosFilas.length;
  console.log("TableFilter", datosFilas.length);

  // Agregar una propiedad 'id' solo a los objetos sin 'id'
  const filasConId = datosFilas.map((fila, index) => {
    if (!fila.hasOwnProperty('id')) {
      return {
        ...fila,
        id: index  // Puedes ajustar la generación del 'id' según tus necesidades
      };
    }
    return fila;
  });

  return (
    <>
      <h4>{nombre}</h4>
      <div className="TableFilter">
        <DataGrid
          rows={filasConId}
          columns={nombreColumnas}
          pagination
          pageSize={numberRows}
          disablePageSizeSelector
          hideFooterPagination
        />
      </div>
    </>
  );
}

