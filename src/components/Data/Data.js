//Sidebar Imports
import{
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChartLine,
    UilUsdSquare, 
    UilMoneyWithdrawal,

} from "@iconscout/react-unicons";

import img1 from "../../imgs/img1.png";
import img2 from "../../imgs/img2.png";
import img3 from "../../imgs/img3.png";

//Sidebar Data
export const SidebarData = [
    {
        icon: UilEstate,
        heading: "Dashboard",
    },
    {
        icon: UilClipboardAlt,
        heading: "Orders",
    },
    {
        icon: UilUsersAlt,
        heading: "Customers",
    },
    {
        icon: UilPackage,
        heading: "Products",
    },
    {
        icon: UilChartLine,
        heading: "Analytics",
    }

];

export const CardsData = [
    {
        title:"Sales",
        color:{
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "1px 3px 9px #330066",
        },
        barValue: 70,
        value: "$25,000",
        png:UilUsdSquare,
        series:[
            {
                name:"Sales",
                data:[31,41,28,51,42,109,100]
            },
        ],
    },
    {
        title:"Revenue",
        color:{
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "1px 3px 9px #993366",
        },
        barValue: 60,
        value: "$2,500",
        png:UilMoneyWithdrawal,
        series:[
            {
                name:"Revenue",
                data:[10,100,50,70,80,30]
            },
        ],
    },
    {
        title:"Revenue",
        color:{
            backGround: "#FF9900",
            boxShadow: "1px 3px 9px #663300",
        },
        barValue: 60,
        value: "$15,000.000",
        png:UilClipboardAlt,
        series:[
            {
                name:"Expenses",
                data:[10,100,50,70,80,30]
            },
        ],
    },
    

];

export const UpdatesData = [
    
        {
            img:img1,
            name:"andrew thomas",
            noti:"Cheque ashe entrea el 15 octubre",
            time:"2 min ago",
        },
        {
            img:img2,
            name:"jefe",
            noti:"Cheque cordon entrea el 5 junio",
            time:"20 min ago",
        },
        {
            img:img3,
            name:"produccion",
            noti:"falta mediana larga bebe",
            time:"1 hr ago",
        }

];
