import React from 'react';
import PastVaccineAppointments  from '../VetMainPage/components/PastVaccineAppointments';

const containerStyle = {
  display: 'flex',
  
};

const selectionBarStyle = {
  flex:'1',
};

const pastVaccineAppointmentsStyle ={
  flex:'1',
};

function VetGenelARG() {
  return (
    <div>
      <h1>Veterinary Vaccine Appointments History</h1>
      <div style={containerStyle}>

        <PastVaccineAppointments style ={pastVaccineAppointmentsStyle} />
      </div>
    </div>
  );
}

export default VetGenelARG;
