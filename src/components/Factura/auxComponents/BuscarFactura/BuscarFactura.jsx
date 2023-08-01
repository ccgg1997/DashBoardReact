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

const BuscarFactura = () => {
  const [idFactura, setIdFactura] = React.useState("");
  const [factura, setFactura] = useState({});
  const [detalleFactura, setDetalleFactura] = useState([]);
  const [facturaInfo, setFacturaInfo] = useState({});
  const [negocioInfo, setNegocioInfo] = useState({});

  const [isInfoFactura, setIsInfoFactura] = useState(false);

  // Estado local para mostrar notificaciones
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");
  const [tipoNotificacion, setTipoNotificacion] = useState("");
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

  const [open, setOpen] = React.useState(false);

  const token = useSelector((state) => state.auth.token);

  const onClick = async () => {
    if (idFactura === "") {
      setMensaje("Ingrese un id de factura", "error");
      return;
    }

    if (facturaInfo && facturaInfo.id === idFactura) {
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
        setDetalleFactura(factura.detalleFactura);
        setFacturaInfo(factura.factura);
        setNegocioInfo(factura.negocio);
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
        setDetalleFactura([]);
        setFacturaInfo({});
        setNegocioInfo({});
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

  return (
    <div
      className="BuscarFacturaInfo"
      style={{ overflowY: "scroll", maxHeight: "450px" }}
    >
      <div className="BuscarFacturaInfo__title">
        <h1>Bolsas Romy</h1>
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
        <Button variant="contained" sx={{ margin: "10px" }} onClick={openModal}>
          Eliminar
        </Button>
      </div>
      {isInfoFactura && factura && (
        <div className="BuscarFacturaInfo__info">
          <div className="BuscarFacturaInfo__info__fecha">
            <p>fecha: {facturaInfo.fecha}</p>
          </div>
          <div className="BuscaracturaInfo__info__cliente">
            Nro de factura: {facturaInfo.id}
          </div>
          <div className="BuscarFacturaInfo__info__duenio">
            <p>Dueño: {negocioInfo.duenio}</p>
          </div>
          <div className="BuscarFacturaInfo__info__direccion">
            <p>Dirección: {negocioInfo.direccion}</p>
          </div>
          <div className="BuscarFacturaInfo__info__telefono">
            <p>Teléfono: {negocioInfo.telefono}</p>
          </div>
          <div className="BuscarFacturaInfo__info__barrio">
            <p>Barrio: {negocioInfo.barrio}</p>
          </div>
          <div className="BuscarFacturaInfo__info__total">
            {/* Total price */}
            <p>Total: ${facturaInfo.total}</p>
          </div>
        </div>
      )}
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

export default BuscarFactura;
