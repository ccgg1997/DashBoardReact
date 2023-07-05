//Sidebar Imports
import {
  UilClinicMedical,
  UilFileHeart,
  UilFileMedical ,
} from "@iconscout/react-unicons";
import FormPPF from "./AuxForms/FormProduccions/FormPPF/FormPPF";
import FormEditInventory from "./AuxForms/FormProduccions/FormEditInventory/FormEditInventory";

export const CardsData = [
 
   {
    title: "Crear PPF",

    color: {
      backGround: "rgb(255, 183, 77 )",
      boxShadow: "1px 1px 2px #330066",
    },
    png: UilClinicMedical,
    component: <FormPPF/>,
  },
  {
    title: "Editar Inventario",
    color: {
      backGround: "rgb(93, 173, 226)",
      boxShadow: "1px 1px 2px #330066",
    },
    png: UilFileHeart,
    component: <FormEditInventory/>,
  },
  {
    title: "Crear Inventario",
    color: {
      backGround: "rgb(39, 174, 96)",
      boxShadow: "1px 1px 2px #330066",
    },
    png: UilFileMedical ,
    component: <h1>hola, bienvenidos a mi pestana2</h1>,
  },
  
];



