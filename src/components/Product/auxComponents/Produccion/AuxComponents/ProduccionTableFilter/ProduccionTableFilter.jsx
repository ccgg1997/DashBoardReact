import React from "react";
import "./ProduccionTableFilter.css";
import { useSelector } from "react-redux";
import { familiasNombre, functionTableData } from "./TableFilterData";
import TableFilter from "../../../../../Basicos/TableFilter/TableFilter";
import { useState } from "react";

export const ProduccionTableFilter = () => {
  const {familia}= useSelector((state) => state.familia);
  const [selectedOption, setSelectedOption] = useState("");
  const {produccion} = useSelector((state) => state.produccion);
  const { nombresKeys, nuevaLista } = functionTableData(
    produccion,
    selectedOption
  );
  const familiaName = familiasNombre(familia);
  const handleSelect = (selectedValue) => {
    setSelectedOption(selectedValue);
  };
  return (
    <>
      
      <div className="SelectContainer">
        <p>Selecciona Familia:</p>
        <Select options={familiaName} onSelect={handleSelect} />
      </div>
      <TableFilter
        nombre={"PRODUCCIÓN"}
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

export default ProduccionTableFilter;
