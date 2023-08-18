import React from "react";
//import { CardsData } from "./CardsData";
import Card from "../../../Basicos/Card/Card";
import "./Cards.css";
import{
    UilClipboardAlt,
    UilUsdSquare, 
    UilMoneyWithdrawal,

} from "@iconscout/react-unicons";

const Cards = () => {
  const CardsData = [
    {
      title: "Sales",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "1px 3px 9px #330066",
      },
      barValue: 70,
      value: "$25,000",
      png: UilUsdSquare,
      series: [
        {
          name: "Sales",
          data: [31, 41, 28, 51, 42, 109, 100],
        },
      ],
    },
    {
      title: "Revenue",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "1px 3px 9px #993366",
      },
      barValue: 60,
      value: "$2,500",
      png: UilMoneyWithdrawal,
      series: [
        {
          name: "Revenue",
          data: [10, 100, 50, 70, 80, 30],
        },
      ],
    },
    {
      title: "Revenue",
      color: {
        backGround: "#FF9900",
        boxShadow: "1px 3px 9px #663300",
      },
      barValue: 60,
      value: "$15,000.000",
      png: UilClipboardAlt,
      series: [
        {
          name: "Expenses",
          data: [10, 100, 50, 70, 80, 30],
        },
      ],
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
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
