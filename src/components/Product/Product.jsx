import React from "react";
import "./Product.css";
import Tabs from "../Basicos/Tabs/Tabs";
import { TabsData } from "./ProductsData";

const Product = () => {
  return (
    <>
      <div className="Product">
        <div className="title">
          <h1>Productos</h1>
        </div>
        <Tabs tabs={TabsData} />
        
      </div>
    </>
  );
};

export default Product;
