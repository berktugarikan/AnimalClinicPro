import SelectionBar from "./SelectionBar";
import "./Layout.css";
import { Outlet, useNavigate } from "react-router-dom";
import VetMainBar from "./VetMainBar";
import CustomBottomNavigation from "./BottomNav";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";


function Layout() {
    const navigate = useNavigate();

    const authenticate = () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
            navigate("/login");
        }
    }
    useEffect(() => {
        authenticate();
    }, [])

    return (

        <div className="main-layout">
            <VetMainBar />
            <div className="layout-container">
                <SelectionBar />
                <Outlet />
            </div>
            <CustomBottomNavigation />
            <Toaster />
        </div>
    );
}

export default Layout;
