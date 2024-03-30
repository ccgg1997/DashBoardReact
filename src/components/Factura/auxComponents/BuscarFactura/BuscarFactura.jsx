import React, { useState, useEffect } from "react";
import "./BuscarFactura.css";
import { TextField, Button, Tooltip } from "@mui/material";
import Notificacion from "../../../Basicos/Notificacion/Notificacion";
import {
  searchFactura,
  abonarFactura,
  deleteFactura,
} from "../../../Api/apiAddress";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ScrollDialog from "../../../Basicos/ModalScrolll/ModalScroll";
import FacturaPdf from "../FacturaPdf/FacturaPdf";
import { PDFViewer } from "@react-pdf/renderer";

const BuscarFactura = () => {
  const [idFactura, setIdFactura] = React.useState("");
  const [factura, setFactura] = useState({});
  const [isInfoFactura, setIsInfoFactura] = useState(false);
  const [infoFacturaAbonar, setInfoFacturaAbonar] = useState(false);

  const [facturaToPDF, setFacturaToPDF] = useState({});
  const [forceRender, setForceRender] = useState(0);
  // Estado local para mostrar notificaciones
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");
  const [tipoNotificacion, setTipoNotificacion] = useState("");
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [openModalAbono, setOpenModalAbono] = React.useState(false);

  const token = useSelector((state) => state.auth.token);
  const facturasHoy = useSelector((state) => state.facturasHoy.facturasHoy);

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

  const handleAbonar = async () => {
    if (idFactura === "") {
      setMensaje("Ingrese un id de factura a abonar", "error");
      return;
    }
    try {
      const factura = await searchFactura(idFactura, token);
      setMensaje("Factura encontrada", "success");
      setFactura(factura);
      setOpenModalAbono(true);
      setInfoFacturaAbonar(true);
    } catch (error) {
      setMensaje(error.message, "error");
    }
  };

  const updateAbono = async (abono) => {
    if (idFactura === "") {
      setMensaje("Ingrese un id de factura a abonar", "error");
      return;
    }
    const data = {
      id: idFactura,
      abono: abono,
    };

    try {
      const factura = await abonarFactura(data, token);
      if (factura.message === "el id de factura ingresado no existe") {
        setMensaje(factura.message, "error");
      } else {
        setMensaje("Factura abonada", "success");
        setInfoFacturaAbonar(false);
        setOpenModalAbono(false);
        setFactura({});
        closeModal();
      }
    } catch (error) {
      setMensaje(error.message, "error");
    }
  };

  const onClickEliminar = async () => {
    if (idFactura === "") {
      setMensaje("Ingrese un id de factura a eliminar", "error");
      return;
    }

    try {
      const factura = await deleteFactura(idFactura, token);
      console.log(factura);
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
      <div
        className={
          isInfoFactura ? "contenedortitulobotones2" : "contenedortitulobotones"
        }
      >
        <div className="tituloBuscar">
          <Tooltip title="Historial facturas de hoy" arrow>
            <div>
              <ScrollDialog
                texto={facturasHoy}
                titulo="Facturas Realizadas Hoy"
              />
            </div>
          </Tooltip>
          <div>{"Bolsas Romy "}</div>
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
          <Tooltip title="Abonar saldo a una factura" arrow>
            <Button
              variant="contained"
              sx={{ margin: "10px" }}
              onClick={handleAbonar}
            >
              Abonar
            </Button>
          </Tooltip>
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
              style={{ width: "75%", height: "100%" }}
            >
              <FacturaPdf key={forceRender} factura={facturaToPDF} />
            </PDFViewer>
          </div>
        </div>
      )}
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

      {infoFacturaAbonar && (
        <Abonar
          onClickAbonar={handleAbonar}
          updateAbono={updateAbono}
          factura={factura}
          open={openModalAbono}
          onClose={() => setOpenModalAbono(false)}
        />
      )}
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
            <Button variant="contained" color="error" onClick={onClose}>
              Cancelar
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

const Abonar = ({ updateAbono, factura, open, onClose }) => {
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");
  const [tipoNotificacion, setTipoNotificacion] = useState("");
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

  // Función para mostrar notificaciones
  const setMensaje = (mensaje, tipo) => {
    setMensajeNotificacion(mensaje);
    setTipoNotificacion(tipo);
    setMostrarNotificacion(true);
  };

  const closeModal = () => {
    onClose();
  };

  const total = parseInt(factura.factura.total);
  const abonoAct = parseInt(factura.factura.totalAbonos);
  const [abono, setAbono] = useState(null);
  const [ocultarAbono, setOcultarAbono] = useState(false);
  const balance = total - abonoAct;
  useEffect(() => {
    const balance = total - abonoAct;
    setOcultarAbono(balance <= 0);
    console.log(ocultarAbono);
  }, [total, abonoAct]);
  

  const handleAbonoAdicionar = (e) => {
    setAbono(e.target.value);
  };

  const onClickAbonar = () => {
    if (abono === null || abono === "") {
      setMensaje("Ingrese un valor de abono", "error");
    } else {
      updateAbono(abono);
    }
  };

  return (
    <div className="abonar">
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="box">
          <div className="infoFacturaAbonar">
            <div className="historial">
              <Tooltip title="Historial de abonos" arrow>
                <div>
                  <ScrollDialog
                    texto={factura.factura.abonos}
                    titulo="Historial de abonos"
                  />
                </div>
              </Tooltip>
            </div>
            <Typography variant="h6" component="h2">
              Factura No. {factura.factura.id}
            </Typography>
            <div className="balance">
              <Typography variant="h6" component="h2">
                Cliente: {factura.negocio.nombre}
              </Typography>
            </div>
          </div>
          <div>
            <div
              className={`estado ${
                factura.factura.estado ? "pagada" : "pendiente"
              }`}
            >
              <h3>Estado: {factura.factura.estado ? "Pagada" : "Pendiente"}</h3>
            </div>
            <div>
              <div className="totalBalance">
                <div className="">
                  <h3>Total</h3>
                  <h2>${formatAmount(factura.factura.total)}</h2>
                </div>
                <div className="">
                  <h3>Saldo</h3>
                  <h2>${formatAmount(balance)}</h2>
                </div>
              </div>
              <form className="ingresoAbono">
                {!ocultarAbono && (
                <div className="abonoValor">
                  <div className="labelAbono">
                    <h3>Valor del abono: </h3>
                  </div>
                  <div className="inputAbono">
                    <TextField
                      type="number"
                      id="value"
                      inputProps={{ min: 0 }}
                      size="small"
                      sx={{
                        "& input": {
                          color: "blue", // Cambia el color del texto de entrada del TextField
                        },
                      }}
                      onChange={handleAbonoAdicionar}
                    />
                  </div>
                </div>
                  )}
              </form>
            </div>
            <div className="botonesAbonar">
              {!ocultarAbono && (
              <Button
                onClick={onClickAbonar}
                className="w-full"
                variant="contained"
              >
                Abonar
              </Button>
              )}

              <Button
                onClick={closeModal}
                className="w-full"
                variant="contained"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <Notificacion
        mensaje={mensajeNotificacion}
        tipoNotificacion={tipoNotificacion}
        mostrarNotificacion={mostrarNotificacion}
      />
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

// Formatear valores con puntos
const formatAmount = (amount) => {
  // Formatear el número con dos decimales y añadir separadores de miles
  let formattedAmount = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Eliminar los ceros decimales al final
  formattedAmount = formattedAmount.replace(/\.?0+$/, "");

  return formattedAmount;
};

export default BuscarFactura;
