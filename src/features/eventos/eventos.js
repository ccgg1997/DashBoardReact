import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventos: [], // Estado inicial de los eventos
};

export const eventosSlice = createSlice({
  name: "eventos",
  initialState,
  reducers: {
    setEventos: (state, action) => {
      state.eventos = action.payload;
    },
  },
});

export const { setEventos } = eventosSlice.actions;

export default eventosSlice.reducer;