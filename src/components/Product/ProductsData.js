import React from 'react'
import {InventarioTableFilter} from './auxComponents/InventarioTableFilter/InventarioTableFilter'
import {Precios} from './auxComponents/Precios/Precios'
import {Produccion} from './auxComponents/Produccion/Produccion'

export  const TabsData = [
    { name: 'Inventario', component: <InventarioTableFilter/> },
    { name: 'Precios ', component: <Precios/> },
    { name: 'Produccion', component: <Produccion/> },
]

