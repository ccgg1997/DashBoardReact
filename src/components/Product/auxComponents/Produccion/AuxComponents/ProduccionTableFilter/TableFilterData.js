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
      ({personaId,nombrePersona,familiaNombre, productoId, cantidad, estilos, cantidadRecibida, fechaInicial}) => {
        const estilosReducidos = estilos.reduce((acc, estilo) => {
          acc[estilo.nombre.replace(/ /g, "")] = (estilo.cantidad-estilo.cantidadRecibida);
          return acc;
        }, {});

        const uniqueId = generateUniqueId();

        return {
          id: uniqueId,
          PersonaId: personaId,
          Nombre: nombrePersona,
          Fecha: fechaInicial,
          CantidadInicial: cantidad,
          cantidadRecibida: cantidadRecibida,
          nombrePersona:nombrePersona,
          ProductId: productoId,
          Familia: familiaNombre,
          ...estilosReducidos,
        };
      }
    );

    const nombresKeys = Object.keys(nuevaLista[0]).map((key) => {
      return {
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: key === "id" ? 15 : 3,
        type: typeof nuevaLista[0][key] === "number" ? "number" : undefined,
      };
    });
    const result = { nombresKeys, nuevaLista };
    cache.set(cacheKey, result);

    console.log("retornando lista filtrada filtradita:", nuevaLista);
    return result;
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
