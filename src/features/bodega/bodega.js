import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bodega: [], // Estado inicial de las bodegas
};

export const bodegaSlice = createSlice({
  name: "bodega",
  initialState,
  reducers: {
    setBodega: (state, action) => {
      state.bodega = action.payload;
    },
  },
});

export const { setBodega } = bodegaSlice.actions;

export default bodegaSlice.reducer;