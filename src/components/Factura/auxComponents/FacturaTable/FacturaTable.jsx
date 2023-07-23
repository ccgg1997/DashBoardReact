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


export default function BasicTable() {
  const [newRow, setNewRow] = useState({
    product_id: "",
    nombre: "",
    precio: "",
    cantidad: 1,
  });

  const [rows, setRows] = useState([]);

  const productos = useSelector((state) => state.precios);

  const { precio } = productos;

  const uniqueCodes = [...new Set(precio.map((item) => item.product_id))];

  const [selected, setSelected] = useState("");

  const handleClick = () => {
    if (newRow.product_id === "") {
      alert("Selecciona un producto");
      return;
    }else{
      setRows([...rows, newRow]);
    }
  };


  
  const deleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  }

  useEffect(() => {
    // Busca el objeto producto correspondiente al valor seleccionado
    const selectedProducto = precio.find(
      (item) => item.product_id === selected
    );
    if (!selectedProducto) return;
    const cantidad = 1;
    // Asigna el objeto cliente seleccionado a NewRow
    setNewRow({
      product_id: selectedProducto.product_id,
      nombre: selectedProducto.nombre,
      precio: selectedProducto.precio,
      cantidad: cantidad,
      total: cantidad * selectedProducto.precio,
    });
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
                <TableCell align="center">{row.product_id}</TableCell>
                <TableCell align="center">{row.cantidad}</TableCell>
                <TableCell align="center">{row.nombre}</TableCell>
                <TableCell align="center">{row.precio}</TableCell>
                <TableCell align="center">{row.total}</TableCell>
                <button onClick={() => deleteRow(index)}>Eliminar</button>
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
        <button onClick={handleClick}>Agregar</button>
      </TableContainer>

  );
}

