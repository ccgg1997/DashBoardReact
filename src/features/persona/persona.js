import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  persona: [], // Estado inicial de los familias
};

export const personaSlice = createSlice({
  name: "persona",
  initialState,
  reducers: {
    setPersona: (state, action) => {
      state.persona = action.payload;
    },
  },
});

export const { setPersona } = personaSlice.actions;

export default personaSlice.reducer;