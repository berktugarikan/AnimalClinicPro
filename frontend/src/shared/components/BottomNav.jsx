import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import ScienceIcon from '@mui/icons-material/Science';
import PetsIcon from '@mui/icons-material/Pets';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useNavigate } from 'react-router-dom';


export default function CustomBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const navigate = useNavigate(); 

  React.useEffect(() => {
    if(value === 0) return;
    ref.current.ownerDocument.body.scrollTop = 0;
    console.log("bottom:", value)

    navigate(`/${value}`);
  }, [value]);

  return (
    <Box sx={{ pb: 7, display: { lg: "none" } }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction value="vetgenelhastakabul" label="General" icon={<LocalHospitalIcon />} />
          <BottomNavigationAction value="vethasta" label="Patients" icon={<PetsIcon />} />
          <BottomNavigationAction value="vetlaboratory" label="Laboratory" icon={<ScienceIcon />} />
          <BottomNavigationAction value="vetfinancial" label="Finance" icon={<PaymentsIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}