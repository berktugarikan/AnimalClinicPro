import { Link, Outlet ,useLocation} from "react-router-dom";
import logo from "./assets/AnimalClinicPro.png";
import './App.css';
import {NavBar} from "./shared/components/NavBar";
import VetMainBar from "./shared/components/VetMainBar";


/*function App() {

    return (
      <>
       <VetMainBar />
        <div className="page-content">
          <Outlet />
        </div>
      </>
    );
  }
  
  export default App;*/

  function App() {
    const location = useLocation();


  
    const showNavBar = location.pathname === "/homepage";

    return (
      <>
        {showNavBar && location.pathname === "/homepage" && <NavBar />}
        {!showNavBar && <VetMainBar />}
        <div className="page-content">
          <Outlet />
        </div>
      </>
    );
  }
  
  export default App;