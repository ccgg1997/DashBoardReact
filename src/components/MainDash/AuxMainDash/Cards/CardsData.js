//Sidebar Imports
import{
    UilClipboardAlt,
    UilUsdSquare, 
    UilMoneyWithdrawal,

} from "@iconscout/react-unicons";

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
        
    },
    

];
