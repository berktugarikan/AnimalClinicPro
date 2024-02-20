import React, { useEffect, useState } from 'react';
import axios from "axios";
//import { getPastAppointments } from 'path-to-your-api';

function PastAppointments() {
  const [pastAppointments, setPastAppointments] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const response = await axios.get('http://localhost:8080/api/appointments');
      setPastAppointments(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <table className='table table-responsive'>
        <thead>
            <tr>
                <th>Veterinarian</th>
                <th scope='col'>Customer</th>
                <th>Animal</th>
                <th scope='col'>Appointment Date</th>
                <th scope='col'>Appointment Time</th>
                <th scope='col'>Appointment Type</th>
                <th scope='col'>Appointment Description</th>
                <th scope='col'>Status</th>
            </tr>
            {pastAppointments.map((appointment) => (
                <tr key={appointment.id}>
                <td>{appointment?.veterinarian?.user?.firstname} - {appointment?.veterinarian?.user?.surname}</td>
                <td>{appointment?.customer?.user?.firstname} - {appointment?.customer?.user?.surname}</td>
                <td>{appointment?.animal?.name}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>{appointment.appointmentType}</td>
                <td>{appointment.appointmentDescription}</td>
                <td>
                  <span className="badge rounded-pill text-bg-primary">
                    {appointment.status}
                  </span>

                </td>
                </tr>
            ))}
        </thead>
      </table>
    </div>
  );
}

export default PastAppointments;
