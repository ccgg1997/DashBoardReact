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
    clienteNombre: "Cliente 1 remates la ,ejor del minco",
    clienteDuenio: "Duenio 1",
    clienteDireccion: "calle 89 # 89-89 barrio calicanto, al frente de la tienda de la esquina",
    clienteTel: "Tel 146464564564564564564645645645 33333333333 ",
    clienteBarrio: "Bario calicanto",
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
    { label: "Direc.", value: dataStatic.clienteDireccion,style:{textAlign: "center",width:"100%",fontFamily: "Helvetica-Bold"} }
  ];

  const items = [
    { codigo:"p01",name: "bolsas economica media larga", price: 10, cantidad: 2 },
    { codigo:"p02",name: "Item 2", price: 20, cantidad: 3 },
    { codigo:"p01",name: "bolsas economica media larga", price: 10, cantidad: 2 },
    { codigo:"p02",name: "Item 2", price: 20, cantidad: 3 },
    { codigo:"p01",name: "bolsas economica media larga", price: 10, cantidad: 2 },
    { codigo:"p02",name: "Item 2", price: 20, cantidad: 3 },
    { codigo:"p01",name: "bolsas economica media larga", price: 10, cantidad: 2 },
    { codigo:"p02",name: "Item 2", price: 20, cantidad: 3 },
    { codigo:"p01",name: "bolsas economica media larga", price: 10, cantidad: 2 },
    { codigo:"p02",name: "Item 2", price: 20, cantidad: 3 },
    { codigo:"p01",name: "bolsas economica media larga", price: 10, cantidad: 2 },
    { codigo:"p02",name: "Item 2", price: 20, cantidad: 3 },
    { codigo:"p01",name: "bolsas economica media larga", price: 10, cantidad: 2 },
    { codigo:"p02",name: "Item 2", price: 20, cantidad: 3 },
    { codigo:"p01",name: "bolsas economica media larga", price: 10, cantidad: 2 },
    { codigo:"p02",name: "Item 2", price: 20, cantidad: 3 }, 
    { codigo:"p01",name: "bolsas economica media larga", price: 10, cantidad: 2 },
    { codigo:"p02",name: "Item 2", price: 20, cantidad: 3 },
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
        />
        <InvoiceSection
          dataStatic={dataStatic}
          infoEmpresa={infoEmpresa}
          clienteInfo={clienteInfo}
          items={items}
        />
      </Page>
    </Document>
  );
};

export default Invoice;
