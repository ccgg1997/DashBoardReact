import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infoVentas: [],

}

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setInfoVentas(state, action) {
      state.infoVentas = action.payload;
    }
  }
});

export const { setInfoVentas } = analyticsSlice.actions;

export default analyticsSlice.reducer;