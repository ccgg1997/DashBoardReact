import { createSlice } from "@reduxjs/toolkit";
//import { useState } from "react";

const initialState = {
  token: null,
  usuario: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.token = action.payload.token;
      state.usuario = action.payload.usuario;
      state.isAuthenticated = true;
    },
    clearAuthData: (state) => {
        state.token = null;
        state.usuario = null;
        state.isAuthenticated = false;
        }   
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
