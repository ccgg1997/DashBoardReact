import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  facturasHoy: [], // Estado inicial de los familias
};

export const facturasHoySlice = createSlice({
  name: "facturasHoy",
  initialState,
  reducers: {
    setFacturasHoy: (state, action) => {
      state.facturasHoy = action.payload;
    },
  },
});

export const { setFacturasHoy } = facturasHoySlice.actions;

export default facturasHoySlice.reducer;