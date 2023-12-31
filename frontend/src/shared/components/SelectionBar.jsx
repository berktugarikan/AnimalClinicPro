import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const pages = ['Hasta Kabul', 'Muayene Randevu', 'Muayene Randevu Geçmişi', 'Aşı Randevuları', 'Aşı Randevu Geçmişi', 'Tahliller', 'Hasta Ödeme Geçmişi'];

export default function SelectionBar() {
  const [selectedPage, setSelectedPage] = React.useState('Hasta Kabul');

  const handlePageClick = (page) => {
    setSelectedPage(page);
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
                <ListItemText primary={page} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
