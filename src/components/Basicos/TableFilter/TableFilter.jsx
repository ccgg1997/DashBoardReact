import React from "react";
import "./TableFilter.css";
import { DataGrid } from "@mui/x-data-grid";
export default function TableFilter(props) {
  const { nombre, nombreColumnas, datosFilas } = props;
  const numberRows = datosFilas.length === 0 ? 1 : datosFilas.length;

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

  const obtenerAnchoColumna = (titulo) => {
    // Calcula el ancho mínimo basado en el tamaño de fuente
    const minWidth = 15 * titulo.length; // Ajusta el factor de multiplicación según tus necesidades

    return {
      minWidth,
      align: "center", // Centra el contenido de la columna
      headerAlign: "center", // Centra el título de la columnar"
  
    };
  };

  // Configuración de las columnas con el ajuste automático del tamaño
  const columnasConAjuste = nombreColumnas.map((columna) => ({
    ...columna,
    ...obtenerAnchoColumna(columna.headerName), // Aplica el ajuste automático del tamaño
  }));

  return (
    <>
      {nombre && <h4>{nombre}</h4>}
      <div className="TableFilter" style={{ width: '100%' }}>
        <DataGrid
          rows={filasConId}
          columns={columnasConAjuste}
          pagination
          pageSize={10}
          disablePageSizeSelector
          hideFooterPagination
        />
      </div>
    </>
  );
}

