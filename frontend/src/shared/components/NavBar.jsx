import { Link } from "react-router-dom";
import logo from "@/assets/AnimalClinicProNoBg.png";

export function NavBar(){

    
    const signUpButtonStyle = {
        backgroundColor: "#6c9286", 
        color: "#ffff" ,
        border:"0",
        borderRadius:"15px",
        fontSize:"18px",
        padding:"10px 25px"
    };

    const loginButtonStyle = {
        backgroundColor: "#6c9286", 
        color: "#ffff", 
        border:"0",
        borderRadius:"15px",
        fontSize:"18px",
        padding:"10px 25px"
    };

    const animalClinicProTextStyle = {
        color: "#00000", 
        fontSize: '50px'
    };


    return (
        <>
            <nav className="navbar navbar-expand bg-custom shadow-sm" style={{ padding: '10px 20px 10px 20px' }}>
                <div className="container-fluid">
                <Link className="navbar-brand" to="/homepage" style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={logo} width={100} height={80} alt="AnimalClinicPro Logo" />
                        <span style={animalClinicProTextStyle}>AnimalClinicPro</span>
                    </Link> 
                    <ul className="navbar-nav" style={{ display: 'flex', gap: '12px' }}>
                        <li className="nav-item">
                            <Link to="/signup">
                                <button style={signUpButtonStyle}>Sign Up</button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login">
                                <button style={loginButtonStyle}>Login</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            
        </>
    );






}