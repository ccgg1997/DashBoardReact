import React from "react";
import "./Product.css";
import Tabs from "../Tabs/Tabs";
import {TabsData} from "./ProductsData";

const Product = () => {
  return (
    <div className="Product" >
      <Tabs tabs={TabsData}/>
      
    </div>
    
  );
};

export default Product;
