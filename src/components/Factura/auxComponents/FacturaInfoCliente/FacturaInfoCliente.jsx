import React, { useState, useEffect, useRef } from "react";
import "./FacturaInfoCliente.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { infoPreciosClienteEspecial } from "../../../Api/apiAddress";
import BasicTable from "../FacturaTable/FacturaTable";
import { useCallback } from "react";
import Notificacion from "../../../Basicos/Notificacion/Notificacion";
import generarPDF from "../../../Basicos/generatePdf/generatePdf";
import { createFactura,searchFacturaByDate } from "../../../Api/apiAddress";
import logo from "../../../../../src/imgs/logo.png";
import FacturaPdf from "../FacturaPdf/FacturaPdf";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import { setFacturasHoy } from "../../../../features/facturasHoy/facturasHoy";
import Select from 'react-select';

const FacturaInfo = () => {
  const handlePrint = () => {
    setFacturaDisponible(false); // Abre la vista de impresión del navegador
  };

  // State variables
  const dispatch = useDispatch();
  const [facturaDisponible, setFacturaDisponible] = useState(false);
  const [producto, setProductos] = useState([]);
  const [preciosEspeciales, setPreciosEspeciales] = useState([]);
  const [total, setTotal] = useState(0);
  const [facturaToPDF, setFacturaToPDF] = useState({}); //objeto factura con los datos de la factura para generar el pdf
  const [facturaToDB, setFacturaToDB] = useState({}); //objeto factura con los datos de la factura para guardar en la base de datos

  
  const [fechaHoy, fechaManana] = fecharHoyMañana();
  const data = {
    fechainicio: fechaHoy,
    fechafin: fechaManana,
  }

  // Redux state
  const clientes = useSelector((state) => state.clientes);
  const token = useSelector((state) => state.auth.token);
  const { cliente } = clientes;

  const [isOpen, setIsOpen] = useState(false);

  // Estado local para mostrar notificaciones
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");
  const [tipoNotificacion, setTipoNotificacion] = useState("");
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

  // Función para mostrar notificaciones
  const setMensaje = (mensaje, tipo) => {
    setMensajeNotificacion(mensaje);
    setTipoNotificacion(tipo);
    setMostrarNotificacion(true);
    return true;
  };

  // Oculta la notificación después de que se muestra
  useEffect(() => {
    if (mostrarNotificacion) {
      setMostrarNotificacion(false);
    }
  }, [mostrarNotificacion]);

  // Date formatting
  const fechaActual = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const estilosMayoresACero = () => {
    const estilosMayoresA0 = producto.map((item) => {
      const estilosProd = item.estilos.filter((estilo) => estilo.cantidad > 0);
      return {
        ...item,
        estilos: estilosProd,
      };
    });
    return estilosMayoresA0;
  };

  // Unique business names for dropdown
  const uniqueNames = [...new Set(cliente.map((item) => item.negocio))];
  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [forceRender, setForceRender] = useState(0);

  //objeto factura con los datos de la factura
  const crearFactura = async () => {
    if (!selectedItem) return;
    if (!verificarTotal(producto)) {
      setMensaje("Hay producto/s sin cantidad, verifica por favor", "error");
      return;
    }

    // Remove products with 0 quantity
    const productosActualizados = estilosMayoresACero();
    setProductos(productosActualizados);
    let idFactura = 0;
    const factura = {
      id: idFactura,
      negocioId: selectedItem.id,
      cliente: selectedItem.negocio,
      duenio: selectedItem.duenio,
      telefono: selectedItem.telefono,
      direccion: selectedItem.direccion,
      barrio: selectedItem.barrio,
      total: total,
      productos: productosActualizados,
    };

    const facturaDB = {
      negocioId: parseInt(selectedItem.id),
      total: total,
      productos: productosActualizados,
    };

    setFacturaToDB(facturaDB);
    const resul = await createFactura(facturaDB, token);
    if (resul.error) {
      setMensaje(resul, "error");
      return;
    } else {

      //actualizar el listado de facturas del día
      const responseFacturasHoy = await searchFacturaByDate(data,token);
      dispatch(setFacturasHoy(responseFacturasHoy));
      
      // Obtén la fecha actual
      const today = formatDateToYYYYMMDD(new Date());
      
      const copyFactura = { ...factura, id: resul.id,fecha: today };
      idFactura = resul.id;
      setMensaje("Factura creada con éxito", "success");
      setFacturaToPDF(copyFactura);
      setSelectedCliente("");
      setSelectedItem(null);
      setIsOpen(false);
      setForceRender(forceRender + 1);
    }
  };

  // cuando el estado facturaToPDF se actualice correctamente.
  useEffect(() => {
    if (facturaToPDF && Object.keys(facturaToPDF).length > 0) {
      setFacturaDisponible(true);
    }
  }, [facturaToPDF]);

  useEffect(() => {
    // Este efecto se ejecutará cada vez que facturaToPDF cambie
  }, [facturaToPDF]);

  // Calculate the total price
  const updateTotal = useCallback(() => {
    let total = 0;
    producto.forEach((item) => {
      total += item.precio * item.cantidad;
    });
    setTotal(total);
  }, [producto]);

  // Function to handle product changes
  const handleProductosChange = (productos) => {
    setProductos(productos);
  };

  //funcion para verificar si todos los productos tienen un total mayor a 0
  const verificarTotal = (productos) => {
    let totalMayorACero = true;

    for (let i = 0; i < productos.length; i++) {
      if (productos[i].cantidad === 0) {
        totalMayorACero = false;
        break; // Sale del bucle si la cantidad es 0
      }
    }

    return totalMayorACero;
  };

  // Update total price when product changes
  useEffect(() => {
    updateTotal();
  }, [producto, updateTotal]);

  // Fetch prices for selected client
  const fetchPreciosEspeciales = async (selectedCliente, token) => {
    try {
      const preciosEspecialesData = await infoPreciosClienteEspecial(
        selectedCliente,
        token
      );
      setPreciosEspeciales(preciosEspecialesData);
    } catch (error) {
      console.error("Error al obtener los precios especiales:", error);
    }
  };

  const handleCliente = async (e) => {
    const selec = e.value;
    if (selec === "Selecciona un cliente") {
      setSelectedCliente(selec);
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
    setSelectedCliente(selec);
    // Find the selected client object
    const selectedCliente = cliente.find((item) => item.negocio === selec);
    setSelectedItem(selectedCliente);

    // Fetch prices for the selected client
    fetchPreciosEspeciales(selectedCliente.id, token);
    setPreciosEspeciales(preciosEspeciales);
  };

  return (
    <>
      {!facturaDisponible && (
        <div
          className="FacturaInfo"
          style={{ overflowY: "scroll", maxHeight: "450px" }}
        >
          <div className="FacturaInfo__header">
            <img
              src={logo}
              alt="logo"
              style={{ width: "50px", height: "50px" }}
            />
            <h1>Bolsas Romy</h1>
          </div>
          <div className="factInfo">
            {/* Title */}
            <div className="FacturaInfo__title"></div>
            {selectedCliente && producto.length > 0 && (
              // <PDFDownloadLink document={<FacturaPdf></FacturaPdf>} fileName="FACTURA">
              //   <button className="boton-flotante" onClick={crearFactura}>
              //     Crear factura
              //   </button>
              // </PDFDownloadLink>
              <button className="boton-flotante" onClick={crearFactura}>
                Crear factura
              </button>
            )}
            {/* Information */}
            <div className="FacturaInfo__info">
              <div className="FacturaInfo__info__fecha">
                <p>{fechaActual}</p>
              </div>
              <div className="FacturaInfo__info__cliente">
                <p>
                  Cliente:{" "}
                  {/* <select  className= "Select" value={selectedCliente} onChange={handleCliente}>
                    <option>Selecciona un cliente</option>
                    {uniqueNames.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select> */}
                </p>
                <Select
                  className="Select"
                  value={
                    selectedCliente
                      ? { value: selectedCliente, label: selectedCliente }
                      : { value: 'default', label: 'Selecciona un cliente' } // Valor por defecto
                  }
                  onChange={handleCliente}
                  options={uniqueNames.map((item) => ({ value: item, label: item }))}
                  styles={{
                    menu: (provided, state) => ({
                      ...provided,
                      position: 'absolute',
                      zIndex: 9999, // Asegura que el menú aparezca por encima de otros elementos
                      width: 'auto', // Ancho automático para adaptarse al contenido
                    }),
                  }}
                />
              </div>
              {/* Selected client details */}
              {selectedItem && (
                <>
                  <div className="FacturaInfo__info__duenio">
                    <p>Dueño: {selectedItem.duenio}</p>
                  </div>
                  <div className="FacturaInfo__info__direccion">
                    <p>Dirección: {selectedItem.direccion}</p>
                  </div>
                  <div className="FacturaInfo__info__telefono">
                    <p>Teléfono: {selectedItem.telefono}</p>
                  </div>
                  <div className="FacturaInfo__info__barrio">
                    <p>Barrio: {selectedItem.barrio}</p>
                  </div>
                </>
              )}
              <div className="FacturaInfo__info__total">
                {/* Total price */}
                <p>Total: ${total}</p>
              </div>
            </div>
          </div>
          {/* Product table */}
          <div className="FacturaInfo__table">
            {isOpen && (
              <BasicTable
                onProductosChange={handleProductosChange}
                preciosEspeciales={preciosEspeciales}
                isSelected={selectedCliente}
              />
            )}
          </div>

          {/* Componente Notificacion para mostrar mensajes */}
          <Notificacion
            mensaje={mensajeNotificacion}
            tipoNotificacion={tipoNotificacion}
            mostrarNotificacion={mostrarNotificacion}
          />
        </div>
      )}
      {facturaDisponible && (
        <div className="contenedor">
          <button onClick={handlePrint}>Cerrar</button>
          <div
            style={{ width: "100vw", height: "100vh", flexDirection: "column" }}
          >
            <PDFViewer  key={forceRender} style={{ width: "80%", height: "100%" }}>
              <FacturaPdf key={forceRender} factura={facturaToPDF} />
            </PDFViewer>
          </div>
        </div>
      )}
    </>
  );
};

const formatDateToYYYYMMDD = (date) =>{
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayOfWeek} ${day} de ${month} del ${year}`;
}

function fecharHoyMañana() {
  const hoy = new Date();
  const manana = new Date(hoy);
  manana.setDate(hoy.getDate() + 1);

  const formatoFecha = fecha => {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fechaHoyFormateada = formatoFecha(hoy);
  const fechaMananaFormateada = formatoFecha(manana);

  return [fechaHoyFormateada, fechaMananaFormateada];
}

export default FacturaInfo;
