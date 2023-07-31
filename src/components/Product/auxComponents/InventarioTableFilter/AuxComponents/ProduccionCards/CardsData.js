//Sidebar Imports
import {
  UilClinicMedical,
  UilFileHeart,
  UilFileMedical ,
} from "@iconscout/react-unicons";
import FormPPF from "./AuxForms/FormProduccions/FormPPF/FormPPF";
import FormEditInventory from "./AuxForms/FormProduccions/FormEditInventory/Fei";
import FCreateInv from "./AuxForms/FormProduccions/FormCreateInventory/FCInv";
import FormMovBod from "./AuxForms/FormProduccions/FormMovBodegas/FMB";

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
    title: "Extra Inventario",
    color: {
      backGround: "rgb(93, 173, 226)",
      boxShadow: "1px 1px 2px #330066",
    },
    png: UilFileHeart,
    component: <FormEditInventory/>,
  },
  {
    title: "Mov Bodegas",
    color: {
      backGround: "rgb(244, 48, 48  )",
      boxShadow: "1px 1px 2px #330066",
    },
    png: UilFileHeart,
    component: <FormMovBod/>,
  },
  {
    title: "Crear Inventario",
    color: {
      backGround: "rgb(39, 174, 96)",
      boxShadow: "1px 1px 2px #330066",
    },
    png: UilFileMedical ,
    component: <FCreateInv/>,
  },
  
];



