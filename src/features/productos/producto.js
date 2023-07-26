import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  producto: [], // Estado inicial de las bodegas
};

export const productoSlice = createSlice({
  name: "productos",
  initialState,
  reducers: {
    setProducto: (state, action) => {
      state.producto = action.payload;
    },
  },
});

export const { setProducto } = productoSlice.actions;

export default productoSlice.reducer;