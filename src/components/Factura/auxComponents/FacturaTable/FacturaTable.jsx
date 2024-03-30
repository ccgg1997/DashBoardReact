// Importación de las librerías y componentes necesarios
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
import "./FacturaTable.css";
import Notificacion from "../../../Basicos/Notificacion/Notificacion";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

// Componente principal que representa la tabla de productos
export default function BasicTable({ onProductosChange, preciosEspeciales, isSelected }) {
  // Estado local para mantener la lista de productos en la tabla
  const [products, setProducts] = useState([]);

  // Estado local para guardar los estilos de la categoría del producto seleccionado
  const [nombreFamilia, setNombreFamilia] = useState("");

  // Estado local para mantener el producto seleccionado en el selector
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productLine, setProductLine] = useState("");

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

  // Obtiene los productos del estado global de Redux
  const productos = useSelector((state) => state.precios);
  const { precio } = productos;

  // Obtiene los productos del estado global de Redux con la categoría
  const productosCategoria = useSelector((state) => state.producto);


  // Obtiene las familias del estado global de Redux
  const { familia } = useSelector((state) => state.familia);

  // Obtiene los códigos únicos de productos
  const uniqueCodes = [...new Set(precio.map((item) => item.product_id))];

  // Función para obtener los estilos de un producto
  const obtenerStyle = (id) => {
    const producto = productosCategoria.producto.find(
      (item) => item.producto_id === id
    );
    if (!producto) return [];
    const idFamilia = producto.familia_id;
    const familiaData = familia.find((item) => item.nombre === idFamilia);
    if (!familiaData) return [];
    const estilos = familiaData.estilos;
    setNombreFamilia(familiaData.nombre);
    return estilos.map((item) => { return { ...item, cantidad: 0 } });
  };

  // Maneja el click en el botón "Agregar" para agregar un nuevo producto a la tabla
  const handleClick = () => {
    // Valida que se haya seleccionado un producto
    if (!selectedProduct) {
      setMensaje("Selecciona un producto", "error");
      return;
    }

    // Valida que no se haya seleccionado un producto ya agregado
    if (products.find((item) => item.productoId === productLine.productoId)) {
      setMensaje("El producto ya está agregado", "error");
      return;
    }

    // Actualiza el estado local de la tabla y llama a la función para notificar el éxito
    setProducts([...products, productLine]);
    onProductosChange([...products, productLine]);
    setMensaje("Producto agregado", "success");
    setSelectedProduct("");
  };

  // Limpia la tabla y la lista de productos seleccionados cuando se cambia el cliente seleccionado
  useEffect(() => {
    if (isSelected === "Selecciona un cliente") {
      return;
    }
    setProducts([]);
    onProductosChange([]);
    setProductLine("");
    setSelectedProduct("");

  }, [isSelected]);

  // Maneja la selección de un producto y muestra la ventana modal con detalles
  const selectedProd = (row) => {
    setProductLine(row);
    handleOpen();
  };

  // Abre la ventana modal
  const handleOpen = () => {
    setIsModalOpen(true);
  };

  // Elimina un producto de la tabla y actualiza la lista de productos seleccionados
  const deleteRow = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
    onProductosChange(newProducts);
  };

  // Actualiza la información del nuevo producto cuando se selecciona un producto en el selector
  useEffect(() => {
    if (!preciosEspeciales) {
      alert("No hay precios especiales")
      return;
    }

    // Busca el objeto producto correspondiente al valor seleccionado
    const selectedProducto = preciosEspeciales.find(
      (item) => item.product_id === selectedProduct
    );

    if (selectedProduct === "") {
      return;
    }

    if (!selectedProducto) return;
    let cantidad = 0;
    const estilos = obtenerStyle(selectedProducto.product_id);

    // Asigna el objeto cliente seleccionado a NewRow
    const newRow = {
      productoId: selectedProducto.product_id,
      productoNombre: selectedProducto.nombre,
      familia: nombreFamilia,
      cantidad: cantidad,
      precio: parseInt(selectedProducto.precio),
      estilos: estilos,
      total: 0,
    };
    setProductLine(newRow);
  }, [selectedProduct, nombreFamilia, preciosEspeciales, productosCategoria]);

  // Actualiza los estilos cuando el nombre de la familia cambia
  useEffect(() => {
    if (nombreFamilia && productLine && productLine.estilos.length === 0) {
      const estilos = obtenerStyle(productLine.productoId);
      setProductLine((prevProductLine) => ({
        ...prevProductLine,
        estilos: estilos,
      }));
    }
  }, [nombreFamilia, productLine]);

  // Busca el producto y modifica la cantidad y el total
  const updateProduct = (id, cantidad) => {
    const updateStyle = productLine.estilos.map((item) => {
      if (item.nombre === id) {
        return { ...item, cantidad: Number(cantidad) };
      }
      return item;
    });
    const copyProductLine = { ...productLine };
    copyProductLine.estilos = updateStyle;
    copyProductLine.cantidad = updateStyle.reduce((total, item) => total + item.cantidad, 0);
    copyProductLine.total = agregarPuntos(copyProductLine.cantidad * copyProductLine.precio);
    setProductLine(copyProductLine);

    const copyProducts = [...products];
    const index = copyProducts.findIndex((item) => item.productoId === copyProductLine.productoId);
    copyProducts[index] = copyProductLine;
    setProducts(copyProducts);
    onProductosChange(copyProducts);
  };

  // Cierra la ventana modal
  const handleClose = () => {
    setIsModalOpen(false);
  };

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
          {products.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{row.productoId}</TableCell>
              <TableCell align="center">{row.cantidad}</TableCell>
              <TableCell align="center">
                {" "}
                <button onClick={() => selectedProd(row)}>+</button>
              </TableCell>
              <TableCell align="center">{row.productoNombre}</TableCell>
              <TableCell align="center">{row.precio}</TableCell>
              <TableCell align="center">{row.total}</TableCell>
              <TableCell align="center">
                <button onClick={() => deleteRow(index)}>Eliminar</button>
              </TableCell>
            </TableRow>
          ))}
          {/* Fila para seleccionar un nuevo producto */}
          <TableRow style={{backgroundColor: 'rgb(250, 246, 246)' }}>
            <TableCell align="center">
              <select
                className= "Select"
                onChange={(e) => setSelectedProduct(e.target.value)}
                value={selectedProduct}
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
              Nombre: {productLine ? productLine.productoNombre : ""}
            </TableCell>
            <TableCell align="center">
              Precio: {productLine ? productLine.precio : ""}
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
        onClose={handleClose}
        data={productLine}
        updateProduct={updateProduct}
      />
    </TableContainer>
  );
}

// Componente de ventana modal para mostrar detalles del producto seleccionado
const DistribucionProducto = ({ isOpen, onClose, data, updateProduct }) => {

  const handleQuantityChange = (nombre, cantidad) => {
    const nonNegativeCantidad = Math.max(0, cantidad);
    updateProduct(nombre, nonNegativeCantidad);
  };

  return (
    <div className="distribucion">
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{"Distribución de productos"}</DialogTitle>
        <DialogContent>
          {/* Detalles del producto */}
          <div className="estilos_producto" >
            <p>Código: {data.productoId}</p>
            <p>Nombre: {data.productoNombre}</p>
            <p>Precio: {data.precio}</p>
            <p>Cantidad: {agregarPuntos(data.cantidad)}</p>
            {data.estilos && data.estilos.map((item) => (
              <div key={item.nombre}>
                <label>{item.nombre}</label>
                <input
                  type="number"
                  value={item.cantidad === 0 ? "" : item.cantidad}
                  onChange={(e) => handleQuantityChange(item.nombre, e.target.value)}
                />
              </div>
            ))}
          </div>
        </DialogContent>
        {/* Botón para cerrar la ventana modal */}
        <DialogActions>
          <button onClick={onClose}>Cerrar</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Función para agregar puntos a los números 
const agregarPuntos = (numero) => {
  if(!numero) return;
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};