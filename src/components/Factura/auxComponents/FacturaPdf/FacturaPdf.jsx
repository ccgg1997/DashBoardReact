import React from "react";
import { Document, Page, Text, View, StyleSheet,Image } from "@react-pdf/renderer";
import logo from "../FacturaPdf/imagenes/logo.png"

const styles = StyleSheet.create({
  page: {
    flexDirection: "row", // Cambiar de 'column' a 'row'
    backgroundColor: "#fff",
    fontFamily: "Helvetica",
    padding: 30,
  },
  section: {
    flexGrow: 1,
    width: "50%",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontFamily: "Helvetica-Bold",
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
});

const Invoice = () => (
  <Document>
    <Page size="letter" style={styles.page} orientation="landscape">
      {" "}
      {/* Agregar 'orientation="landscape"' */}
      <View style={styles.section}>
        <View style={styles.titleContainer}>
          <Image src={logo} style={styles.image} />
          <Text style={styles.title}>BOLSAS ROMY</Text>
        </View>
        <View style={styles.text}>
          <Text style={styles.text}>Customer: John Doe</Text>
          <Text style={styles.text}>Date: July 31, 2023</Text>
        </View>
        <View>
          <Text style={styles.text}>Item 1: $10</Text>
          <Text style={styles.text}>Item 2: $20</Text>
          <Text style={styles.text}>Total: $30</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Section 2</Text>
        <View style={styles.text}>
          <Text style={styles.text}>Customer: Jane Smith</Text>
          <Text style={styles.text}>Date: July 31, 2023</Text>
        </View>
        <View>
          <Text style={styles.text}>Item 1: $15</Text>
          <Text style={styles.text}>Item 2: $25</Text>
          <Text style={styles.text}>Total: $40</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default Invoice;
