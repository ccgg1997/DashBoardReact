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

// Componente principal que representa la tabla de productos
export default function BasicTable({ onProductosChange, preciosEspeciales, isSelected }) {
  // Estado local para el nuevo producto que se va a agregar
  const [newRow, setNewRow] = useState({
    product_id: "",
    nombre: "",
    precio: "",
    cantidad: 1,
    familia_id: "",
    estilos:[]
  });

  // Estado local para mostrar notificaciones
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");
  const [tipoNotificacion, setTipoNotificacion] = useState("");
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

  // Estado local para controlar la apertura del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para mostrar notificaciones
  const setMensaje = (mensaje, tipo) => {
    setMensajeNotificacion(mensaje);
    setTipoNotificacion(tipo);
    setMostrarNotificacion(true);
    return true;
  };

  // Estado local para mantener la lista de productos en la tabla
  const [rows, setRows] = useState([]);

  //estado local para guardar los estilos de la categoria del producto seleccionado
  const [style, setStyle] = useState([]);

  // Obtiene los productos del estado global de Redux
  const productos = useSelector((state) => state.precios);
  const { precio } = productos;

  // Obtiene los productos del estado global de Redux con la categoria
  const productosCategoria = useSelector((state) => state.producto);
  const { producto } = productosCategoria;

  // Obtiene las familias del estado global de Redux
  const {familia} = useSelector((state) => state.familia);
 

  // Obtiene los códigos únicos de productos
  const uniqueCodes = [...new Set(precio.map((item) => item.product_id))];

  // Estado local para mantener el producto seleccionado en el selector
  const [selected, setSelected] = useState("");
  const [prod, setProd] = useState("");

  const obtenerStyle = (id) => {
    const producto = productosCategoria.producto.find(
      (item) => item.producto_id === id
    );
    if (!producto) return;
    const idFamilia = producto.familia_id;
    const familiaData = familia.find((item) => item.nombre === idFamilia);
    const estilos = familiaData.estilos;
    const estilosCantidad = estilos.map((item) => { return { ...item, cantidad: 0 } });
    if (!familiaData) return;
    setStyle(estilosCantidad);

  };

  // Maneja el clic en el botón "Agregar" para agregar un nuevo producto a la tabla
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
        estilos:[],
        cantidad: 1,
      });
    }
  };

  // Limpia la tabla y la lista de productos seleccionados cuando se cambia el cliente seleccionado
  useEffect (() => {
    if(isSelected === "Selecciona un cliente" ){
      return;
    } 
      setRows([]);
    onProductosChange([]);
  },[isSelected])

  // Maneja la selección de un producto y muestra la ventana modal con detalles
  const selectedProd = (row) => {
    setProd(row);
    handleOpen();
  };

  // Abre la ventana modal
  const handleOpen = () => {
    setIsModalOpen(true);
  };

  // Elimina un producto de la tabla y actualiza la lista de productos seleccionados
  const deleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
    onProductosChange(newRows);
  };

  // Actualiza la información del nuevo producto cuando se selecciona un producto en el selector
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
    obtenerStyle(selectedProducto.product_id);

    // Asigna el objeto cliente seleccionado a NewRow
    setNewRow({
      product_id: selectedProducto.product_id,
      nombre: selectedProducto.nombre,
      precio: selectedProducto.precio,
      cantidad: cantidad,
      estilos: style,
      total: cantidad * selectedProducto.precio,
    });
  }, [selected, preciosEspeciales, style]);

  // Oculta la notificación después de que se muestra
  useEffect(() => {
    if (mostrarNotificacion) {
      setMostrarNotificacion(false);
    }
  }, [mostrarNotificacion]);

  // Renderiza la tabla de productos
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          {/* Cabecera de la tabla */}
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
          {/* Filas de la tabla */}
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
          {/* Fila para seleccionar un nuevo producto */}
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
      {/* Botón para agregar un nuevo producto */}
      <button onClick={handleClick}>Agregar</button>
      {/* Componente Notificacion para mostrar mensajes */}
      <Notificacion
        mensaje={mensajeNotificacion}
        tipoNotificacion={tipoNotificacion}
        mostrarNotificacion={mostrarNotificacion}
      />
      {/* Componente DistribucionProducto para mostrar la ventana modal */}
      <DistribucionProducto
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={prod}
      />
    </TableContainer>
  );
}

// Componente de ventana modal para mostrar detalles del producto seleccionado
const DistribucionProducto = ({ isOpen, onClose, data }) => {
  const [cantidad, setCantidad] = useState(0);

  const handleChange = (e) => {
    setCantidad(e.target.value);
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{"Distribución de productos"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Detalles del producto */}
            <div>
              <p>Código: {data.product_id}</p>
              <p>Nombre: {data.nombre}</p>
              <p>Precio: {data.precio}</p>
              <p>Cantidad: {data.cantidad}</p>
              {data.estilos && data.estilos.map((item) => (
                <p key={item.estilo_id}>
                  {item.nombre}
                  <input
                    type="number"
                    onChange={handleChange}
                    value={data.cantidad}
                  />
                </p>
              ))}


            </div>
          </DialogContentText>
        </DialogContent>
        {/* Botón para cerrar la ventana modal */}
        <DialogActions>
          <button onClick={onClose}>Cerrar</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
