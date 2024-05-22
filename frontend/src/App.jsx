import { Link, Outlet, useLocation } from "react-router-dom";
import './App.css';
import { NavBar } from "./shared/components/NavBar";
import VetMainBar from "./shared/components/VetMainBar";
import SelectionBar from "./shared/components/SelectionBar";

function App() {
  const location = useLocation();
  const showNavBar = ["/", "/homepage", "/createuser", "/login", "/signup"].includes(location.pathname);

  return (
    <>
      {showNavBar && (
        <NavBar />
      )}
      {/* {!showNavBar && <VetMainBar />} */}
      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
}

export default App;
