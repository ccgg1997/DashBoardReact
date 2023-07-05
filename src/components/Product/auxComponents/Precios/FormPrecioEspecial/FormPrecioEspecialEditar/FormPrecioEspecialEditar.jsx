import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./FormPrecioEspecialEditar.css";
import fabrica2d from "../../../../../../imgs/fabrica2d.png";
import {
  cambiarPrecioClienteEspecial,
  cambiarPrecioTodos,
  infoPrecios,
} from "../../../../../Api/apiAddress";
import Notificacion from "../../../../../Basicos/Notificacion/Notificacion";
import { setPrecio } from "../../../../../../features/precios/precios";

const FormPrecioEspecialEditar = () => {
  const dispatch = useDispatch();

  // Obteniendo datos del estado utilizando useSelector
  const clientes = useSelector((state) => state.clientes);
  const { token } = useSelector((state) => state.auth);
  const cliente = clientes.cliente;
  const { precio } = useSelector((state) => state.precios);

  // Filtrando valores únicos de los clientes y productos
  const uniqueIds = [...new Set(cliente.map(({ id }) => id))];
  const lista_product_id = [
    ...new Set(precio.map(({ product_id }) => product_id)),
  ];

  // Estados para manejar los elementos seleccionados y los valores del formulario
  const [tipoPrecio, setTipoPrecio] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectProduct, setSelectProduct] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [actualprice, setActualPrice] = useState(0);
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const [tipoNotificacion, setTipoNotificacion] = useState("");
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");

  useEffect(() => {
    if (mostrarNotificacion) {
      setMostrarNotificacion(false);
    }
  }, [mostrarNotificacion]);

  // Función para limpiar los valores del formulario
  const limpiar = () => {
    setActualPrice("");
    setSelectProduct("");
    setNameProduct("");
    setSelectedItem("");
  };

  // Manejadores de eventos para los cambios en los select
  const handleTipoChange = (e) => {
    const value = e.target.value;
    setTipoPrecio(value);
    limpiar();
  };

  const handleItemChange = (e) => {
    const value = e.target.value;
    setSelectedItem(value);
  };

  const handleProductChange = (e) => {
    const selectedValue = e.target.value;
    setSelectProduct(selectedValue);

    if (selectedValue !== "") {
      // Buscar el producto seleccionado en el estado de precios
      const selectedProduct = precio.find(
        ({ product_id }) => product_id.toString() === selectedValue.toString()
      );
      setNameProduct(selectedProduct.nombre);

      if (tipoPrecio !== "precio_general") {
        setActualPrice(0);
        return;
      }
      setActualPrice(selectedProduct.precio);
    } else {
      setActualPrice("");
      setNameProduct("");
    }
  };

  const handleClickActualizar = async (e) => {
    e.preventDefault();

    if (
      actualprice === "" ||
      selectProduct === "" ||
      (tipoPrecio !== "precio_general" && +actualprice === 0)
    ) {
      setMensajeNotificacion("Campos incompletos o precio igual a 0");
      setTipoNotificacion("error");
      setMostrarNotificacion(true);
      return;
    }

    try {
      const datos = { precio: actualprice };
      const mensaje =
        tipoPrecio === "precio_general"
          ? `Precio actualizado para ${selectProduct} correctamente`
          : `Precio actualizado correctamente para el cliente con id: ${selectedItem}`;

      if (tipoPrecio === "precio_general") {
        await cambiarPrecioTodos(token, selectProduct, datos);
        const responsePrecios = await infoPrecios(token);
        dispatch(setPrecio(responsePrecios));
      } else {
        const datos = { cliente_id: selectedItem, precio: actualprice };
        await cambiarPrecioClienteEspecial(token, selectProduct, datos);
      }

      setMensajeNotificacion(mensaje);
      setTipoNotificacion("success");
      setMostrarNotificacion(true);
      limpiar();
    } catch (error) {
      console.log("error en el try catch de actualizar precio:", error);
    }
  };

  return (
    <div className="FormPrecioEspecialEditar">
      <div className="imagenContainer">
        <img src={fabrica2d} alt="Imagen 2d fabrica" />
      </div>
      <div className="formContainer">
        <select
          value={tipoPrecio}
          onChange={handleTipoChange}
          className="opcionModificar"
        >
          <option value="">Selecciona un Tipo de Precio</option>
          <option value="precio_general">Precio General</option>
          <option value="precio_especial_2">Precio Especial Cliente</option>
        </select>
        {tipoPrecio && (
          <div className="selectcontainer">
            {tipoPrecio !== "precio_general" && (
              <div className="empresa">
                <label>Id del cliente: </label>
                <select value={selectedItem} onChange={handleItemChange}>
                  <option value="">Selecciona un Cliente</option>
                  {uniqueIds.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <label>Id Producto:</label>
            <select
              value={selectProduct}
              onChange={handleProductChange}
              style={{ height: "30px" }}
            >
              <option value="">Selecciona un Producto</option>
              {lista_product_id.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <label>Nombre Producto:</label>
            <input type="text" value={nameProduct} readOnly />
            <label>Nuevo Precio:</label>
            <input
              type="number"
              value={actualprice}
              onChange={(e) => setActualPrice(e.target.value)}
            />
            <button onClick={handleClickActualizar}>Actualizar</button>
          </div>
        )}
      </div>
      <Notificacion
        mensaje={mensajeNotificacion}
        tipoNotificacion={tipoNotificacion}
        mostrarNotificacion={mostrarNotificacion}
      />
    </div>
  );
};

export default FormPrecioEspecialEditar;
