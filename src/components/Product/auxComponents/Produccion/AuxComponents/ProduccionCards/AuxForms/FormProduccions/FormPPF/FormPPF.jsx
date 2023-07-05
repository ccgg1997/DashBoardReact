import React, { useState,useEffect } from "react";
import "./FormPPF.css";
import {
  createProduct,
  createPersona,
  crearFamilia,
} from "../../../../../../../../Api/apiAddress";
import { useSelector } from "react-redux";
import Notificacion from "../../../../../../../../Basicos/Notificacion/Notificacion";

// Datos de los campos y funciones personalizadas
const fieldsData = {
  PERSONA: [
    "PersonaId",
    "Nombre",
    "Apellido",
    "Telefono",
    "Direccion",
    "Barrio",
    async (data, token) => {
      const response = await createPersona(data, token);
      return response;
    }
      ,
  ],
  PRODUCTO: [
    "Familia_id",
    "Tipo",
    "Producto_Id",
    "Nombre",
    "Precio_regular",
    async (data, token) => {
      const response = await createProduct(data, token);
      return response;
    },
  ],
  FAMILIA: [
    "Nombre",
    "Estilos",
    async (data, token) => {
      const response = await crearFamilia(data, token);
      return response;
    }
   ,
  ],
};

// Opciones de tipos de producto
const tiposProducto = [
  { id: "PRODUCTO", nombre: "PRODUCTO" },
  { id: "PAPEL", nombre: "PAPEL" },
  { id: "MATERIAPRIMA", nombre: "MATERIAPRIMA" },
];

const familiasNombre = (familia) => {
  const familias = familia.map(({ nombre }) => nombre);
  const familiasUnicas = [...new Set(familias)];
  const familiasObjeto = familiasUnicas.map((familia) => ({ value: familia }));
 

  return familiasObjeto;
};


const FormPPF = () => {
  const { token } = useSelector((state) => state.auth);
  const [selectedForm, setSelectedForm] = useState("");
  const [formData, setFormData] = useState({});
  const [estilosData, setEstilosData] = useState([]);
  const [isFieldsFilled, setIsFieldsFilled] = useState(false); 
  
  //notificaciones
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const [tipoNotificacion, setTipoNotificacion] = useState("");
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");

  useEffect(() => {
    if (mostrarNotificacion) {
      setMostrarNotificacion(false);
    }
  }, [mostrarNotificacion]);

  // Maneja el cambio de selección del formulario
  const handleItemChange = (e) => {
    const value = e.target.value;
    setSelectedForm(value);
    setFormData({});
    setEstilosData([]);
    setIsFieldsFilled(false);
  };

  // Maneja el cambio en los campos del formulario
  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    let newValue = value;
    if (
      selectedForm === "PRODUCTO" &&
      (name === "Familia_id" || name === "Tipo")
    ) {
      newValue = document.getElementById(`${name}Select`).value;
    }

    if (selectedForm === "FAMILIA" && name.startsWith("Estilo")) {
      const index = parseInt(name.replace("Estilo", ""), 10) - 1;
      const updatedEstilos = [...estilosData];
      updatedEstilos[index] = { nombre: value };
      setEstilosData(updatedEstilos);
    }

    setFormData((formData) => ({
      ...formData,
      [name]: newValue,
    }));

    // Verificar si todos los campos del formulario están llenos
    const allFieldsFilled =
      selectedForm &&
      fieldsData[selectedForm].every(
        (field) =>
          typeof field === "function" ||
          (field === "Familia_id" || field === "Tipo"
            ? formData[field] && formData[field] !== ""
            : formData[field] && formData[field].trim() !== "")
      );

    setIsFieldsFilled(allFieldsFilled);
  };

  // Maneja el clic en el botón "Imprimir Campos"
  const handlePrintFields = async () => {
    try {
      let data = {};
      if (selectedForm === "FAMILIA") {
        data = {
          nombre: formData.Nombre,
          estilos: estilosData,
        };
      } else {
        const lowercaseFormData = Object.keys(formData).reduce((acc, key) => {
          if (formData[key] && formData[key] !== "") {
            const formattedKey =
              key === "PersonaId" ? "personaId" : key.toLowerCase();
            acc[formattedKey] = formData[key];
          }
          return acc;
        }, {});
        data = lowercaseFormData;
      }
  
      // Ejecutar la función personalizada si existe en los datos del formulario
      if (selectedForm && fieldsData[selectedForm]) {
        const customFunction = fieldsData[selectedForm].find(
          (field) => typeof field === "function"
        );
        if (typeof customFunction === "function") {
            await customFunction(data, token);
        }
      }
      setMensajeNotificacion("Creación realizada con éxito");
      setTipoNotificacion("success");
      setMostrarNotificacion(true);
      setFormData({});
      setEstilosData([]);
      setIsFieldsFilled(false);
    } catch (error) {
      setMensajeNotificacion("Error al crear el registro, verifica los datos ingresados o intenta más tarde");
      setTipoNotificacion("error");
      setMostrarNotificacion(true);
      console.log(error);
    }
  };

  return (
    <div className="FormPPF">
      {selectedForm && (
        <div className="subTitleContainer">
          <h3>{"Formulario " + selectedForm.toLowerCase() + ": "}</h3>
        </div>
      )}
      <div className="FormPPFContainer">
        <select value={selectedForm} onChange={handleItemChange}>
          <option value="">Selecciona un Tipo de Formulario</option>
          {Object.keys(fieldsData).map((formType) => (
            <option key={formType} value={formType}>
              {formType}
            </option>
          ))}
        </select>
        {selectedForm && fieldsData[selectedForm] && (
          <div className="FieldContainer">
            <FormFields
              fields={fieldsData[selectedForm]}
              formData={formData}
              handleInputChange={handleInputChange}
              selectedForm={selectedForm}
              estilosData={estilosData}
            />
            <div className="botonContainer">
              <button onClick={handlePrintFields} disabled={!isFieldsFilled}>
                Imprimir Campos
              </button>
            </div>
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

// Componente para renderizar los campos del formulario
function FormFields({
  fields,
  formData,
  handleInputChange,
  selectedForm,
  estilosData,
}) {
  const { familia } = useSelector((state) => state.familia);
  const familiaName = familiasNombre(familia);

  return (
    <div className="FormFields">
      {fields.map((field, index) => (
        <div key={index} className="FormField">
          {typeof field === "function" ? null : (
            <>
              <label>{field === "Familia_id" ? "Familia" : field}:</label>
              {selectedForm === "FAMILIA" && field === "Estilos" ? (
                <>
                  <input
                    type="number"
                    min="0"
                    value={formData[field] || ""}
                    name={field}
                    onChange={handleInputChange}
                  />
                  {Array.from({ length: formData[field] || 0 }).map(
                    (_, index) => (
                      <div key={index}>
                        <label>nombre: </label>
                        <input
                          type="text"
                          name={`Estilo${index + 1}`}
                          value={
                            estilosData[index]
                              ? estilosData[index].nombre || ""
                              : ""
                          }
                          onChange={handleInputChange}
                        />
                      </div>
                    )
                  )}
                </>
              ) : selectedForm === "PRODUCTO" && field === "Familia_id" ? (
                <select
                  id={`${field}Select`}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar opción</option>
                  {familiaName.map((option, id) => (
                    <option key={id} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              ) : selectedForm === "PRODUCTO" && field === "Tipo" ? (
                <select
                  id={`${field}Select`}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona una opción</option>
                  {tiposProducto.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleInputChange}
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default FormPPF;
