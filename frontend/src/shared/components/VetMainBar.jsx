import logo from "@/assets/AnimalClinicProNoBg.png";
import { Avatar } from "@mui/material";

const pages = [
    { name: 'General', link: 'vetgenelhastakabul' },
    { name: 'Patient', link: 'vethasta' },
    { name: 'Financial', link: 'vetgenelödemegeçmişi' },
    { name: 'Laboratory', link: 'vetgeneltahlil' },
];

const settings = [
    { name: "Profile", link: 'vetprofilbilgileri' },
    { name: 'Change Password', link: 'vetşifredeğiştirme' },
]

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import MobileSelectionBar from "./MobileSelectionBar";

function VetMainBar() {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("role");

    const handleGeneralPageClick = () => {
        if (userRole === "ROLE_CUSTOMER") {
            alert("Access Denied");
            return;
        }
        navigate("/vetgenelhastakabul");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        navigate('/login');
    };

    // Filter pages based on user role
    const filteredPages = pages.filter(page => {
        // Hide 'Patient', 'Financial', and 'Laboratory' pages for ROLE_ADMIN
        if (userRole === "ROLE_ADMIN" && (page.name === 'General' || page.name === 'Patient' || page.name === 'Financial' || page.name === 'Laboratory')) {
            return false;
        }
        return true;
    });

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/vetmainpage">
                    <Avatar
                        variant='square'
                        alt="AnimalClinicPro Logo"
                        src={logo}
                        sx={{ width: { xs: 100, sm: 100, md: 100 }, height: { xs: 70, sm: 70, md: 70 } }}
                    />
                </Navbar.Brand>
                <MobileSelectionBar />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {filteredPages.map((page) => (
                            <Nav.Link key={page.name} onClick={() => navigate(page.link)}>
                                {page.name}
                            </Nav.Link>
                        ))}
                    </Nav>
                    <Nav>
                        <NavDropdown title={localStorage.getItem("username")} id="collapsible-nav-dropdown">
                            {settings.map((setting) => (
                                <NavDropdown.Item key={setting.name} href={setting.link}>
                                    {setting.name}
                                </NavDropdown.Item>
                            ))}
                            <NavDropdown.Item onClick={handleLogout}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default VetMainBar;
