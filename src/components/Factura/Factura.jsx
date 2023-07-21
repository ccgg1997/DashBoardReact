import React from 'react'
import './Factura.css'
import { FacturaTabsData } from './FacturaTabsData'
import Tabs from "../Basicos/Tabs/Tabs";

const Factura = () => {

  return (
    <div className="FacturaInfo">
          <div className="FacturaInfo__title">
              <h1>Factura</h1>
          </div>
          <Tabs tabs={FacturaTabsData} />
      </div>
  )
}

export default Factura