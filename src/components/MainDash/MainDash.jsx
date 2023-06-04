import React from "react";
import "./MainDash.css";
import Cards from "./AuxMainDash/Cards/Cards";
import Table from "../Basicos/Table/Table";
import RightSide from "../Basicos/RightSide/RightSide";
import { useSelector } from "react-redux";
import Update from "./AuxMainDash/Update/Update";
import CustomerReview from "./AuxMainDash/CustomerReview/CustomerReview";

const MainDash = () => {
  //OBTENER INVENTARIO DEL REDUCER
  const { inventario } = useSelector((state) => state.inventario);
  const { isAuthenticated, token, name, usuario, timeExp, rol } = useSelector(
    (state) => state.auth
  );

  console.log(isAuthenticated, token, name, usuario, timeExp, rol, inventario);

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
            extraInfo={<CustomerReview />}
            title1={"NOTICIAS"}
            title2={"PRODUCCION"}
          />
        </div>
      </div>
    </>
  );
};

export default MainDash;
