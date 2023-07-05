import React from 'react'
import './Produccion.css'
import ProduccionCards from './AuxComponents/ProduccionCards/ProduccionCards'
import ProduccionTableFilter from './AuxComponents/ProduccionTableFilter/ProduccionTableFilter'

export const Produccion = () => {
  return (
    <div className="Produccion">
        <ProduccionCards/>
        <ProduccionTableFilter/>
    </div>
  )
}

export default Produccion