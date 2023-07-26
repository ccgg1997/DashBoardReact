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

//-----------------Produccion FUNCIONES-----------------
export const infoProduccion = async (token) => {
  const infoProduccionAddress = apiAddress + "/produccion";
  try {
    const response = await axios.get(infoProduccionAddress, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener la información de las ordenes de producción (funciones apiAdress.js):", error);
  }
};

//-----------------Familia FUNCIONES-----------------
export const infoFamilia = async (token) => {
  const infoFamiliaAddress = apiAddress + "/familia";
  try {
    const response = await axios.get(infoFamiliaAddress, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener la información de las familias (funciones apiAdress.js):", error);
  }
};

export const crearFamilia = async (data, token) => {
  const crearFamiliaAddress = apiAddress + "/familia";
  try {
    const response = await axios.post(crearFamiliaAddress, data, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al crear la familia");
  }
};

//--------------------INVENTARIOS--------------------
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

export const movInventario = async (data, token) => {
  const movInventarioAddress = apiAddress + "/inventario";
  try {
    const response = await axios.put(movInventarioAddress, data, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el movimiento");
  }
}

//-----------------CLIENTES FUNCIONES-----------------
export const infoClientes = async (token) => {
  const infoClientesAddress = apiAddress + "/negocio";
  try {
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


//----------------PRECIOS------------------
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

export const infoPreciosClienteEspecial = async (id, token) => {
  const infoPreciosClienteEspecialAddress =
    apiAddress + "/listaprecios/" + id;
  try { 
    const response = await axios.get(infoPreciosClienteEspecialAddress, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "Error al obtener la información de los precios del cliente especial"
    );  
  }
};


//-----------------PRODUCTOS FUNCIONES-----------------
export const infoProductos = async (token) => {
  const infoProductosAddress = apiAddress + "/products";
  try {
    const response = await axios.get(infoProductosAddress, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener la información de los productos");
  }
};

export const cambiarPrecioClienteEspecial = async (token,product_id, data, ) => {
  const cambiarPrecioClienteEspecialAddress =
    apiAddress + "/products/precioEspecialProd/" + product_id;
  try {
    const response = await axios.put(
      cambiarPrecioClienteEspecialAddress,
      data,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al cambiar el precio del cliente especial");
  }
};

export const cambiarPrecioTodos = async (token,product_id, data) => {
  const cambiarPrecioTodosAddress = apiAddress + "/products/updateAllPriceProductos/" + product_id;
  try {
    const response = await axios.put(cambiarPrecioTodosAddress, data, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  }
  catch (error) {
    throw new Error("Error al cambiar el precio de todos los productos");
  }
};

export const createProduct = async (data, token) => {
  const createProductAddress = apiAddress + "/products";
  try {
    const response = await axios.post(createProductAddress, data, {
      headers: {
        "x-access-token": token,
      },
    });
    console.log(response.data);
    return 'check';
  } catch (error) {
    throw new Error("Error al crear el producto");
  }
};

//-----------------PERSONAS --------------------------------------
export const createPersona = async (data, token) => {
  const createPersonaAddress = apiAddress + "/persona";
  try {
    const response = await axios.post(createPersonaAddress, data, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al crear la persona");
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


//-------------------bodegas-------------------------
export const infoBodegas = async (token) => {
  const infoBodegasAddress = apiAddress + "/bodega";
  try {
    const response = await axios.get(infoBodegasAddress, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener la información de las bodegas");
  }
};
// -----------------------------------PRODUCCION/INVENTARIO-----------------------------------



