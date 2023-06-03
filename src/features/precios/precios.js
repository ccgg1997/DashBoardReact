import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  precio: [], // Estado inicial de los precios
};

export const preciosSlice = createSlice({
  name: "precios",
  initialState,
  reducers: {
    setPrecio: (state, action) => {
      state.precio = action.payload;
    },
  },
});

export const { setPrecio } = preciosSlice.actions;

export default preciosSlice.reducer;