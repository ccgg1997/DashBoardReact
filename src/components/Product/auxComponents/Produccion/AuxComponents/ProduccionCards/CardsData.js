//Sidebar Imports
import {
  UilClinicMedical,
  UilFileHeart,
  UilFileMedical ,
} from "@iconscout/react-unicons";
import FormPPF from "./AuxForms/FormProduccions/FormPPF/FormPPF";
import FormEditPro from "./AuxForms/FormProduccions/FormEditPro/Fep";
import FCreatePro from "./AuxForms/FormProduccions/FormCreateProduccion/FCPro";

export const CardsData = [
 
  //  {
  //   title: "Crear PPF",

  //   color: {
  //     backGround: "rgb(255, 183, 77 )",
  //     boxShadow: "1px 1px 2px #330066",
  //   },
  //   png: UilClinicMedical,
  //   component: <FormPPF/>,
  // },
  {
    title: "Recibir Material",
    color: {
      backGround: "rgb(11, 144, 252 )",
      boxShadow: "1px 1px 2px #330066",
    },
    png: UilFileHeart,
    component: <FormEditPro/>,
  },
  {
    title: "Crear Producción",
    color: {
      backGround: "rgb(251, 85, 11 )",
      boxShadow: "1px 1px 2px #be2596",
    },
    png: UilFileMedical ,
    component: <FCreatePro/>,
  },
  
  
];



