import React from 'react'
import './Produccion.css'

import ProduccionTableFilter from './AuxComponents/ProduccionTableFilter/ProduccionTableFilter'
import ProduccionCards from './AuxComponents/ProduccionCards/ProduccionCards'

export const Produccion = () => {
  return (
    <div className="Produccion">
        <ProduccionCards/>
        <ProduccionTableFilter/>
    </div>
  )
}

export default Produccion