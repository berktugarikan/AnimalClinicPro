import React, { useEffect, useState } from 'react';
import axios from "axios";
//import { getPastVaccineAppointments } from 'path-to-your-api';

function PastVaccineAppointments() {
  const [pastVaccineAppointments, setPastVaccineAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios.get("http://localhost:8080/api/vaccinations")
          .then(response => {
            setPastVaccineAppointments(response.data)
          })
    };
    fetchData();
  },[]);


  return (
    <div>
      <div className={"p-lg-2"}>
        <table className='table table-responsive'>
          <thead>
          <tr>
            <th>Veterinarian</th>
            <th scope='col'>Customer</th>
            <th>Anmimal</th>
            <th scope='col'>Appointment Date</th>
            <th scope='col'>Appointment Time</th>
            <th scope='col'>Appointment Type</th>
            <th scope='col'>Appointment Description</th>
            <th scope='col'>Status</th>
          </tr>
          {pastVaccineAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment?.veterinarian?.firstname} {appointment?.veterinarian?.surname}</td>
                <td>{appointment?.customer.firstname} {appointment?.customer.surname}</td>
                <td>{appointment?.animal?.name}</td>
                <td>{appointment.vaccinationDate}</td>
                <td>{appointment.vaccinationTime}</td>
                <td>{appointment.vaccinationStatus}</td>
                <td>{appointment.vaccinationDescription}</td>
                <td>
                  <span className="badge rounded-pill text-bg-primary">
                    {appointment.vaccinationStatus}
                  </span>
                </td>
              </tr>
          ))}
          </thead>
        </table>
      </div>
    </div>
  );
}

export default PastVaccineAppointments;
