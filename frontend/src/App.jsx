import { Link, Outlet, useLocation } from "react-router-dom";
import './App.css';
import { NavBar } from "./shared/components/NavBar";
import VetMainBar from "./shared/components/VetMainBar";

function App() {
  const location = useLocation();
  const showNavBar = ["/","/homepage", "/signup", "/login"].includes(location.pathname);

  return (
    <>
      {showNavBar && (
        <NavBar>
          <Link to="/homepage">Homepage</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </NavBar>
      )}
      {!showNavBar && <VetMainBar />}
      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
}

export default App;
