import React, { useEffect, useState } from 'react';
import axios from "axios";
//import { getPastVaccineAppointments } from 'path-to-your-api';

function PastVaccineAppointments() {
  const [pastVaccineAppointments, setPastVaccineAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const fetchData = async () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                const response = await axios.get(`http://localhost:8080/api/vaccinations/clinic/${userId}`);
                if (response?.data?.length > 0) {
                    const reversedVaccineAppointments = response.data.reverse();
                    setPastVaccineAppointments(reversedVaccineAppointments);
                }
            } catch (error) {
                console.error('Error fetching the vaccination data', error);
            }
        }
    };
    fetchData();
}, []);

  const filteredAppoinments = pastVaccineAppointments.filter(
    (appointment) =>
      appointment?.customer?.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment?.customer?.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment?.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment?.animal?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment?.veterinarian?.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment?.veterinarian?.surname.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div>
      <div className={"p-lg-2"}>
      <input
        type="text"
        placeholder="Search Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '185px', height: '30px', padding: '5px', fontSize: '15px' }}
      />
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

            {loading ? (
            <Spinner />
          ) : filteredAppoinments.length > 0 ? (
            filteredAppoinments.map((appointment) => (
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
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          )}

            {/* {pastVaccineAppointments.map((appointment) => (
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
            ))} */}
          </thead>
        </table>
      </div>
    </div>
  );
}

export default PastVaccineAppointments;
