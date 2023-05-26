import React from "react";
import "./TableFilter.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { functionTableData } from "./TableFilterData";
export default function TableFilter() {
  const { inventario } = useSelector((state) => state.inventario);
  const { nombresKeys, nuevaLista } = functionTableData(inventario, "FINA");
  console.log(
    "sacando headers",
    nombresKeys,
    "inventario de estado",
    nuevaLista
  );
  return (
    <>
      <h2>Inventario</h2>
      <div className="TableFilter">
        <DataGrid
          rows={nuevaLista}
          columns={nombresKeys}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </>
  );
}
