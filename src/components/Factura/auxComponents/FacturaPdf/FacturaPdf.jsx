import React from "react";
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
    }
  });

const Invoice = () => {
  const dataStatic = {
    nombre: "BOLSAS ROMY",
    correo: "romybolsas@gmail.com",
    tel2: "(312) 850 30 62",
    tel1: "(317) 682 79 71",
    fecha: "Agosto 03,2023",
    facturaId: "0001",
    clienteNombre: "Cliente 1",
    clienteDuenio: "Duenio 1",
    clienteDireccion: "Direccion 1",
    clienteTel: "Tel 1",
    clienteBarrio: "Barrio 1",
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
    { label: "Nombre:", value: dataStatic.clienteNombre },
    { label: "Dueño:", value: dataStatic.clienteDuenio },
    { label: "Direccion:", value: dataStatic.clienteDireccion },
  ];

  const telBarrio = [
    { label: "Tel:", value: dataStatic.clienteTel },
    { label: "Barrio:", value: dataStatic.clienteBarrio },
  ];

  const items = [
    { codigo:"p01",name: "bolsas economica media larga", price: 10, cantidad: 2 },
    { codigo:"p02",name: "Item 2", price: 20, cantidad: 3 },
  ];

  return (
    <Document>
      <Page size="letter" style={styles.page} orientation="landscape">
        {/* Use the InvoiceSection component twice */}
        <InvoiceSection
          dataStatic={dataStatic}
          infoEmpresa={infoEmpresa}
          clienteInfo={clienteInfo}
          items={items}
          telBarrio={telBarrio}
        />
        <InvoiceSection
          dataStatic={dataStatic}
          infoEmpresa={infoEmpresa}
          clienteInfo={clienteInfo}
          items={items}
          telBarrio={telBarrio}
        />
      </Page>
    </Document>
  );
};

export default Invoice;
