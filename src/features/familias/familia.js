import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  familia: [], // Estado inicial de los familias
};

export const familiaSlice = createSlice({
  name: "familia",
  initialState,
  reducers: {
    setFamilia: (state, action) => {
      state.familia = action.payload;
    },
  },
});

export const { setFamilia } = familiaSlice.actions;

export default familiaSlice.reducer;