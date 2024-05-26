import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Activation } from "../pages/Activation/Activation.jsx";
import AddLabResult from "../pages/AddLabResult/addLabResult.jsx";
import HomePage from "../pages/HomePage/homepage";
import { Login } from "../pages/Login/login.jsx";
import SignUp from "../pages/SignUp/signup";
import VetFinancial from "../pages/VetFinancial/vetfinancial.jsx";
import VetGenelAR from "../pages/VetGenelAR/vetgenelar.jsx";
import VetGenelArgAdd from "../pages/VetGenelARG/vetGenelArgAdd.jsx";
import VetGenelARG from "../pages/VetGenelARG/vetgenelarg.jsx";
import VetGenelHastaKabul from "../pages/VetGenelHastaKabul/vetgenelhastakabul.jsx";
import { AddAppointment } from "../pages/VetGenelMR/addAppointment.jsx";
import VetGenelMR from "../pages/VetGenelMR/vetgenelmr.jsx";
import VetGenelMRG from "../pages/VetGenelMRG/vetgenelmrg.jsx";
import VetGenelTahlil from "../pages/VetGenelTahlil/vetgeneltahlil.jsx";
// import VetGenelÖdemeGeçmişi from "../pages/VetGenelÖdemeGeçmişi/vetgenelödemegeçmişi.jsx";
import PaymentHistory from "../pages/VetGenelÖdemeGeçmiƒi/vetgenelödemegeçmiƒi";
import VetHasta from "../pages/VetHasta/vethasta";
import VetLaboratory from "../pages/VetLaboratory/vetlaboratory.jsx";
import CreateUser from "../pages/VetMainPage/createuser";
import VetMainPage from "../pages/VetMainPage/vetmainpage.jsx";
import VetProfilBilgileri from "../pages/VetProfilBilgileri/vetprofilbilgileri.jsx";
import Layout from "@/shared/components/Layout";
import VetÇıkış from "../pages/VetÇìkìƒ/vetçìkìƒ";
import VetŞifreDeğiştirme from "../pages/Vet₧ifreDeºiƒtirme/vetƒifredeºiƒtirme";
import Payment from "@/pages/Payment/Payment";
import { AdminPage } from "@/pages/Admin/Admin";





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

        ]
    },
    {
        path: "/",
        Component: Layout,
        children: [
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
                path:"/vetgenelargadd",
                Component: VetGenelArgAdd,
            },
            {
                path:"/vetgeneltahlil",
                Component: VetGenelTahlil,
            },
            {
                path:"/addLabResult",
                Component: AddLabResult,
            },
            {
                path:"/vetgenelödemegeçmişi",
                Component: PaymentHistory,
            },
            // {
            //     path:"/vetgeneral",
            //     Component: VetGeneral,
            // },
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
                path: "/payment",
                Component: Payment,
              },
              {
                path: "/admin",
                Component: AdminPage,
              }
            //   {
            //     path: "/vetçıkış",
            //     Component: VetÇıkış,
            //   },
        ]
    }
])



