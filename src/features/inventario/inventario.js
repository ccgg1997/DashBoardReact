import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inventario: [], // Estado inicial de los inventarios
};

export const inventariosSlice = createSlice({
  name: "inventarios",
  initialState,
  reducers: {
    setInventario: (state, action) => {
      state.inventario = action.payload;
    },
  },
});

export const { setInventario } = inventariosSlice.actions;

export default inventariosSlice.reducer;