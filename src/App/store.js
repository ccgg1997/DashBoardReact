import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth";
import inventarioReducer from "../features/inventario/inventario";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    inventario: inventarioReducer,
  },
  
});
