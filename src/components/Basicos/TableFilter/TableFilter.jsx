import React from "react";
import "./TableFilter.css";
import { DataGrid } from "@mui/x-data-grid";
export default function TableFilter(props) {
  const { nombre, nombreColumnas, datosFilas } = props;
  const numberRows= (datosFilas.length===0 )? 1 :datosFilas.length;
  console.log("TableFilter", datosFilas.length);

  return (
    <>
      <h4>{nombre}</h4>
      <div className="TableFilter">
        <DataGrid
          rows={datosFilas}
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
