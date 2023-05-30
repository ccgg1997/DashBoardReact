export const clientesDataTable = (clientes) => {
  const cliente =clientes.cliente;
  if (!cliente || cliente.length === 0) {
    return { encabezados: [], valoresTable: [] };
  }

  const encabezados = Object.keys(cliente[0]).map((key) => {
    return {
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      width: key === "id" ? 100 : 150,
      type: typeof cliente[0][key] === "number" ? "number" : undefined,
    };
  });

  const valoresTable = cliente.map((cliente, index) => {
    return {
      id: index,
      ...cliente,
    };
  });

  return { encabezados, valoresTable };
};

  