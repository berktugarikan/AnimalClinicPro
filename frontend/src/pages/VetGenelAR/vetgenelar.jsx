import React from 'react';
import SelectionBar from '@/shared/components/SelectionBar';
import { VaccineScheduleList } from '../VetMainPage/components/VaccineScheduleList';

const containerStyle = {
  display: 'flex',
};

const selectionBarStyle = {
  flex: '1',
};

const vaccineScheduleListStyle = {
  flex: '2', 
};

function VetGenelAR() {
  return (
    <div>
      <h1>Veterinary Vaccine Appointments</h1>
      <div style={containerStyle}>
        {/* <SelectionBar style={selectionBarStyle} /> */}
        <VaccineScheduleList style={vaccineScheduleListStyle} />
      </div>
    </div>
  );
}

export default VetGenelAR;
