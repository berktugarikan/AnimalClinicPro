import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

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

export default function SelectionBar() {
  const [selectedPage, setSelectedPage] = React.useState();
  const navigate = useNavigate();

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
        // marginTop: '5px',
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
            <ListItem key={page} disablePadding style={{ width: "100%" }}>
              <ListItemButton
                style={{ width: "100%" }}
                selected={selectedPage === page.path}
                onClick={() => handlePageClick(page)}
                // sx={{
                //   bgcolor: selectedPage === page.path ? '#6c9286' : '#c3dfd6',
                //   '&:hover': {
                //     backgroundColor: selectedPage === page.path ? '#6c9286' : '#c3dfd6',
                //   },
                // }}
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
}
