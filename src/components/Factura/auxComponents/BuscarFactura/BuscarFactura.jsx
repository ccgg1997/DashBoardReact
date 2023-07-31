import React,{useState,useEffect} from "react";
import "./BuscarFactura.css";
import { TextField,Button } from "@mui/material";
import Notificacion from "../../../Basicos/Notificacion/Notificacion";
import { searchFactura } from "../../../Api/apiAddress";
import { useSelector } from "react-redux";
import BasicTable from "../FacturaTable/FacturaTable";

const BuscarFactura = () => {
  const [idFactura, setIdFactura] = React.useState("");
  const [factura , setFactura] = useState({});
  const [detalleFactura, setDetalleFactura] = useState([]);
  const [facturaInfo, setFacturaInfo] = useState({});
  const [negocioInfo, setNegocioInfo] = useState({});

  const [isInfoFactura, setIsInfoFactura] = useState(false);

   // Estado local para mostrar notificaciones
   const [mensajeNotificacion, setMensajeNotificacion] = useState("");
   const [tipoNotificacion, setTipoNotificacion] = useState("");
   const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

   const token = useSelector((state) => state.auth.token);

  const onClick = async() => {

    if(idFactura === "") {
      setMensaje("Ingrese un id de factura", "error");
    }else{
      try{

        const factura = await searchFactura(idFactura,token);
        if(factura.message === "el id de factura ingresado no existe"){
          setMensaje(factura.message, "error");
        }else{
          setMensaje("Factura encontrada", "success");
          setIsInfoFactura(true);
          setFactura(factura);
          setDetalleFactura(factura.detalleFactura);
          setFacturaInfo(factura.factura);
          setNegocioInfo(factura.negocio);

        }
      }catch(error){
        setMensaje(error.message, "error");
      }
    }
  }

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
      <div className="BuscarFacturaInfo__info">
        <TextField id="outlined-basic" onChange={handleChange} label="Id de la factura" variant="outlined"  />
        </div>
        <div className="BuscarFacturaInfo__boton">
        <Button variant="contained" onClick={onClick}>Buscar</Button>
      </div>
          { isInfoFactura && factura &&
      <div className="BuscarFacturaInfo__info">
        <div className="BuscarFacturaInfo__info__fecha">

          <p>{}</p>
        </div>
        <div className="BuscaracturaInfo__info__cliente">
          <p>
            Cliente:{" "}
            {negocioInfo.negocio}
            <div className="BuscarFacturaInfo__info__duenio">
              <p>Dueño: {negocioInfo.duenio}</p>
            </div>
          </p>
        </div>
      
        {/* Selected client details */}
          <>
            <div className="BuscarFacturaInfo__info__direccion">
              <p>Dirección: {negocioInfo.direccion}</p>
            </div>
            <div className="BuscarFacturaInfo__info__telefono">
              <p>Teléfono: {negocioInfo.telefono}</p>
            </div>
            <div className="BuscarFacturaInfo__info__barrio">
              <p>Barrio: {negocioInfo.barrio}</p>
            </div>
          </>
        <div className="BuscarFacturaInfo__info__total">
          {/* Total price */}
          <p>Total: ${facturaInfo.total}</p>
        </div>
      </div>
      }
      {/* Product table */}
      <div className="BuscarFacturaInfo__table">

      </div>

      <Notificacion
        mensaje={mensajeNotificacion}
        tipoNotificacion={tipoNotificacion}
        mostrarNotificacion={mostrarNotificacion}
      />
    </div>
  );
};

export default BuscarFactura;
