import React, { useState, useEffect } from "react";
import "./BuscarFactura.css";
import { TextField, Button } from "@mui/material";
import Notificacion from "../../../Basicos/Notificacion/Notificacion";
import { searchFactura, deleteFactura } from "../../../Api/apiAddress";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { margin } from "@mui/system";
import ScrollDialog from "../../../Basicos/ModalScrolll/ModalScroll";
import FacturaPdf from "../FacturaPdf/FacturaPdf";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

const BuscarFactura = () => {
  const [idFactura, setIdFactura] = React.useState("");
  const [factura, setFactura] = useState({});
  const [isInfoFactura, setIsInfoFactura] = useState(false);

  const [facturaToPDF, setFacturaToPDF] = useState({});
  const [forceRender, setForceRender] = useState(0);
  // Estado local para mostrar notificaciones
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");
  const [tipoNotificacion, setTipoNotificacion] = useState("");
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

  const [open, setOpen] = React.useState(false);

  const token = useSelector((state) => state.auth.token);

  const handlePrint = () => {
    setIsInfoFactura(false);
    setFacturaToPDF({}); // Abre la vista de impresión del navegador
  };

  const onClick = async () => {
    if (idFactura === "") {
      setMensaje("Ingrese un id de factura", "error");
      return;
    }

    if (facturaToPDF && facturaToPDF.id === idFactura) {
      setMensaje("Factura ya cargada", "error");
      return;
    }

    try {
      const factura = await searchFactura(idFactura, token);
      if (factura.message === "el id de factura ingresado no existe") {
        setMensaje(factura.message, "error");
      } else {
        setMensaje("Factura encontrada", "success");
        setIsInfoFactura(true);
        setFactura(factura);
        const data = transformData(factura);
        setFacturaToPDF(data);
        setForceRender(forceRender + 1);
        console.log("viendo la superdata::::*/:" + JSON.stringify(data));
      }
    } catch (error) {
      setMensaje(error.message, "error");
    }
  };

  const handleChange = (e) => {
    setIdFactura(e.target.value);
  };

  // Función para mostrar notificaciones
  const setMensaje = (mensaje, tipo) => {
    setMensajeNotificacion(mensaje);
    setTipoNotificacion(tipo);
    setMostrarNotificacion(true);
    return true;
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const onClickEliminar = async () => {
    if (idFactura === "") {
      setMensaje("Ingrese un id de factura a eliminar", "error");
      return;
    }

    try {
      const factura = await deleteFactura(idFactura, token);
      if (factura.message === "el id de factura ingresado no existe") {
        setMensaje(factura.message, "error");
      } else {
        setMensaje("Factura eliminada", "success");
        setIsInfoFactura(false);
        setFactura({});
        closeModal();
      }
    } catch (error) {
      setMensaje(error.message, "error");
    }
  };

  // Oculta la notificación después de que se muestra
  useEffect(() => {
    if (mostrarNotificacion) {
      setMostrarNotificacion(false);
    }
  }, [mostrarNotificacion]);

  useEffect(() => {
    // Este efecto se ejecutará cada vez que facturaToPDF cambie
  }, [facturaToPDF]);

  return (
    <div
      className="BuscarFacturaInfo"
      style={{ overflowY: "scroll", maxHeight: "500px" }}
    >
      <div className={isInfoFactura ? "contenedortitulobotones2" : "contenedortitulobotones" }>
        <div className="tituloBuscar">
          <ScrollDialog texto="" titulo="Facturas Realizadas Hoy" />
          {"Bolsas Romy "}
        </div>
        <div className="campoBuscarFacturaInfo__info">
          <TextField
            id="outlined-basic"
            onChange={handleChange}
            label="Id de la factura"
            variant="outlined"
          />
        </div>
        <div className="buscarFacturaInfo__boton">
          <Button variant="contained" sx={{ margin: "10px" }} onClick={onClick}>
            Buscar
          </Button>
          <Button
            variant="contained"
            sx={{ margin: "10px" }}
            onClick={openModal}
          >
            Eliminar
          </Button>
        </div>
      </div>

      {isInfoFactura && (
        <div className="contenedor">
          <button onClick={handlePrint}>Cerrar</button>
          <div
            style={{ width: "100vw", height: "100vh", flexDirection: "column" }}
          >
            <PDFViewer
              key={forceRender}
              style={{ width: "80%", height: "100%" }}
            >
              <FacturaPdf key={forceRender} factura={facturaToPDF} />
            </PDFViewer>
          </div>
        </div>
      )}

      {/* {isInfoFactura && factura && (
        <div className="contenedor">
          <h1>hola</h1>
          <button onClick={setIsInfoFactura(false)}>Cerrar</button>
          <div
            style={{ width: "100vw", height: "100vh", flexDirection: "column" }}
          >
            <PDFViewer
              key={forceRender}
              style={{ width: "80%", height: "100%" }}
            >
              <FacturaPdf key={forceRender} factura={facturaToPDF} />
            </PDFViewer>
          </div>
        </div>
      )} */}
      {/* Product table */}

      <div className="BuscarFacturaInfo__table"></div>

      <Notificacion
        mensaje={mensajeNotificacion}
        tipoNotificacion={tipoNotificacion}
        mostrarNotificacion={mostrarNotificacion}
      />

      <Confirmacion
        onClickEliminar={onClickEliminar}
        open={open}
        onClose={closeModal}
      />
    </div>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Confirmacion = ({ onClickEliminar, open, onClose }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Esta seguro de eliminar la factura?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
          >
            <Button variant="contained" onClick={onClickEliminar}>
              Si
            </Button>
            <Button variant="contained" color="error" onClick={closeModal}>
              Cancelar
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

function transformData(data) {
  const { factura, detalleFactura, negocio } = data;
  const { id, fecha, total } = factura;
  const { productos } = detalleFactura;
  const { nombre, duenio, telefono, direccion, barrio } = negocio;

  const transformedData = {
    id,
    negocioId: 123456, // Aquí deberías poner el ID correcto del negocio
    cliente: nombre,
    duenio,
    telefono,
    direccion,
    barrio,
    total,
    productos: productos.map((producto) => ({
      productoId: producto.productoId,
      productoNombre: producto.productoNombre,
      familia: producto.familia,
      cantidad: producto.cantidad,
      precio: producto.precio,
      estilos: producto.estilos.map((estilo) => ({
        nombre: estilo.nombre,
        cantidad: estilo.cantidad,
      })),
      total: producto.total.toString(),
    })),
    fecha: new Date(fecha).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  };

  return transformedData;
}

export default BuscarFactura;
