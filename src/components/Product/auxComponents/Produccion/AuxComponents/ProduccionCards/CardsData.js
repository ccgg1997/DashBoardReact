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
    title: "Crear Producción",
    color: {
      backGround: "rgb(82, 182, 222 , 1)",
      boxShadow: "1px 1px 2px #be2596",
    },
    png: UilFileMedical ,
    component: <FCreatePro/>,
  },
  {
    title: "Recibir Material",
    color: {
      backGround: "rgb(93, 173, 226)",
      boxShadow: "1px 1px 2px #330066",
    },
    png: UilFileHeart,
    component: <FormEditPro/>,
  },
  
  
];



