import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  produccion: [], // Estado inicial de los produccion
};

export const produccionSlice = createSlice({
  name: "produccion",
  initialState,
  reducers: {
    setProduccion: (state, action) => {
      state.produccion = action.payload;
    },
  },
});

export const { setProduccion } = produccionSlice.actions;

export default produccionSlice.reducer;