import React from 'react'
import {InventarioTableFilter} from './auxComponents/InventarioTableFilter/InventarioTableFilter'
import {Precios} from './auxComponents/Precios/Precios'

export  const TabsData = [
    { name: 'Inventario', component: <InventarioTableFilter/> },
    { name: 'Producción ', component: <Precios/> },
]

