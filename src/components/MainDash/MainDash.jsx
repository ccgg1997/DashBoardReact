import React, { useEffect } from "react";
import "./MainDash.css";
import Cards from "./AuxMainDash/Cards/Cards";
import Table from "../Basicos/Table/Table";
import RightSide from "../Basicos/RightSide/RightSide";
import { useSelector } from "react-redux";
import Update from "./AuxMainDash/Update/Update";
import { infoInventario } from "../Api/apiAddress";
import { setInventario } from "../../features/inventario/inventario";
import { useDispatch } from "react-redux";
import { useState } from "react";

const MainDash = () => {
  //OBTENER INVENTARIO DEL REDUCER
  const { token } = useSelector((state) => state.auth);
  const { inventario } = useSelector((state) => state.inventario);
  const [mostrarDashBoard, setMostrarDashBoard] = useState(false);
  const [cargando, setCargando] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (inventario.length === 0) {
          // Verifica si los datos ya se han cargado
          const responseInventario = await infoInventario(token);
          dispatch(setInventario(responseInventario));
        }
        setCargando(false);
        setMostrarDashBoard(true);
      } catch (error) {
        console.error("Error al obtener los datos del inventario:", error);
        setCargando(false);
      }
    };
    fetchData();
  }, [token, dispatch, inventario.length]);

  //DEFINIR QUE DATOS DEL INVENTARIO QUIERO EN LA TABLA
  const nuevaLista = inventario.map((objeto) => {
    return {
      ProductId: objeto.productoId,
      BodegaId: objeto.bodegaId,
      Familia: objeto.familiaNombre,
      Cantidad: objeto.cantidad,
    };
  });

  //SACAR LOS HEADS DE LA LISTA INVENTARIO
  const heads =
    nuevaLista.length > 0
      ? Object.keys(nuevaLista[0]).map((head) => ({ [head]: head }))
      : [];

  return (
    <>
      {cargando && (
        <div className="loading">
          <div className="loadingText">
            <ActivityIcon className="iconLoading" />
            <h2 className="cargandoGraficas">
              Cargando gráficas de inventario...
            </h2>
            <p className="espere">
              Por favor, espere un momento mientras procesamos su información.
            </p>
          </div>
        </div>
      )}

      {mostrarDashBoard && (
        <div className="mainDashContainer">
          <div className="MainDash">
            <h1>Dashboard</h1>
            <Cards />
            <div className="tablecontainer">
              <Table
                data={nuevaLista}
                heads={heads}
                isInventario={true}
                limite={5000}
                title={"Recent Orders"}
              />
            </div>
          </div>
          <div className="rightsidecontainer">
            <RightSide
              updatesComponent={<Update />}
              title1={"ACTIVIDADES DEL DIA"}
            />
          </div>
        </div>
      )}
    </>
  );
};

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

export default MainDash;
