import React from "react";
import "./InventarioTableFilter.css";
import { useSelector } from "react-redux";
import { familiasNombre, functionTableData } from "./TableFilterData";
import TableFilter from "../../../Basicos/TableFilter/TableFilter";
import { useState } from "react";
import ProduccionCards from './AuxComponents/ProduccionCards/ProduccionCards'

export const InventarioTableFilter = () => {
  const {familia}= useSelector((state) => state.familia);
  const [selectedOption, setSelectedOption] = useState("");
  const { inventario } = useSelector((state) => state.inventario); 
  const { nombresKeys, nuevaLista } = functionTableData(
    inventario,
    selectedOption
  );
  const familiaName = familiasNombre(familia)
  const handleSelect = (selectedValue) => {
    setSelectedOption(selectedValue);
  };
  return (
    <>
      <ProduccionCards/>
      <div className="SelectContainer">
        <p>Selecciona Familia:</p>
        <Select options={familiaName} onSelect={handleSelect} />
      </div>
      <TableFilter
        nombre={"INVENTARIO"}
        nombreColumnas={nombresKeys}
        datosFilas={nuevaLista}
      />
    </>
  );
};

const Select = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <select className="Select"
      value={selectedOption}
      onChange={handleSelectChange}
    >
      <option value="">Seleccionar opción</option>
      {options.map((option, id) => (
        <option key={id} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  );
};



export default InventarioTableFilter;
