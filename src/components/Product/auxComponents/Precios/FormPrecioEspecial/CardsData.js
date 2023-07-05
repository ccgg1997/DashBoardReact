//Sidebar Imports
import {
   UilUsdCircle,
} from "@iconscout/react-unicons";

import FormPrecioEspecialEditar from "./FormPrecioEspecialEditar/FormPrecioEspecialEditar";

const parametros = [
    { field: 'id', label: 'Id', type: 'number' },
    { field: 'negocio', label: 'Negocio', type: 'text' },
    { field: 'duenio', label: 'Dueño', type: 'text'},
    { field: 'direccion', label: 'Direccion', type: 'text'},
    { field: 'telefono', label: 'Telefono', type: 'number' },
    { field: 'barrio', label: 'Barrio', type: 'text' },
  ];
export const CardsData = [
  
  {
    title: "Editar Precio",
    color: {
      backGround: "rgb(91, 194, 78)",
      boxShadow: "1px 1px 2px #993366",
    },
    png: UilUsdCircle,
    component: <FormPrecioEspecialEditar/>,
   
  },
  
  
];



