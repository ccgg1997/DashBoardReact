import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cliente: [], // Estado inicial de los clientes
};

export const clientesSlice = createSlice({
  name: "clientes",
  initialState,
  reducers: {
    setCliente: (state, action) => {
      state.cliente = action.payload;
    },
  },
});

export const { setCliente } = clientesSlice.actions;

export default clientesSlice.reducer;