// InvoiceSection.js
import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../FacturaPdf/imagenes/logo.png";

const styles = StyleSheet.create({
  table: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    backgroundColor: "#f2f2f2",
    padding: 5,
    alignItems: "center",
  },
  tableHeaderCell: {
    fontSize: 12,
    fontWeight: "bold",
    width: "50%",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    padding: 3,
    alignItems: "center",
  },
  tableCell: {
    fontSize: 10,
    width: "50%",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  page: {
    flexDirection: "row", // Cambiar de 'column' a 'row'
    backgroundColor: "#fff",
    fontFamily: "Helvetica",
    padding: 10,
  },
  section: {
    flexGrow: 1,
    width: "50%",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    padding: 11,
  },
  titleContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderStyle: "dashed",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between", // Alinea los elementos al inicio del contenedor
  },

  title: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    paddingTop: "4%",
    color: "#0056b3",
  },

  factura_id1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end", // Alinea los elementos al final del contenedor
  },
  factura_id2: {
    display: "flex",
    flexDirection: "column",
    padding: 5,
    justifyContent: "flex-end",
    alignItems: "center", // Alinea los elementos al final del contenedor
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderStyle: "dashed",
  },
  infoEmpresa: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 6,
    padding: 2,
  },
  image: {
    width: 42,
    height: 42,
    alignItems: "start",
  },
  icon: {
    width: 14,
    height: 14,
    alignItems: "start",
  },
  textFecha: {
    fontSize: 14,
    marginBottom: 15,
  },

  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  textiD: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  textiDF: {
    fontSize: 10,
  },
});

const InvoiceSection = ({
  dataStatic,
  infoEmpresa,
  clienteInfo,
  items,
  telBarrio,
}) => {
  const calculateTotal = () => {
    // Lógica para calcular el total basado en los ítems
    let total = 0;
    for (const item of items) {
      total += item.price * item.cantidad;
    }
    return "$" + total.toFixed(2); // Volver a agregar el símbolo '$' y mantener dos decimales
  };

  return (
    <View style={styles.section}>
      <View style={styles.titleContainer}>
        <View style={styles.factura_id1}>
          <Image src={logo} style={styles.image} />
          <Text style={styles.title}>{dataStatic.nombre}</Text>
        </View>
        <View style={styles.factura_id2}>
          <Text style={styles.textiD}>REMISION DE COMPRA</Text>
          <Text style={styles.textiDF}>
            {"FACTURA No." + dataStatic.facturaId}
          </Text>
        </View>
      </View>
      <View style={styles.infoEmpresa}>
        {infoEmpresa.map((item, index) => (
          <View style={{ flexDirection: "row" }} key={index}>
            <Image src={item.icon} style={{ ...styles.icon, padding: 1 }} />
            <Text style={{ ...styles.textiD, padding: 1 }}>{item.text}</Text>
          </View>
        ))}
      </View>
      <Text
        style={{
          ...styles.text,
          fontFamily: "Helvetica-Bold",
          marginTop: 4,
          marginBottom: 12,
        }}
      >
        {dataStatic.fecha}
      </Text>
      {clienteInfo.map((item, index) => (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }} key={index}>
          <Text style={{ ...styles.text, fontFamily: "Helvetica-Bold", width:50 }}>
            {item.label }
          </Text>
          <Text style={styles.text}>{": "}</Text>
          <Text style={{...styles.text,...item.style}}>{item.value}</Text>
        </View>
      ))}
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {telBarrio.map((item, index) => (
          <View style={{ flexDirection: "row", flexWrap: "wrap" }} key={index}>
            <Text style={{ ...styles.text, fontFamily: "Helvetica-Bold" }}>
              {item.label}
            </Text>
            <Text style={styles.text}>{item.value}</Text>
          </View>
        ))}
      </View> */}
      // Ejemplo de tabla manual
      <View style={styles.table}>
        {/* Encabezado de la tabla */}
        <View
          style={{
            ...styles.tableRow,
            paddingVertical: 10,
            borderTopWidth: 1,
            borderStyle: "dashed",
          }}
        >
          <Text style={{...styles.tableCell,fontFamily: "Helvetica-Bold"}}>Codigo</Text>
          <Text style={{...styles.tableCell,fontFamily: "Helvetica-Bold"}}>Nombre</Text>
          <Text style={{...styles.tableCell,fontFamily: "Helvetica-Bold"}}>Cantidad</Text>
          <Text style={{...styles.tableCell,fontFamily: "Helvetica-Bold"}}>Precio</Text>
          <Text style={{...styles.tableCell,fontFamily: "Helvetica-Bold"}}>SubTotal</Text>
        </View>
        {items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.codigo}</Text>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.cantidad}</Text>
            <Text style={styles.tableCell}>{item.price}</Text>
            <Text style={styles.tableCell}>
              {"$" + item.price * item.cantidad}
            </Text>
          </View>
        ))}
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ ...styles.text,fontFamily: "Helvetica-Bold",}}>
          Total: {calculateTotal()}
        </Text>
      </View>
    </View>
  );
};

export default InvoiceSection;
