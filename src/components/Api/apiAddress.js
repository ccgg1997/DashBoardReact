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
  } catch (error) {
    throw new Error("Error al obtener la información del inventario");
  }
};

export const infoClientes = async (token) => {
  const infoClientesAddress = apiAddress + "/negocio";
  try {
    console.log("estamos en cleinte");
    const response = await axios.get(infoClientesAddress, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener la información de los clientes:", error);
  }
};

export const crearCliente = async (data, token) => {
  const crearClienteAddress = apiAddress + "/negocio";
  try {
    console.log(data, token, "en agregar front cleinte");
    const response = await axios.post(crearClienteAddress, data, {
      headers: {
        "x-access-token": token,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear el cliente");
  }
};

export const eliminarCliente = async (id, token) => {
  const eliminarClienteAddress = apiAddress + "/negocio/" + id;
  try {
    const response = await axios.delete(eliminarClienteAddress, {
      headers: {
        "x-access-token": token,
      },  
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el cliente");
  }
};

export const editarCliente = async (id, data, token) => {
  const editarClienteAddress = apiAddress + "/negocio/" + id;
  try {
    const response = await axios.put(editarClienteAddress, data, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al editar el cliente");
  }
};

export const infoPrecios = async (token) => {
  const infoPreciosAddress = apiAddress + "/listaprecios";
  try {
    const response = await axios.get(infoPreciosAddress, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener la información de los precios");
  }
};

export const createCookie = (name, value, days = 0.15) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
};
