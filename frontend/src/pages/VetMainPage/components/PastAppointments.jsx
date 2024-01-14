import React, { useEffect, useState } from 'react';
//import { getPastAppointments } from 'path-to-your-api'; 

function PastVaccineAppointments() {
  const [pastAppointments, setPastAppointments] = useState([]);

  /*useEffect(() => {
    // API'den geçmiş randevuları çekme
    getPastAppointments()
      .then(response => setPastAppointments(response.data))
      .catch(error => console.error('Geçmiş randevu çekme hatası: ', error));
  }, []); */

  return (
    <div>
      
      <ul>
        {pastAppointments.map(appointment => (
          <li key={appointment.id}>
            {appointment.customerName} - {appointment.appointmentDate}
          
          </li>
        ))}
        </ul> 
    </div>
  );
}

export default PastVaccineAppointments;
