import React from 'react';
import SelectionBar from '@/shared/components/SelectionBar';
import { AppointmentSchedule } from '../VetMainPage/components/AppointmentSchedule';

const containerStyle = {
  display: 'flex',
};

const selectionBarStyle = {
  flex: '1',
};

const appointmentScheduleStyle = {
  flex: '2',
};

function VetGenelMR() {
  return (
    <div>
      <h1>Veterinary Appointments</h1>
      <div style={containerStyle}>
        <SelectionBar style={selectionBarStyle} />
        <AppointmentSchedule style={appointmentScheduleStyle} />
      </div>
    </div>
  );
}

export default VetGenelMR;
