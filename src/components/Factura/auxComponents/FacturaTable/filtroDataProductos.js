export const filtroDataProductos = (productos) => {
    const productos2 = productos.map((producto) => {
      return {
        id: producto.product_id,
        nombre: producto.nombre,
      };
    })

    if (!productos2 || productos2.length === 0) {
      return { encabezados: [], valoresTable: [] };
    }
  
    const encabezados = Object.keys(productos2[0]).map((key) => {
      return {
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: key === "id" ? 100 : 150,
        type: typeof productos2[0][key] === "number" ? "number" : undefined,
      };
    });
  
    const valoresTable = productos2.map((producto, index) => {
      return {
        id: index,
        ...producto,
      };
    });
  
    return { encabezados, valoresTable };
  };
  
    