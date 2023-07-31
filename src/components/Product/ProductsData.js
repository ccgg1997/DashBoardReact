import React from 'react'
import {InventarioTableFilter} from './auxComponents/InventarioTableFilter/InventarioTableFilter'
import {Precios} from './auxComponents/Precios/Precios'
import {Produccion} from './auxComponents/Produccion/Produccion'

export  const TabsData = [
    { name: 'Inventario', component: <InventarioTableFilter/> },
    { name: 'Produccion', component: <Produccion/> },
    { name: 'Precios ', component: <Precios/> },
]

