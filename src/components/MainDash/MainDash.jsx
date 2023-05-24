import React from "react";
import "./MainDash.css";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import RightSide from "../RightSide/RightSide";
import { useSelector } from "react-redux";

const MainDash = () => {
  //OBTENER INVENTARIO DEL REDUCER
  const { inventario } = useSelector((state) => state.inventario);
  const { isAuthenticated,token,name,usuario,timeExp,rol } = useSelector(state => state.auth);
  
  console.log(isAuthenticated,token,name,usuario,timeExp,rol,inventario);

  //DEFINIR QUE DATOS DEL INVENTARIO QUIERO EN LA TABLA
  const nuevaLista = inventario.map((objeto) => {
    return {
      ProductId: objeto.productoId,
      BodegaId: objeto.bodegaId,
      Familia: objeto.familiaNombre,
      Cantidad: objeto.cantidad
    };
  });

  //SACAR LOS HEADS DE LA LISTA INVENTARIO
  const heads = nuevaLista.length > 0 ? Object.keys(nuevaLista[0]).map((head) => ({ [head]: head })) : [];

  return (
    <>
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      
      <Table data={nuevaLista} heads={heads} isInventario={true} limite={5000} title={"Recent Orders"} />
    </div>
    <RightSide />
    </>
  );
};

export default MainDash;
