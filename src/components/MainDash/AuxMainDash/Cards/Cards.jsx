import React from "react";
//import { CardsData } from "./CardsData";
import Card from "../../../Basicos/Card/Card";
import { useSelector } from "react-redux";
import "./Cards.css";
import {
  UilClipboardAlt,
  UilUsdSquare,
  UilMoneyWithdrawal,
} from "@iconscout/react-unicons";

const Cards = () => {
  //traer inventario del reducer
  const { inventario } = useSelector((state) => state.inventario);

  //procesar datos para obtener un array de objetos con las familias y sus productos
  const inventarioReducido = procesarDatos(inventario);
  const fina1 = filtradoCalidad("FINA", inventarioReducido);
  const economica1 = filtradoCalidad("ECONOMICA", inventarioReducido);
  const holograma1 = filtradoCalidad("HOLOGRAMA", inventarioReducido);
  console.log(inventarioReducido);

  const CardsData = [
    {
      title: "Fina",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "1px 3px 9px #330066",
      },
      barValue: Math.floor(fina1.total / 50000000) * -1,
      value: fina1.total,
      png: UilUsdSquare,
      series: [
        {
          name: "Sales",
          data: fina1.cantidades,
        },
      ],
      xaxis: {
        type: "category",
        categories: fina1.productoIds,
      },
    },
    {
      title: "Holograma",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "1px 3px 9px #993366",
      },
      barValue: 60,
      value: holograma1.total,
      png: UilMoneyWithdrawal,
      series: [
        {
          name: "Revenue",
          data: holograma1.cantidades,
        },
      ],
      xaxis: {
        type: "category",
        categories: holograma1.productoIds,
      },
    },
    {
      title: "Económica",
      color: {
        backGround: "#FF9900",
        boxShadow: "1px 3px 9px #663300",
      },
      barValue: 60,
      value: economica1.total,
      png: UilClipboardAlt,
      series: [
        {
          name: "Expenses",
          data: economica1.cantidades,
        },
      ],
      xaxis: {
        type: "category",
        categories: economica1.productoIds,
      },
    },
  ];

  return (
    <div className="Cards">
      {CardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
              xaxis={card.xaxis}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;

function procesarDatos(datos) {
  const uniqueProducts = {};

  datos.forEach((obj) => {
    const key = obj.familiaNombre;

    if (!uniqueProducts[key]) {
      uniqueProducts[key] = {
        familiaNombre: obj.familiaNombre,
        productos: [{ productoId: obj.productoId, cantidad: obj.cantidad }],
        total: obj.cantidad,
      };
    } else {
      const existingProduct = uniqueProducts[key].productos.find(
        (product) => product.productoId === obj.productoId
      );
      if (existingProduct) {
        existingProduct.cantidad += obj.cantidad;
        uniqueProducts[key].total += obj.cantidad;
      } else {
        uniqueProducts[key].productos.push({
          productoId: obj.productoId,
          cantidad: obj.cantidad,
        });
      }
    }
  });

  return Object.values(uniqueProducts);
}

function filtradoCalidad(filtro, datos) {
  const fina = datos.find((obj) => obj.familiaNombre === filtro);

  if (fina) {
    const productoIds = fina.productos.map((producto) => producto.productoId);
    const cantidades = fina.productos.map((producto) => producto.cantidad);
    const total = fina.total;

    return { productoIds, cantidades, total };
  } else {
    return null; // O algún otro valor que indique que no se encontró ningún objeto con el filtro dado
  }
}
