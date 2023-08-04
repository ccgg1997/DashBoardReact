// InvoiceSection.js
import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../FacturaPdf/imagenes/logo.png";

const styles = StyleSheet.create({
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
    padding: 8,
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
    marginTop: 7,
    padding: 2,
    gap: 5,
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
    marginBottom: 10,
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

const InvoiceSection = ({ dataStatic, infoEmpresa, clienteInfo, items, telBarrio }) => {
  const calculateTotal = () => {
    // Lógica para calcular el total basado en los ítems
    let total = 0;
    for (const item of items) {
      const priceWithoutCurrency = item.price.substring(1); // Eliminamos el símbolo '$'
      total += parseFloat(priceWithoutCurrency);
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
          marginTop: 2,
        }}
      >
        {dataStatic.fecha}
      </Text>

      {clienteInfo.map((item, index) => (
        <View style={{ flexDirection: "row" }} key={index}>
          <Text style={{ ...styles.text, fontFamily: "Helvetica-Bold" }}>
            {item.label}
          </Text>
          <Text style={styles.text}>{item.value}</Text>
        </View>
      ))}

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {telBarrio.map((item, index) => (
          <View style={{ flexDirection: "row" }} key={index}>
            <Text style={{ ...styles.text, fontFamily: "Helvetica-Bold" }}>
              {item.label}
            </Text>
            <Text style={styles.text}>{item.value}</Text>
          </View>
        ))}
      </View>

      {items.map((item, index) => (
        <Text style={styles.text} key={index}>
          {item.name + ": " + item.price}
        </Text>
      ))}

      <Text style={styles.text}>Total: {calculateTotal()}</Text>
    </View>
  );
};

export default InvoiceSection;
