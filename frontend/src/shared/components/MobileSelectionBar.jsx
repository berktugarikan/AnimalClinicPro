import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

export default function MobileSelectionBar() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const pages = [
        { name: 'Patient Admission', path: '/vetgenelhastakabul' },
        { name: 'Appointments', path: '/addAppointment' },
        { name: 'Appointment History', path: '/vetgenelmrg' },
        { name: 'Vaccine Appointment History', path: '/vetgenelarg' },
        { name: 'Vaccine Add', path: '/vetgenelargadd' },
        { name: 'Laboratory Tests', path: '/vetgeneltahlil' },
        { name: 'Laboratory Result Add', path: '/addLabResult' },
        { name: 'Payment', path: '/payment' },
        { name: 'Payment History', path: '/vetgenelödemegeçmişi' }];

    const settings = [
        { name: "Profile", link: 'vetprofilbilgileri' },
        { name: 'Change Password', link: 'vetşifredeğiştirme' },
    ]


    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };


    const DrawerList = (
        <Box sx={{ width: 250, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {pages.map((page, index) => (
                    <ListItem key={page.name} disablePadding>
                        <Link style={{ textDecoration: "none" }} to={page.path}>
                            <ListItemButton>
                                {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
                                <ListItemText primary={page.name} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Divider />

            <Box sx={{ display: "flex", flexDirection: "column", gap: "5px", justifyContent: "center", alignItems: "center", padding: "10px" }}>

                <Box sx={{ display: "flex", flexDirection: "row", gap: "5px", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="button">{localStorage.getItem("username")}</Typography>

                    <IconButton onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("username");
                        localStorage.removeItem("role");
                        localStorage.removeItem("userId");
                        navigate('/login');
                    }}>
                        <LogoutIcon />
                        <Typography textAlign="center">Logout</Typography>
                    </IconButton>
                </Box>

                <Link to="/vetşifredeğiştirme">Change Password</Link>
            </Box>


        </Box>
    );

    return (
        <div>
            <IconButton sx={{ display: { lg: "none" } }} onClick={toggleDrawer(true)}><MenuIcon /></IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
