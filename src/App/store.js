import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth";
import inventarioReducer from "../features/inventario/inventario";
import clientesReducer from "../features/clientes/clientes";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    inventario: inventarioReducer,
    clientes: clientesReducer,
  },
  
});
