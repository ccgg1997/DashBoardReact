import React from "react";
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

  const dibujarTablaProductos = (x, y, data) => {
    console.log("x", x);
    console.log("y", y);
    const tableWidth = doc.internal.pageSize.width / 2 - 10;
    doc.autoTable({
      head: [["Producto", "Cantidad", "Precio", "Subtotal"]],
      body: data,
      startY: y,
      startX: x,
      tableWidth,
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
    doc.text("Factura", x + 70, y + 20, null, null, "center");

    // Información personal
    doc.setFontSize(12);

    const fields = [
      { label: "Fecha", value: fechaFormateada},
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

    // Dibujamos la primera columna
    col1.forEach((field, index) => {
      doc.text(`${field.label}: ${field.value}`, x, y + 50 + index * 10);
    });

    // Dibujamos la segunda columna
    col2.forEach((field, index) => {
      doc.text(`${field.label}: ${field.value}`, x + 57, y + 50 + index * 10);
    });

    // Tabla de productos
    const productos = factura.productos;
    const data = productos.map((producto) => [
      producto.nombre,
      producto.cantidad,
      producto.precio,
      producto.total,
    ]);

    dibujarTablaProductos(x, y + 90, data);
  };

  // Dibujar la primera copia de la factura en la página 1
  dibujarFactura(20, 20);

  // Dibujar la segunda copia de la factura en la página 1, al lado de la primera factura
  dibujarFactura(150, 20);

  // Guardar el PDF
  doc.save("factura.pdf");
};

export default generarPDF;
