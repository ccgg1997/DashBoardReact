import React from "react";
import "./ClientesInfo.css";
import { useSelector } from "react-redux";
import { clientesDataTable } from "./TableFilterData";
import TableFilter from "../../../Basicos/TableFilter/TableFilter";
import ClienteCards from "../ClienteCards/ClienteCards";
import {CardsData} from '../ClienteCards/CardsData'

const ClientesInfo = () => {

  //sacando los datos de la variable global
  const clientes  = useSelector((state) => state.clientes);
  const { encabezados, valoresTable } = clientesDataTable(clientes);


  return <div className="ClientesInfo">
    <ClienteCards CardsData={CardsData}/>
    <TableFilter nombre={"CLIENTES"}
        nombreColumnas={encabezados}
        datosFilas={valoresTable} />
  </div>;
};

export default ClientesInfo;
