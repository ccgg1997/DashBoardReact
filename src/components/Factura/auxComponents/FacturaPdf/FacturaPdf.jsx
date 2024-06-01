import React, { useEffect } from "react";
import { Document, Page,StyleSheet } from "@react-pdf/renderer";
import InvoiceSection from "./FacturaEstrucutura"; // Make sure to provide the correct path to the InvoiceSection component
import whatsapppnmg from "../FacturaPdf/imagenes/whatsapppnmg.png";
import gmailpng from "../FacturaPdf/imagenes/gmailpng.png";


const styles = StyleSheet.create({
    page: {
      flexDirection: "row", // Cambiar de 'column' a 'row'
      backgroundColor: "#fff",
      fontFamily: "Helvetica",
      padding: 10,
      paddingBottom:15,
    }
  });

const Invoice = (factura) => {
  useEffect(() => {

  }, [factura]);
  const dataStatic = {
    nombre: "BOLSAS ROMY",
    correo: "romybolsas@gmail.com",
    tel2: "(312) 850 30 62",
    tel1: "(317) 682 79 71",
    fecha:  factura.factura.fecha,
    facturaId: factura.factura.id,
    clienteNombre: factura.factura.cliente,
    clienteDuenio: factura.factura.duenio,
    clienteDireccion: factura.factura.direccion,
    clienteTel: factura.factura.telefono,
    clienteBarrio: factura.factura.barrio
  };
  const infoEmpresa = [
    {
      icon: whatsapppnmg,
      text: dataStatic.tel1 + "-" + dataStatic.tel2,
    },
    {
      icon: gmailpng,
      text: dataStatic.correo,
    },
  ];

  const clienteInfo = [
    { label: "Cliente", value: dataStatic.clienteNombre,style:{width:"80%",fontFamily: "Helvetica-Bold" }},
    { label: "Dueño/a", value: dataStatic.clienteDuenio ,style:{} },
    { label: "Barrio", value: dataStatic.clienteBarrio ,style:{} },
    { label: "Celular", value: dataStatic.clienteTel ,style:{} },
    { label: "Direc.", value: dataStatic.clienteDireccion,style:{fontFamily: "Helvetica-Bold"} }
  ];

  const items = factura.factura.productos.map(item => {
    return {
      codigo: item.productoId,
      name: item.productoNombre,
      cantidad: item.cantidad,
      price: item.precio
    };
  });

  return (
    <Document>
      <Page size="letter" style={styles.page} orientation="landscape">
        {/* Use the InvoiceSection component twice */}
        <InvoiceSection
          dataStaticdata={dataStatic}
          infoEmpresadata={infoEmpresa}
          clienteInfodata={clienteInfo}
          itemsdata={items}
        />
        <InvoiceSection
          dataStaticdata={dataStatic}
          infoEmpresadata={infoEmpresa}
          clienteInfodata={clienteInfo}
          itemsdata={items}
        />
      </Page>
    </Document>
  );
};

export default Invoice;
