import React from "react";
import "./Analytics.css";
import Notificacion from "../Basicos/Notificacion/Notificacion";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Chart from "react-apexcharts";
import TableFilter from "../Basicos/TableFilter/TableFilter";

//definir botones para filtrado
const botones = [
  { id: 1, nombre: "1-30 dias" },
  { id: 2, nombre: "30-60 dias" },
  { id: 3, nombre: "60-90 dias" },
  { id: 4, nombre: "ver completo" },
];

const ventas = [
  { id: 1, cliente: "Cliente 1", valorVenta: 1200 },
  { id: 2, cliente: "Cliente 2", valorVenta: 800 },
  { id: 3, cliente: "Cliente 3", valorVenta: 1500 },
  { id: 4, cliente: "Cliente 4", valorVenta: 900 },
  { id: 5, cliente: "Cliente 5", valorVenta: 1300 },
  { id: 6, cliente: "Cliente 6", valorVenta: 700 },
  { id: 7, cliente: "Cliente 7", valorVenta: 1600 },
  { id: 8, cliente: "Cliente 8", valorVenta: 1100 },
  { id: 9, cliente: "Cliente 9", valorVenta: 1800 },
  { id: 10, cliente: "Cliente 10", valorVenta: 950 },
];

const nombre = "Ventas";
const encabezados = [
  { field: "cliente", headerName: "Cliente" },
  { field: "valorVenta", headerName: "valorVenta" },
];
const Analytics = () => {
  const [fechainicio, setFechainicio] = React.useState("");
  const [fechafin, setFechafin] = React.useState("");
  const [mostrarNotificacion, setMostrarNotificacion] = React.useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [dataToGraph, setDataToGraph] = React.useState([]);

  const { token } = useSelector((state) => state.auth);

  const setMensaje = (mensaje, tipo) => {
    setMostrarNotificacion(true);
    setMensajeNotificacion(mensaje);
    setTipo(tipo);
  };

  const handleFiltro = async (ide) => {
    if (ide === 1 || fechafin === "") {
      setMensaje("Estamo aplicando filtro de rango: #" + ide, "error");
      return;
    }
  };

  // Oculta la notificación después de que se muestra
  React.useEffect(() => {
    if (mostrarNotificacion) {
      setMostrarNotificacion(false);
    }
  }, [mostrarNotificacion]);

  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#fff"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2021-09-01T00:00:00.000Z",
          "2021-09-01T01:30:00.000Z",
          "2021-09-01T02:30:00.000Z",
          "2021-09-01T03:30:00.000Z",
          "2021-09-01T04:30:00.000Z",
          "2021-09-01T05:30:00.000Z",
          "2021-09-01T06:30:00.000Z",
        ],
      },
    },
  };
  const series = [
    {
      name: "Expenses",
      data: [10, 100, 50, 70, 80, 30],
    },
  ];
  return (
    <div className="Analytics">
      <h1>Facturas por fecha</h1>
      <div className="botones">
        {botones.map((boton) => {
          return (
            <Button
              key={boton.id}
              variant="contained"
              sx={{ margin: "10px" }}
              onClick={() => handleFiltro(boton.id)}
            >
              {boton.nombre}
            </Button>
          );
        })}
      </div>
      <div className="contenedorGrafico">
        <div className="grafico">
          <Chart series={series} type="area" options={data.options} />
        </div>
        <div className="tabla">
          <TableFilter
            nombre={nombre}
            nombreColumnas={encabezados}
            datosFilas={ventas}
          />
        </div>
      </div>

      <Notificacion
        mensaje={mensajeNotificacion}
        tipoNotificacion={tipo}
        mostrarNotificacion={mostrarNotificacion}
      />
    </div>
  );
};

export default Analytics;
