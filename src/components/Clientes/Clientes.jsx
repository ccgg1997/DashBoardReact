import React from "react";
import "./Clientes.css";
import Tabs from "../Basicos/Tabs/Tabs";
import { TabsData } from "./ClientesTabsData";
const Clientes = () => {
  //console.log(clientes)
  return (
    <div className="Clientes">
      <h1>Clientes</h1>
      <Tabs tabs={TabsData} />
    </div>
  );
};

export default Clientes;
