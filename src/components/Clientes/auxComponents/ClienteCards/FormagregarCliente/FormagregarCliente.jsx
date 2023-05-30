import React, { useEffect } from "react";
import "./FormagregarCliente.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCliente } from "../../../../../features/clientes/clientes";
import { infoClientes } from "../../../../Api/apiAddress";

const FormagregarCliente = ({ parametros, crearCliente }) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({});
  const [inputError, setInputError] = useState(false); // Estado para controlar el error de los input
  const [inputCheck, setInputCheck] = useState(false); // Estado para controlar el error de los input
 
  const [formEnviado, setFormEnviado] = useState(false);
  const { token } = useSelector((state) => state.auth);
  // Clave para forzar la actualización del componente

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setInputError(false);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setInputCheck(false);
      await crearCliente(formValues, token);
      setFormEnviado(true);
      setInputCheck(true);
      setFormValues({}); // Restablecer el estado de error cuando se realiza un cambio en el input

    } catch (error) {
      setInputError(true);
      setInputCheck(false);
      // Establecer el estado de error en true cuando ocurre una excepción
    }
  };

  useEffect(() => {
    const agregandoNegocio = async () => {
      if (formEnviado) {
        const negociosActualizado = await infoClientes(token);
        dispatch(setCliente(negociosActualizado));
        setFormEnviado(false);
      }
    };

    agregandoNegocio();
  }, [formEnviado, token, dispatch]);

  return (
    <form className="form" onSubmit={handleSubmit} >
      <div className={`myform ${inputError ? "error" : ""}`}>
        {parametros.map((parametro) => (
          <div key={parametro.field}>
            <label htmlFor={parametro.field}>{parametro.label}</label>
            {parametro.type === "select" ? (
              <select
                id={parametro.field}
                name={parametro.field}
                value={formValues[parametro.field] || ""}
                onChange={handleInputChange}
              >
                {parametro.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={parametro.type}
                id={parametro.field}
                name={parametro.field}
                value={formValues[parametro.field] || ""}
                onChange={handleInputChange}
                className={inputError ? "error" : "input"}
              />
            )}
          </div>
        ))}
      </div>
      <button type="submit">Enviar</button>
      {inputError && <span>Datos incorrectos o Cliente repetido</span>}
      {inputCheck && <p>Cliente Agregado</p>}
    </form>
  );
};

export default FormagregarCliente;
