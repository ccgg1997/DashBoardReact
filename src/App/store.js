import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth";
import inventarioReducer from "../features/inventario/inventario";
import clientesReducer from "../features/clientes/clientes";
import preciosReducer from "../features/precios/precios";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    inventario: inventarioReducer,
    clientes: clientesReducer,
    precios: preciosReducer,

  },
  
});
