import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function createData(cantidad, codigo,nombre,  precio) {
  return { cantidad, codigo,nombre, precio };
}

export default function BasicTable() {
  
  const [newRow, setNewRow] = useState({
    product_id: "",
    nombre: "",
    precio: ""
  });

  const [rows, setRows] = useState([]);

  const productos = useSelector((state) => state.precios);

  const { precio } = productos;

  const uniqueCodes = [...new Set(precio.map((item) => item.product_id))];

  const [selected, setSelected] = useState("");

  useEffect(() => {
    // Busca el objeto producto correspondiente al valor seleccionado
    const selectedProducto = precio.find(
      (item) => item.product_id === selected
    );
    // Asigna el objeto cliente seleccionado a NewRow
    setNewRow(selectedProducto);
    alert(JSON.stringify(rows))
  }, [selected]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Código</TableCell>
            <TableCell align="center">Cantidad</TableCell>
            <TableCell align="center">Descripción</TableCell>
            <TableCell align="center">Precio Unitario</TableCell>
            <TableCell align="center">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{row.codigo}</TableCell>
              <TableCell align="center">{row.cantidad}</TableCell>
              <TableCell align="center">{row.nombre}</TableCell>
              <TableCell align="center">{row.precio}</TableCell>
              <TableCell align="center">{row.total}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell align="center">
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option>Selecciona un producto</option>
                {uniqueCodes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </TableCell>
            <TableCell align="center">
              Nombre: {newRow ? newRow.nombre : ""}
            </TableCell>
            <TableCell align="center">
              Precio: {newRow ? newRow.precio : ""}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <button
        onClick={() => {
          // Agregar la nueva fila editada al estado rows
          setRows((prevRows) => [
            ...prevRows,
            createData(
              newRow.cantidad,
              newRow.product_id,
              newRow.nombre,
              newRow.precio
            ),
          ]);
          // Restablecer el estado newRow para permitir la edición de una nueva fila
          setNewRow({
            cantidad: "",
            codigo: "",
            nombre: "",
            precio: ""
          });
        }}
      >
        Agregar Producto
      </button>
    </TableContainer>
  );
}
