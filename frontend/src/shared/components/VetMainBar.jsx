import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import logo from "@/assets/AnimalClinicPro.png";
import {Link} from 'react-router-dom';
import {useNavigate} from "react-router-dom";


const pages = [
    {name: 'General', link: 'vetgenelhastakabul'},
    {name: 'Patient', link: 'vethasta'},
    {name: 'Financial', link: 'vetfinancial'},
    {name: 'Laboratory', link: 'vetlaboratory'},
];


const settings = [
        {name: 'Profile Info', link: 'vetprofilbilgileri'},
        {name: 'Change Password', link: 'vetşifredeğiştirme'},
    ]
;

function VetMainBar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{background: '#f7f7f7'}}>
            <Toolbar disableGutters sx={{paddingX: 0}}>
                <Box sx={{flexGrow: 1}}>
                    <Link to="/vetmainpage" style={{textDecoration: 'none'}}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Box sx={{flexGrow: 1}}>
                                <Avatar alt="AnimalClinicPro Logo" src={logo}
                                        sx={{width: {xs: 80, sm: 100, md: 120}, height: {xs: 80, sm: 100, md: 120}}}/>
                            </Box>
                        </Typography>
                    </Link>
                </Box>


                <Box sx={{display: 'flex', gap: {xs: 2, sm: 4, md: 24}}}>
                    {pages.map((page) => (
                        <Link
                            key={page.name}
                            to={`/${page.link}`}
                            style={{textDecoration: 'none'}}
                        >
                            <Button
                                key={page.name}
                                sx={{
                                    color: 'black',
                                    fontSize: {xs: '18px', sm: '20px', md: '30px'},
                                    background: '#c3dfd6',
                                    borderRadius: '15px',
                                }}
                            >
                                {page.name}
                            </Button>
                        </Link>
                    ))}
                </Box>


                <Box sx={{flexGrow: 0}}>
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                        <Avatar alt="" src="/static/images/avatar/2.jpg"/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <Link key={setting.name} to={`/${setting.link}`} style={{textDecoration: 'none'}}>
                                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            </Link>
                        ))}

                        <MenuItem onClick={handleCloseUserMenu}>
                            <Link style={{textDecoration: 'none'}} onClick={() => {
                                localStorage.removeItem('authUser');
                                localStorage.removeItem('user-token');
                                navigate('/login');
                            }}>
                                <Typography textAlign="center">Logout</Typography>
                            </Link>
                        </MenuItem>

                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default VetMainBar;
