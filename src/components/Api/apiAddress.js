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
    throw new Error(
      "Error al obtener la información de las ordenes de producción (funciones apiAdress.js):",
      error
    );
  }
};

export const crearProduccion = async (data, token) => {
  const crearProduccionAddress = apiAddress + "/produccion/recibirMaterial";
  try {
    const response = await axios.post(crearProduccionAddress, data, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al crear la orden de producción");
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
    throw new Error(
      "Error al obtener la información de las familias (funciones apiAdress.js):",
      error
    );
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
};

export const movEntreBodegas = async (data, token) => {
  const movEntreBodegasAddress = apiAddress + "/produccion/movientrebodega";
  try {
    const response = await axios.post(movEntreBodegasAddress, data, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el movimiento");
  }
};

export const crearInventario = async (data, token) => {
  const crearInventarioAddress = apiAddress + "/inventario";
  try {
    const response = await axios.post(crearInventarioAddress, data, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
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
    const response = await axios.post(crearClienteAddress, data, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
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
  const infoPreciosClienteEspecialAddress = apiAddress + "/listaprecios/" + id;
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

export const cambiarPrecioClienteEspecial = async (token, product_id, data) => {
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

export const cambiarPrecioTodos = async (token, product_id, data) => {
  const cambiarPrecioTodosAddress =
    apiAddress + "/products/updateAllPriceProductos/" + product_id;
  try {
    const response = await axios.put(cambiarPrecioTodosAddress, data, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
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
    return "check";
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

export const infoPersonas = async (token) => {
  const infoPersonasAddress = apiAddress + "/persona";
  try {
    const response = await axios.get(infoPersonasAddress, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener la información de las personas");
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

//------------------------------------FACTURA VENTA------------------------------------

export const createFactura = async (data, token) => {
  const createFacturaAddress = apiAddress + "/factura";
  try {
    const response = await axios.post(createFacturaAddress, data, {
      headers: {
        "x-access-token": token,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear la factura");
  }
};

export const searchFactura = async (id, token) => {
  const searchFacturaAddress = apiAddress + "/factura/" + id;
  try {
    const response = await axios.get(searchFacturaAddress, {
      headers: {
        "x-access-token": token,
      },
    });
    if (response.data.message === "el id de factura ingresado no existe") {
      return response.data;
    }
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Error al buscar la factura");
    }
  }
};

//funcion para buscar factura por intervalo de fechas
export const searchFacturaByDate = async (data, token) => {
  const fechaInicio = data.fechainicio;
  const fechaFin = data.fechafin;
  const searchFacturaByDateAddress =
    apiAddress + "/factura/" + fechaInicio + "/" + fechaFin;
  try {
    const response = await axios.get(searchFacturaByDateAddress, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Error al buscar la factura");
    }
  }
};

//funcion para buscar factura por intervalo de 3 meses atras
export const searchFacturaByLast3Months = async (token) => {
  const searchFacturaBy3lastMonthsAddress = apiAddress + "/factura/last3Months";
  try {
    const response = await axios.get(searchFacturaBy3lastMonthsAddress, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Error al buscar la factura");
    }
  }
};

export const deleteFactura = async (id, token) => {
  const deleteFacturaAddress = apiAddress + "/factura/" + id;
  try {
    const response = await axios.delete(deleteFacturaAddress, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Error al eliminar la factura");
    }
  }
};

// -------------------------------------EVENTOS ---------------------
export const infoEventos = async (token) => {
  const infoEventosAddress = apiAddress + "/eventos/";
  try {
    const response = await axios.get(infoEventosAddress, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Error al obtener la información de los eventos");
    }
  }
};

export const createEvento = async (data, token) => {
  const createEventoAddress = apiAddress + "/eventos/";
  try {
    const response = await axios.post(createEventoAddress, data, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Error al crear el evento");
    }
  }
};

export const deleteEvento = async (id, token) => {
  const deleteEventoAddress = apiAddress + "/eventos/" + id;
  try {
    const response = await axios.delete(deleteEventoAddress, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Error al eliminar el evento");
    }
  }
};

// -----------------------------------PRODUCCION/INVENTARIO-----------------------------------
