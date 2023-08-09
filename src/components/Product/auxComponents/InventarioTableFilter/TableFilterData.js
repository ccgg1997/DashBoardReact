export const functionTableData = (() => {
  const cache = new Map();
  let uniqueIdCounter = 0;

  return (inventario, filtro) => {
    const cacheKey = `${JSON.stringify(inventario)}-${filtro}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const listaFiltrada = inventario.filter(
      ({ familiaNombre }) => familiaNombre === filtro
    );
    if(listaFiltrada.length === 0) return { nombresKeys: [], nuevaLista: [] };
    const nuevaLista = listaFiltrada.map(
      ({ tipo,bodegaId, familiaNombre, productoId, cantidad, estilos,nombreProducto }) => {
        const estilosReducidos = estilos.reduce((acc, estilo) => {
          acc[estilo.nombre.replace(/ /g, "")] = estilo.cantidad;
          return acc;
        }, {});

        const uniqueId = generateUniqueId();

        return {
          id: uniqueId,
          ProductId: productoId,
          tipo:tipo,
          BodegaId: bodegaId,
          nombreProducto:nombreProducto,
          Familia: familiaNombre,
          Cantidad: cantidad,
          ...estilosReducidos,
        };
      }
    );

    const nombresKeys = Object.keys(nuevaLista[0]).map((key) => {
      return {
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: key === "id" ? 10 : 80,
        type: typeof nuevaLista[0][key] === "number" ? "number" : undefined,
      };
    });
    const result = { nombresKeys, nuevaLista };
    cache.set(cacheKey, result);

  };

  function generateUniqueId() {
    return uniqueIdCounter++;
  }
})();

export const familiasNombre = (familia) => {
  const familias = familia.map(({ nombre }) => nombre);
  const familiasUnicas = [...new Set(familias)];
  const familiasObjeto = familiasUnicas.map((familia) => ({ value: familia }));
  return familiasObjeto;
};
