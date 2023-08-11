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

/**
 * Analytics component displays a chart and a table of sales data.
 * It allows the user to filter the data by different time periods and shows a notification message.
 *
 * @returns {JSX.Element} The rendered Analytics component.
 */
const Analytics = () => {
  const [mostrarNotificacion, setMostrarNotificacion] = React.useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [dataToGraph, setDataToGraph] = React.useState({
    clientes: [],
    ventasDia: [{ fechas: [], ventas: [] }],
  });

  //traemos los datos de reducer de analytics y ordenamos por fecha
  const infoVentas = useSelector((state) => state.analytics);

  const periodo60_90 = infoVentas.infoVentas[0];
  const periodo30_60 = infoVentas.infoVentas[1];
  const periodo1_30 = infoVentas.infoVentas[2];
  const completo = infoVentas.infoVentas[3];

  const nombre = "Ventas";
  const encabezados = [
    { field: "_id", headerName: "Cliente" },
    { field: "total", headerName: "valorVenta" },
  ];
  const ventas = dataToGraph.clientes;

  const setMensaje = (mensaje, tipo) => {
    setMostrarNotificacion(true);
    setMensajeNotificacion(mensaje);
    setTipo(tipo);
  };

  //funcion para filtrar los datos por periodo utilizando useCallback para evitar renderizado innecesario
  const handleFiltro = React.useCallback(
    async (ide) => {
      switch (ide) {
        case 1:
          setDataToGraph(periodo1_30);
          break;
        case 2:
          setDataToGraph(periodo30_60);
          break;
        case 3:
          setDataToGraph(periodo60_90);
          break;
        case 4:
          setDataToGraph(completo);
          break;
        default:
          break;
      }
    },
    [periodo1_30, periodo30_60, periodo60_90, completo]
  );

  // Oculta la notificación después de que se muestra
  React.useEffect(() => {
    if (mostrarNotificacion) {
      setMostrarNotificacion(false);
    }
  }, [mostrarNotificacion]);

  React.useEffect(() => {
    handleFiltro(4);
  }, [handleFiltro]);
  //configuracion del grafico utilizando useMemo para evitar renderizado innecesario
  const dataOptions = React.useMemo(() => {
    return {
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
        categories: dataToGraph.ventasDia[0].fechas,
      },
    };
  }, [dataToGraph]);

  const series = React.useMemo(() => {
    if (
      dataToGraph &&
      dataToGraph.ventasDia &&
      dataToGraph.ventasDia.length > 0 &&
      dataToGraph.ventasDia[0].totales
    ) {
      return [
        {
          name: "Expenses",
          data: dataToGraph.ventasDia[0].totales,
        },
      ];
    }
    return [];
  }, [dataToGraph]);

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
          <Chart series={series} type="area" options={dataOptions} />

          <div className="tabla">
            <TableFilter
              nombre={nombre}
              nombreColumnas={encabezados}
              datosFilas={ventas}
            />
          </div>
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
