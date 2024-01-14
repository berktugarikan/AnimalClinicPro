import React, { useEffect, useState } from 'react';
//import { getPastVaccineAppointments } from 'path-to-your-api'; 

function PastVaccineAppointments() {
  const [pastVaccineAppointments, setPastVaccineAppointments] = useState([]);

  /*useEffect(() => {
    // API'den geçmiş aşı randevuları çekme
    getPastVaccineAppointments()
      .then(response => setPastVaccineAppointments(response.data))
      .catch(error => console.error('Geçmiş aşı randevusu çekme hatası: ', error));
  }, []); */

  return (
    <div>
      
      <ul>
        {pastVaccineAppointments.map(appointment => (
          <li key={appointment.id}>
            {appointment.customerName} - {appointment.appointmentDate}
          
          </li>
        ))}
        </ul> 
    </div>
  );
}

export default PastVaccineAppointments;
