import React from "react";
import "./Analytics.css";
import { searchFacturaByDate } from "../Api/apiAddress";
import Notificacion from "../Basicos/Notificacion/Notificacion";
import { useSelector } from "react-redux";
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


  const handleChangefechainicio = (e) => {
    setFechainicio(e.target.value);
  };

  const handleChangefechafin = (e) => {
    setFechafin(e.target.value);

  };

  const onClick = async () => {
    if (fechainicio === "" || fechafin === "") {
      setMensaje("Por favor ingrese una fecha", "error");
      return;
    }    
    try {

      if(fechainicio > fechafin){
        setMensaje("La fecha de inicio no puede ser mayor a la fecha fin", "error");
        return;
      }

      const data = {
        fechainicio,
        fechafin,
      }
      

      const res = await searchFacturaByDate(data, token);
      setDataToGraph(res.data);


    } catch (error) {
      console.log(error);
    }
  };

  // Oculta la notificación después de que se muestra
  React.useEffect(() => {
    if (mostrarNotificacion) {
      setMostrarNotificacion(false);
    }
  }, [mostrarNotificacion]);


  return (
    <div className="Analytics">
      <div className="Analytics__title">
        <h1>Analytics</h1>
      </div>
      <div className="Analytics__chart">
        <div className="Analytics__chart__title">
        fecha inicio:{" "}
        <p>
        <input
          type="date"
          value={fechainicio}
          onChange={handleChangefechainicio}
          />
          </p>
        </div>
        <div className="Analytics__chart__title">
        fecha fin:{" "}
        <p>

        <input
          type="date"
          value={fechafin}
          onChange={handleChangefechafin}
          />
          </p>
        </div>
        
        <button onClick={onClick}>Buscar</button>
      </div>
      <Notificacion
        mensaje={mensajeNotificacion}
        tipoNotificacion={tipo}
        mostrarNotificacion={mostrarNotificacion}
      />
    </div>
  );
};


  /*
  let base = +new Date(1968, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let date = [];
  let data = [Math.random() * 300];
  let option;
  for (let i = 1; i < 20000; i++) {
    var now = new Date((base += oneDay));
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  }
  option = {
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"];
      },
    },
    title: {
      left: "center",
      text: "Large Area Chart",
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: date,
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 10,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    series: [
      {
        name: "Data",
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: "rgb(255, 70, 131)",
        },
        areaStyle: {
          color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [            {
              offset: 0,
              color: "rgb(255, 158, 68)",
            },
            {
              offset: 1,
              color: "rgb(255, 70, 131)",
            },
          ]),
        },
        data: data,
      },
    ],
  };

  return (
    <div className="Analytics">
      <div className="Analytics__title">
        <h1>Analytics</h1>
      </div>
      <div className="Analytics__chart">
        <ReactEcharts
          option={option}
          style={{ height: "100%", width: "100%" }}
          className="react_for_echarts"
        />
      </div>
    </div>
  );
};*/

export default Analytics;
