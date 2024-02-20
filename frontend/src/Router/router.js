import {createBrowserRouter  } from "react-router-dom";
import App from "../App";
import HomePage  from "@/pages/HomePage/homepage";
import  SignUp  from "@/pages/SignUp/signup";
import VetMainPage from "@/pages/VetMainPage/vetmainpage.jsx";
import VetGenelHastaKabul from "@/pages/VetGenelHastaKabul/vetgenelhastakabul.jsx";
import VetGenelMR from "@/pages/VetGenelMR/vetgenelmr.jsx";
import VetGenelMRG from "@/pages/VetGenelMRG/vetgenelmrg.jsx";
import VetGenelAR from "@/pages/VetGenelAR/vetgenelar.jsx";
import VetGenelARG from "@/pages/VetGenelARG/vetgenelarg.jsx";
import VetGenelTahlil from "@/pages/VetGenelTahlil/vetgeneltahlil.jsx";
import VetGenelÖdemeGeçmişi from "@/pages/VetGenelÖdemeGeçmişi/vetgenelödemegeçmişi.jsx";
import {Login} from "@/pages/Login/login.jsx";
import { Activation } from "@/pages/Activation/Activation.jsx";
import VetProfilBilgileri from "@/pages/VetProfilBilgileri/vetprofilbilgileri.jsx";
import VetŞifreDeğiştirme from "@/pages/VetŞifreDeğiştirme/vetşifredeğiştirme.jsx";
import VetÇıkış from "@/pages/VetÇıkış/vetçıkış.jsx";
import VetHasta from "@/pages/VetHasta/vethasta";
import CreateUser from "@/pages/VetMainPage/createuser";
import VetFinancial from "@/pages/VetFinancial/vetfinancial.jsx";
import VetLaboratory from "@/pages/VetLaboratory/vetLaboratory.jsx";
import {AddAppointment} from "@/pages/VetGenelMR/addAppointment.jsx";





export default createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "/",
                Component:HomePage,
            },
            {
                path: "/homepage",
                index: true,
                Component: HomePage,
            },
            {
                path: "/signup",
                Component:SignUp,
            },
            {
                path: "/activation/:token",
                Component:Activation,
            },
            {
                path: "/login",
                Component:Login,
            },
            {
                path:"/vetmainpage",
                Component: VetMainPage,
            },
            {
                path:"/createuser",
                Component: CreateUser,
            },
            {
                path:"/addAppointment",
                Component: AddAppointment,
            },
            {
                path:"/vetgenelhastakabul",
                Component: VetGenelHastaKabul,
            },
            {
                path:"/vetgenelmr",
                Component: VetGenelMR,
            },
            {
                path:"/vetgenelmrg",
                Component: VetGenelMRG,
            },
            {
                path:"/vetgenelar",
                Component: VetGenelAR,
            },
            {
                path:"/vetgenelarg",
                Component: VetGenelARG,
            },
            {
                path:"/vetgeneltahlil",
                Component: VetGenelTahlil,
            },
            {
                path:"/vetgenelödemegeçmişi",
                Component: VetGenelÖdemeGeçmişi,
            },
            /*{
                path:"/vetgeneral",
                Component: VetGeneral,
            },*/
            {
                path:"/vethasta",
                Component: VetHasta,
            },
            {
                path:"/vetfinancial",
                Component: VetFinancial,
            },
            {
                path:"/vetlaboratory",
                Component: VetLaboratory,
            },
            {
                path: "/vetprofilbilgileri",
                Component: VetProfilBilgileri,
              },
              {
                path: "/vetşifredeğiştirme",
                Component: VetŞifreDeğiştirme,
              },
              {
                path: "/vetçıkış",
                Component: VetÇıkış,
              },

        ]
    }
])



