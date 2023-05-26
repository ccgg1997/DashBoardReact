export const functionTableData = (() => {
    const cache = new Map();
    let uniqueIdCounter = 0;
  
    return (inventario, filtro) => {
      const cacheKey = `${JSON.stringify(inventario)}-${filtro}`;
  
      if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
      }
  
      const listaFiltrada = inventario.filter(({ familiaNombre }) => familiaNombre === filtro);
  
      const nuevaLista = listaFiltrada.map(({ bodegaId, familiaNombre, productoId,cantidad, estilos }) => {
        const estilosReducidos = estilos.reduce((acc, estilo) => {
          acc[estilo.nombre.replace(/ /g, '')] = estilo.cantidad;
          return acc;
        }, {});
  
        const uniqueId = generateUniqueId();
  
        return {
          id: uniqueId,
          ProductId: productoId,
          BodegaId: bodegaId,
          Cantidad:cantidad,
          Familia: familiaNombre,
          ...estilosReducidos,
        };
      });
  
      const nombresKeys = Object.keys(nuevaLista[0]).map((key) => {
        return {
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          width: key==="id"?10:80,
          type: typeof nuevaLista[0][key] === 'number' ? 'number' : undefined,
        };
      });
  
      const result = { nombresKeys, nuevaLista };
      cache.set(cacheKey, result);
  
      console.log('retornando lista filtrada filtradita:', nuevaLista);
      return result;
    };
  
    function generateUniqueId() {
      return uniqueIdCounter++;
    }
  })();
  