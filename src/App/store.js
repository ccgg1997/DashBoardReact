import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth";
import inventarioReducer from "../features/inventario/inventario";
import clientesReducer from "../features/clientes/clientes";
import preciosReducer from "../features/precios/precios";
import familiaReducer from "../features/familias/familia";
import produccionReducer from "../features/ordenesproduccion/ordenesproduccion";
import bodegaReducer from "../features/bodega/bodega";
import productoReducer from "../features/productos/producto";
import personaReducer from "../features/persona/persona";
import facturasHoyReducer from "../features/facturasHoy/facturasHoy";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    inventario: inventarioReducer,
    clientes: clientesReducer,
    precios: preciosReducer,
    familia: familiaReducer,
    produccion: produccionReducer,
    bodega: bodegaReducer,
    producto: productoReducer,
    persona: personaReducer,
    facturasHoy: facturasHoyReducer,
  },
  
});
