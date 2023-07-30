import React from "react";
import "./ProduccionCards.css";
import CardAction from "../../../../../Basicos/CardAction/CardAction";
import { CardsData } from "./CardsData";

const ProduccionCards = () => {
  return (
    <div className="ProduccionCards">
      {CardsData.map((card, id) => {
        return (
          <div className="parentContainerCliente" key={id}>
            <CardAction
              title={card.title}
              color={card.color}
              png={card.png}
              component={card.component}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProduccionCards;
