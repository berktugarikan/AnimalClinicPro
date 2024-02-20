import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

const pages = [
  {name:'Patient Admission',path:'/vetgenelhastakabul'},
  {name: 'Appointments', path:'/addAppointment'},
  {name:'Appointment History', path:'/vetgenelmrg'},
  {name:'Vaccine Appointment History',path:'/vetgenelarg'},
  {name:'Laboratory Tests',path:'/vetgeneltahlil'},
  {name:'Payment History',path:'/vetgenelödemegeçmişi'}];

export default function SelectionBar() {
  const [selectedPage, setSelectedPage] = React.useState();
  const navigate=useNavigate();

  const handlePageClick = (page) => {
    setSelectedPage(page.name);
    navigate(page.path);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 300,
        bgcolor: '#c3dfd6',
      }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          {pages.map((page) => (
            <ListItem key={page} disablePadding>
              <ListItemButton
                selected={selectedPage === page}
                onClick={() => handlePageClick(page)}
                sx={{
                  bgcolor: selectedPage === page ? '#6c9286' : '#c3dfd6',
                  '&:hover': {
                    backgroundColor: selectedPage === page ? '#6c9286' : '#c3dfd6',
                  },
                }}
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
