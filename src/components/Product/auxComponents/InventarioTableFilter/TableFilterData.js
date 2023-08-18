let uniqueIdCounter = 0;

export const functionTableData = (inventario, filtro) => {
  const listaFiltrada = inventario.filter(({ familiaNombre }) => familiaNombre === filtro);

  const nuevaLista = listaFiltrada.map(
    ({ tipo, bodegaId, familiaNombre, productoId, cantidad, estilos, nombreProducto }) => {
      const estilosReducidos = estilos.reduce((acc, estilo) => {
        acc[estilo.nombre.replace(/ /g, "")] = estilo.cantidad;
        return acc;
      }, {});

      const uniqueId = generateUniqueId();

      return {
        id: uniqueId,
        ProductId: productoId,
        tipo: tipo,
        BodegaId: bodegaId,
        nombreProducto: nombreProducto,
        Familia: familiaNombre,
        Cantidad: cantidad,
        ...estilosReducidos,
      };
    }
  );

  const nombresKeys = nuevaLista.length > 0
    ? Object.keys(nuevaLista[0]).map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: key === "id" ? 10 : 80,
        type: typeof nuevaLista[0][key] === "number" ? "number" : undefined,
      }))
    : [];

  return { nombresKeys, nuevaLista };
};

function generateUniqueId() {
  return uniqueIdCounter++;
}


export const familiasNombre = (familia) => {
  const familias = familia.map(({ nombre }) => nombre);
  const familiasUnicas = [...new Set(familias)];
  const familiasObjeto = familiasUnicas.map((familia) => ({ value: familia }));
  return familiasObjeto;
};
