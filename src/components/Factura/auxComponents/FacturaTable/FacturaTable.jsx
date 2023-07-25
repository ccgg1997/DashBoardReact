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
import Notificacion from "../../../Basicos/Notificacion/Notificacion";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function BasicTable({ onProductosChange, preciosEspeciales, isSelected }) {
  const [newRow, setNewRow] = useState({
    product_id: "",
    nombre: "",
    precio: "",
    cantidad: 1,
  });

  const [mensajeNotificacion, setMensajeNotificacion] = useState("");
  const [tipoNotificacion, setTipoNotificacion] = useState("");
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const setMensaje = (mensaje, tipo) => {
    setMensajeNotificacion(mensaje);
    setTipoNotificacion(tipo);
    setMostrarNotificacion(true);
    return true;
  };

  const [rows, setRows] = useState([]);
  const productos = useSelector((state) => state.precios);
  const { precio } = productos;
  const uniqueCodes = [...new Set(precio.map((item) => item.product_id))];
  const [selected, setSelected] = useState("");
  const [prod, setProd] = useState("");

  const handleClick = () => {
    setRows([]);
    if (newRow.product_id === "") {
      setMensaje("Selecciona un producto", "error");
      return;
    } else {
      setRows([...rows, newRow]);
      setSelected("");
      onProductosChange([...rows, newRow]);
      setNewRow({
        product_id: "",
        nombre: "",
        precio: "",
        cantidad: 1,
      });
    }
  };

  useEffect (() => {
    if(isSelected === "Selecciona un cliente" ){
      return;
    } 
      setRows([]);
    onProductosChange([]);
  },[isSelected])

  const selectedProd = (row) => {
    setProd(row);
    handleOpen();
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const deleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
    onProductosChange(newRows);
  };

  useEffect(() => {
    if(!preciosEspeciales){
      alert("No hay precios especiales")
      return;
    }
    // Busca el objeto producto correspondiente al valor seleccionado
    const selectedProducto = preciosEspeciales.find(
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

  useEffect(() => {
    if (mostrarNotificacion) {
      setMostrarNotificacion(false);
    }
  }, [mostrarNotificacion]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Código</TableCell>
            <TableCell align="center">Cantidad</TableCell>
            <TableCell align="center"></TableCell>
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
              <TableCell align="center">
                {" "}
                <button onClick={() => selectedProd(row)}>+</button>
              </TableCell>
              <TableCell align="center">{row.nombre}</TableCell>
              <TableCell align="center">{row.precio}</TableCell>
              <TableCell align="center">{row.total}</TableCell>
              <TableCell align="center">
                <button onClick={() => deleteRow(index)}>Eliminar</button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell align="center">
              <select
                onChange={(e) => setSelected(e.target.value)}
                value={selected}
              >
                <option value={""}>Selecciona un producto</option>
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
      <Notificacion
        mensaje={mensajeNotificacion}
        tipoNotificacion={tipoNotificacion}
        mostrarNotificacion={mostrarNotificacion}
      />
      <DistribucionProducto
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={prod}
      />
    </TableContainer>
  );
}

const DistribucionProducto = ({ isOpen, onClose, data }) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{"Distribución de productos"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              <p>Producto: {data.nombre}</p>
              <p>Precio: {data.precio}</p>
              <p>Cantidad: {data.cantidad}</p>
              <p>Total: {data.total}</p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={onClose}>Cerrar</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
