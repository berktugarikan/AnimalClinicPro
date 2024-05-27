import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

const SelectionBar = () => {
  const [selectedPage, setSelectedPage] = React.useState();
  const navigate = useNavigate();

  const pages = [
    { name: 'Patient Admission', path: '/vetgenelhastakabul' },
    { name: 'Appointments', path: '/addAppointment' },
    { name: 'Appointment History', path: '/vetgenelmrg' },
    { name: 'Vaccine Add', path: '/vetgenelargadd' },
    { name: 'Vaccine Appointment History', path: '/vetgenelarg' },
    { name: 'Laboratory Tests', path: '/vetgeneltahlil' },
    { name: 'Laboratory Result Add', path: '/addLabResult' },
    { name: 'Payment', path: '/payment' },
    { name: 'Payment History', path: '/vetgenelödemegeçmişi' },
    {name: 'Clinic Product', path: '/clinicproduct'},
    {name: 'Reminder', path: '/reminder'}
  ];

  // Eğer kullanıcı ROLE_CUSTOMER ise ve sayfa ROLE_CUSTOMER için engellenmişse, pages dizisinden kaldır
  if (localStorage.getItem('role') === 'ROLE_CUSTOMER') {
    const forbiddenPages = ['/vetgenelhastakabul', '/addAppointment', '/vetgenelargadd', '/addLabResult', '/payment', '/clinicproduct', '/vetgenelargadd'];
    forbiddenPages.forEach(forbiddenPage => {
      const index = pages.findIndex(page => page.path === forbiddenPage);
      if (index !== -1) {
        pages.splice(index, 1);
      }
    });
  }

  const handlePageClick = (page) => {
    setSelectedPage(page.path);
    navigate(page.path);
  };

  return (
    <Box
      sx={{
        height: '100%',
        maxWidth: 300,
        bgcolor: 'white',
        borderRadius: '5px',
        display: {
          xs: 'none',
          lg: 'flex'
        },
        padding: '0px 8px 0px 8px',
      }}
    >
      <nav aria-label="main mailbox folders" style={{ width: "100%" }}>
        <List style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          {pages.map((page) => (
            <ListItem key={page.path} disablePadding style={{ width: "100%" }}>
              <ListItemButton
                style={{ width: "100%" }}
                selected={selectedPage === page.path}
                onClick={() => handlePageClick(page)}
                sx={{ borderRadius: '5px' }}
              >
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default SelectionBar;
