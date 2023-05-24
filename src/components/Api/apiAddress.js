import axios from "axios";
export const apiAddress = "http://localhost:5000/api";

export const signin = async (cedula, password) => {
    const signinAddress = apiAddress + "/users/signin";
    const data = { id: cedula, password: password };
  
    try {
      const response = await axios.post(signinAddress, data);
      return response.data;
    } catch (error) {
      throw new Error("Credenciales inválidas");
    }
  };

 export const infoInventario = async (token) => { 
   const infoInventarioAddress = apiAddress + "/inventario";
    try {
      const response = await axios.get(infoInventarioAddress, {
        headers: {
          "x-access-token": token, // Agrega el token al encabezado Authorization
        },
      });
      return response.data;
    } 
    catch (error) {
      throw new Error("Error al obtener la información del inventario");
    }
  };

  export const createCookie = (name, value, days=0.15) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  };