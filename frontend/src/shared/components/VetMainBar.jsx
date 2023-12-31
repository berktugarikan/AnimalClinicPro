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
import { Link } from 'react-router-dom';

const pages = ['General', 'Patient', 'Financial', 'Laboratory'];
const settings = ['Profile Info', 'Change Password', 'Logout'];

function VetMainBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ background: '#f7f7f7'}}>
      <Toolbar disableGutters sx={{ paddingX: 0 }}>
        {/* Sol tarafta logo */}
        <Box sx={{ flexGrow: 1 }}>
  <Link to="/vetmainpage" style={{ textDecoration: 'none' }}>
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
      <Box sx={{ flexGrow: 1 }}>
        <Avatar alt="AnimalClinicPro Logo" src={logo} sx={{ width: { xs: 80, sm: 100, md: 120 }, height: { xs: 80, sm: 100, md: 120 } }} />
      </Box>
    </Typography>
  </Link>
</Box>


        {/* Sayfalar */}
        <Box sx={{ display: 'flex', gap: { xs:2, sm:4, md: 24 }}}>
          {pages.map((page) => (
             <Link key={page} to={`/${getPageLink(page)}`} style={{ textDecoration: 'none' }}>
            <Button
              key={page}
              sx={{ color: 'black',fontSize:{ xs:'18px', sm:'20px', md:'30px' }, background:'#c3dfd6', borderRadius:'15px' }}
            >
              {page}
            </Button>
            </Link>
          ))}
        </Box>

        {/* Sağ tarafta kullanıcı profil bölümü */}
        <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="" src="/static/images/avatar/2.jpg" />
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
              <Link key={setting} to={`/${getSettingLink(setting)}`} style={{ textDecoration: 'none' }}>
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
              </Link>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function getPageLink(page) {
  switch (page) {
    case 'General':
      return 'vetgenelhastakabul';
    case 'Patient':
      return 'vethasta';
    case 'Financial':
      return 'vetgenelödemegeçmişi';
    case 'Laboratory':
      return 'vetgeneltahlil';
    default:
      return '';
  }
}

function getSettingLink(setting) {
  switch (setting) {
    case 'Profile Info':
      return 'vetprofilbilgileri';
    case 'Change Password':
      return 'vetşifredeğiştirme';
    case 'Logout':
      return 'vetçıkış';
    default:
      return '';
  }
}

export default VetMainBar;
