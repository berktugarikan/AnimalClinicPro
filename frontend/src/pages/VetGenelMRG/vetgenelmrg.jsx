import React from 'react';
import SelectionBar from '@/shared/components/SelectionBar';
import PastAppointments  from '../VetMainPage/components/PastAppointments';

const containerStyle = {
  display: 'flex',
  
};

const selectionBarStyle = {
  flex:'1',
};

const pastAppointmentsStyle ={
  flex:'1',
};

function VetGenelAR() {
  return (
    <div>
      <h1>Veterinary Appointments History</h1>
      <div style={containerStyle}>
        <SelectionBar style={selectionBarStyle} />
        <PastAppointments style ={pastAppointmentsStyle} />
      </div>
    </div>
  );
}

export default VetGenelAR;
