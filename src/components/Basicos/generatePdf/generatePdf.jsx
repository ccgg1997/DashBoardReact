import { jsPDF } from "jspdf";
import "jspdf-autotable";
import imagen from "../../../imgs/logo.png";

const generarPDF = (factura) => {
  const doc = new jsPDF({
    orientation: "landscape", // Orientación horizontal
  });

  // Generamos la fecha con el formato que queremos dd/mm/yyyy
  const fecha = new Date();
  const fechaFormateada = `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()}`;

  // Imagen de la empresa
  const img = new Image();
  img.src = imagen;

  const dibujarTablaProductos = (x, y, data,tablaWidth) => {
    doc.autoTable({
      head: [["Producto", "Cantidad", "Precio", "Subtotal"]],
      body: data,
      startY: y,
      startX: x,
      tablaWidth,
    });
  };

  // Función para dibujar tanto la información personal como la tabla
  const dibujarFactura = (x, y) => {
    // Imagen de la empresa
    doc.addImage(img, "PNG", x, y, 40, 40);

    //titulo de la factura grande y centrado
    doc.setFontSize(20);
    doc.text("Bolsas Romy", x + 70, y + 10, null, null, "center");

    //subtitulo de la factura
    doc.setFontSize(16);
    doc.text("Factura " + factura.id, x + 70, y + 20, null, null, "center");

    // Información personal
    doc.setFontSize(12);

    const fields = [
      { label: "Fecha", value: fechaFormateada },
      { label: "Cliente", value: factura.cliente },
      { label: "Dueño", value: factura.duenio },
      { label: "Teléfono", value: factura.telefono },
      { label: "Barrio", value: factura.barrio },
      { label: "Dirección", value: factura.direccion },
      { label: "Total", value: factura.total },
    ];

    //dividimos dos columnas para la informacion personal
    const col1 = fields.slice(0, 4);
    const col2 = fields.slice(4, 7);

    let desplazamientoVertical = 0; // Variable para mantener un seguimiento del desplazamiento vertical

    // Dibujamos la primera columna
    col1.forEach((field, index) => {
      const textoOrganizado = dividirPalabras(field.value);

      // Medimos la altura del texto para determinar el desplazamiento
      const textHeight = doc.getTextDimensions(
        `${field.label}: ${textoOrganizado}`
      ).h;

      // Ajustamos el desplazamiento vertical para la siguiente palabra
      desplazamientoVertical += textHeight + 5; // 5 es un margen entre líneas

      // Dibujamos la palabra en la posición correspondiente
      doc.text(
        `${field.label}: ${textoOrganizado}`,
        x + 10,
        y + 40 + desplazamientoVertical + index * 10
      );
    });

    let desplazamientoVertical2 = 0; // Variable para mantener un seguimiento del desplazamiento vertical
    
    // Dibujamos la segunda columna
    col2.forEach((field, index) => {
      const textoOrganizado = dividirPalabras(field.value);

      // Medimos la altura del texto para determinar el desplazamiento
      const textHeight = doc.getTextDimensions(
        `${field.label}: ${textoOrganizado}`
      ).h;

      // Ajustamos el desplazamiento vertical para la siguiente palabra
      desplazamientoVertical2 += textHeight + 5; // 5 es un margen entre líneas

      // Dibujamos la palabra en la posición correspondiente
      doc.text(
        `${field.label}: ${textoOrganizado}`,
        x + 70,
        y + 40 + desplazamientoVertical2 + index * 10
      );
    });

    //ubicamos la mitad de la hoja horizontalmente
    const tablaWidth = doc.internal.pageSize.width / 2;
    // Tabla de productos
    const productos = factura.productos;
    const data = productos.map((producto) => [
      producto.productoNombre,
      producto.cantidad,
      producto.precio,
      agregarPuntos(producto.total),

    ]);

    dibujarTablaProductos(x, y + 120, data, tablaWidth);
  };

  // Dibujar la primera copia de la factura en la página 1
  dibujarFactura(20, 20);

  // Dibujar la segunda copia de la factura en la página 1, al lado de la primera factura
  dibujarFactura(150, 20);

  // Guardar el PDF
  doc.save("factura.pdf");
};

// Función auxiliar para dividir las palabras
const dividirPalabras = (palabra) => {
  if (typeof palabra === "number") return agregarPuntos(palabra);

  if (typeof palabra !== "string") return palabra;

  let acumulador = 0;
  for (let i = 0; i < palabra.length; i++) {
    acumulador++;
    if (acumulador === 17) {
      // Enviamos el resto de la palabra a la siguiente línea
      palabra = palabra.slice(0, i) + "-\n" + palabra.slice(i);
      acumulador = 0;
    }
  }

  return palabra;
};

//funcion para agregar puntos a los numeros
const agregarPuntos = (numero) => {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default generarPDF;
