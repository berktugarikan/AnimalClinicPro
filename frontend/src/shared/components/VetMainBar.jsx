// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import logo from "@/assets/AnimalClinicPro.png";
// import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";


// const pages = [
//     { name: 'General', link: 'vetgenelhastakabul' },
//     { name: 'Patient', link: 'vethasta' },
//     { name: 'Financial', link: 'vetfinancial' },
//     { name: 'Laboratory', link: 'vetlaboratory' },
// ];


// const settings = [
//     { name: localStorage.getItem('username'), link: 'vetprofilbilgileri' },
//     { name: 'Change Password', link: 'vetşifredeğiştirme' },
// ]
//     ;

// function VetMainBar() {
//     const [anchorElUser, setAnchorElUser] = React.useState(null);
//     const navigate = useNavigate();
//     const handleOpenUserMenu = (event) => {
//         setAnchorElUser(event.currentTarget);
//     };

//     const handleCloseUserMenu = () => {
//         setAnchorElUser(null);
//     };

//     return (
//         <AppBar position="static" sx={{ background: '#f7f7f7' }}>
//             <Toolbar disableGutters sx={{ paddingX: 0 }}>
//                 <Box sx={{ flexGrow: 1 }}>
//                     <Link to="/vetmainpage" style={{ textDecoration: 'none' }}>
//                         <Typography
//                             variant="h6"
//                             noWrap
//                             component="a"
//                             href="#app-bar-with-responsive-menu"
//                             sx={{
//                                 fontFamily: 'monospace',
//                                 fontWeight: 700,
//                                 letterSpacing: '.3rem',
//                                 color: 'inherit',
//                                 textDecoration: 'none',
//                             }}
//                         >
//                             <Box sx={{ flexGrow: 1 }}>
//                                 <Avatar alt="AnimalClinicPro Logo" src={logo}
//                                     sx={{ width: { xs: 80, sm: 100, md: 120 }, height: { xs: 80, sm: 100, md: 120 } }} />
//                             </Box>
//                         </Typography>
//                     </Link>
//                 </Box>


//                 <Box sx={{ display: 'flex', gap: { xs: 2, sm: 4, md: 10 } }}>
//                     {pages.map((page) => (
//                         <Link
//                             key={page.name}
//                             to={`/${page.link}`}
//                             style={{ textDecoration: 'none' }}
//                         >
//                             <Button
//                                 key={page.name}
//                                 sx={{
//                                     color: 'black',
//                                     fontSize: { xs: '5px', sm: '10px', md: '20px' },
//                                     background: '#c3dfd6',
//                                     borderRadius: '15px',
//                                 }}
//                             >
//                                 {page.name}
//                             </Button>
//                         </Link>
//                     ))}
//                 </Box>


//                 <Box sx={{ flexGrow: 0 }} className={"text-black p-lg-2"}>
//                         <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} className={"p-lg-2"}>
//                             <Avatar alt="" src="/static/images/avatar/2.jpg" />
//                         </IconButton>
//                     <Menu
//                         id="menu-appbar"
//                         anchorEl={anchorElUser}
//                         anchorOrigin={{
//                             vertical: 'top',
//                             horizontal: 'right',
//                         }}
//                         keepMounted
//                         transformOrigin={{
//                             vertical: 'top',
//                             horizontal: 'right',
//                         }}
//                         open={Boolean(anchorElUser)}
//                         onClose={handleCloseUserMenu}
//                     >
//                         {settings.map((setting) => (
//                             <Link key={setting.name} to={`/${setting.link}`} style={{ textDecoration: 'none' }}>
//                                 <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
//                                     <Typography textAlign="center">{setting.name}</Typography>
//                                 </MenuItem>
//                             </Link>
//                         ))}

//                         <MenuItem onClick={handleCloseUserMenu}>
//                             <Link style={{ textDecoration: 'none' }} onClick={() => {
//                                 localStorage.removeItem('authUser');
//                                 localStorage.removeItem('user-token');
//                                 navigate('/login');
//                             }}>
//                                 <Typography textAlign="center">Logout</Typography>
//                             </Link>
//                         </MenuItem>

//                     </Menu>
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     );
// }

// export default VetMainBar;

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import { Link } from 'react-router-dom';

// import logo from "@/assets/AnimalClinicProNoBg.png";

// const pages = [
//     { name: 'General', link: 'vetgenelhastakabul' },
//     { name: 'Patient', link: 'vethasta' },
//     { name: 'Financial', link: 'vetfinancial' },
//     { name: 'Laboratory', link: 'vetlaboratory' },
// ];


// const settings = [
//     { name: "Profile", link: 'vetprofilbilgileri' },
//     { name: 'Change Password', link: 'vetşifredeğiştirme' },
// ]

// function ResponsiveAppBar() {
//     const [anchorElNav, setAnchorElNav] = React.useState(null);
//     const [anchorElUser, setAnchorElUser] = React.useState(null);

//     const handleOpenNavMenu = (event) => {
//         setAnchorElNav(event.currentTarget);
//     };

//     const handleCloseNavMenu = () => {
//         setAnchorElNav(null);
//     };

//     const handleOpenUserMenu = (event) => {
//         setAnchorElUser(event.currentTarget);
//     };
//     const handleCloseUserMenu = () => {
//         setAnchorElUser(null);
//     };

//     return (
//         <AppBar position="static" sx={{ bgcolor: "#82a298" }} >
//             <Container maxWidth="xl">
//                 <Toolbar disableGutters>
//                     <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//                         <Link to="/vetmainpage" style={{ textDecoration: 'none' }}>

//                             <Avatar variant='square' alt="AnimalClinicPro Logo" src={logo}
//                                 sx={{ width: { xs: 100, sm: 100, md: 100 }, height: { xs: 80, sm: 80, md: 80 } }} />

//                         </Link>
//                     </Box>
//                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//                         <IconButton
//                             size="large"
//                             aria-label="account of current user"
//                             aria-controls="menu-appbar"
//                             aria-haspopup="true"
//                             onClick={handleOpenNavMenu}
//                             color="inherit"
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                         <Menu
//                             id="menu-appbar"
//                             anchorEl={anchorElNav}
//                             anchorOrigin={{
//                                 vertical: 'bottom',
//                                 horizontal: 'left',
//                             }}
//                             keepMounted
//                             transformOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'left',
//                             }}
//                             open={Boolean(anchorElNav)}
//                             onClose={handleCloseNavMenu}
//                             sx={{
//                                 display: { xs: 'block', md: 'none' },
//                             }}
//                         >
//                             {pages.map((page) => (
//                                 <Link
//                                     key={page.name}
//                                     to={`/${page.link}`}
//                                     style={{ textDecoration: 'none' }}
//                                 >
//                                     <MenuItem key={page} onClick={handleCloseNavMenu}>
//                                         <Typography textAlign="center">{page.name}</Typography>
//                                     </MenuItem>
//                                 </Link>

//                             ))}
//                         </Menu>
//                     </Box>
//                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//                         <Link to="/vetmainpage" style={{ textDecoration: 'none' }}>

//                             <Avatar variant='square' alt="AnimalClinicPro Logo" src={logo}
//                                 sx={{ width: { xs: 100, sm: 100, md: 100 }, height: { xs: 80, sm: 80, md: 80 } }} />

//                         </Link>
//                     </Box>
//                     <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: '10px' }}>
//                         {pages.map((page) => (
//                             <Link
//                                 key={page.name}
//                                 to={`/${page.link}`}
//                                 style={{ textDecoration: 'none' }}
//                             >
//                                 <Button
//                                     key={page.name}
//                                     size='large'
//                                     sx={{ my: 2, color: 'white', display: 'block', fontSize: '16px' }}
//                                 >
//                                     {page.name}
//                                 </Button>
//                             </Link>
//                         ))}
//                     </Box>

//                     <Box sx={{ flexGrow: 0 }}>
//                         <Tooltip title="Open settings">
//                             <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
//                                 <Typography>{localStorage.getItem("username")}</Typography>
//                                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                                     <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//                                 </IconButton>
//                             </Box>
//                         </Tooltip>
//                         <Menu
//                             sx={{ mt: '45px' }}
//                             id="menu-appbar"
//                             anchorEl={anchorElUser}
//                             anchorOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right',
//                             }}
//                             keepMounted
//                             transformOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right',
//                             }}
//                             open={Boolean(anchorElUser)}
//                             onClose={handleCloseUserMenu}
//                         >
//                             {settings.map((setting) => (
//                                 <Link key={setting.name} to={`/${setting.link}`} style={{ textDecoration: 'none' }}>
//                                     <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
//                                         <Typography textAlign="center">{setting.name}</Typography>
//                                     </MenuItem>
//                                 </Link>
//                             ))}

//                             <MenuItem onClick={handleCloseUserMenu}>
//                                 <Link style={{ textDecoration: 'none' }} onClick={() => {
//                                     localStorage.removeItem('authUser');
//                                     localStorage.removeItem('user-token');
//                                     navigate('/login');
//                                 }}>
//                                     <Typography textAlign="center">Logout</Typography>
//                                 </Link>
//                             </MenuItem>
//                         </Menu>
//                     </Box>
//                 </Toolbar>
//             </Container>
//         </AppBar >
//     );
// }
// export default ResponsiveAppBar;


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
                        {pages.map((page) => (
                            <Nav.Link key={page.name} onClick={page.name === 'General' ? handleGeneralPageClick : () => navigate(page.link)}>
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