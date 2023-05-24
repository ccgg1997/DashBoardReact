import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";


const makeStyle = (status) => {
  if (status === "aproved") {
    return { background: "rgb(145 254 159 /47%)", color: "#00B87C" };
  } else if (status === "rejected") {
    return { background: "#FFF0F0", color: "#FF0000" };
  } else {
    return { background: "#FFFBE6", color: "#FFB800" };
  }
};

const statusCell = (cantidad,limite) => {
  if (cantidad>limite) {
    return <TableCell><span className="status" style={makeStyle("aproved")}>INVENTARIO</span></TableCell>;
  }
  else if (cantidad<limite) {
    return <TableCell><span className="status" style={makeStyle("rejected")}>PRODUCCION</span></TableCell>;
  }
};


export default function BasicTable({data, heads, isInventario=false,limite=false, title="title"}) {
  
  return (
    <div className="Table">
      <h3>{title}</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {heads.map((head, id) => (
                <TableCell align="left" key={id}>
                  {Object.keys(head)[0]}
                </TableCell>
              ))}
              {limite? <TableCell>Status</TableCell>:null}
            </TableRow>
            

          </TableHead>
          <TableBody>
            {data.map((row,id) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.values(row).map((value, id) => (
                  <TableCell align="left" key={id}>
                    {value}
                  </TableCell>
                ))}
                {limite? statusCell(row.Cantidad,limite):null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
