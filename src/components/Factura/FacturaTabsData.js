import React from "react";
import FacturaInfo from "./auxComponents/FacturaInfoCliente/FacturaInfoCliente";
import BuscarFactura from "./auxComponents/BuscarFactura/BuscarFactura";

export const FacturaTabsData = [
    { name: 'Factura', component: <FacturaInfo/> },
    { name: 'Buscar', component: <BuscarFactura/> },
    
]

