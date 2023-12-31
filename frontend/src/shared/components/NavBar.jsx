import { Link } from "react-router-dom";
import logo from "@/assets/AnimalClinicPro.png";

export function NavBar(){

    
    const signUpButtonStyle = {
        backgroundColor: "#6c9286", // Altın rengi için ASCII renk kodu
        color: "#000000" ,// Metin rengi, isteğinize bağlı olarak ayarlayabilirsiniz
        border:"0",
        borderRadius:"15px",
        fontSize:"18px",
        padding:"8px 30px"
    };

    const loginButtonStyle = {
        backgroundColor: "#6c9286", // Kırmızı rengi için ASCII renk kodu
        color: "#000000", // Metin rengi, isteğinize bağlı olarak ayarlayabilirsiniz
        border:"0",
        borderRadius:"15px",
        fontSize:"18px",
        padding:"8px 30px"
    };

    const animalClinicProTextStyle = {
        color: "#00000" // İstediğiniz renge göre ayarlayabilirsiniz
    };


    return (
        <>
            <nav className="navbar navbar-expand bg-custom shadow-sm">
                <div className="container-fluid">
                <Link className="navbar-brand" to="/homepage">
                        <img src={logo} width={150} alt="AnimalClinicPro Logo" />
                        <span style={animalClinicProTextStyle}>AnimalClinicPro</span>
                    </Link> 
                    <ul className="navbar-nav">
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