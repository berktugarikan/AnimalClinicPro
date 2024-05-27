import React, { useEffect, useState } from 'react';
import axios from "axios";
//import { getPastAppointments } from 'path-to-your-api';

function PastVaccineAppointments() {
  const [pastAppointments, setPastAppointments] = useState([]);
  const [loading, setLoading] = useState(false);


  
  useEffect(() => {
    const role = localStorage.getItem("role");
  
    if (role === "ROLE_VETERINARIAN") {
      // Veteriner rolü ise ilgili API'yi çağır
      const clinicId = localStorage.getItem("userId");
  
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/appointments/veterinarian/${clinicId}`);
          if (response.data.length > 0) {
            const reversedAppointments = response.data.reverse();
            setPastAppointments(reversedAppointments);
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    } else if (role === "ROLE_CUSTOMER") {
      // Müşteri rolü ise müşteriye özel API'yi çağır
      const customerId = localStorage.getItem("userId");
  
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/appointments/customer/${customerId}`);
          if (response.data.length > 0) {
            const reversedAppointments = response.data.reverse();
            setPastAppointments(reversedAppointments);
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    } else {
      console.log("Undefined role.");
    }
  }, []);
  

  const [searchTerm, setSearchTerm] = useState("");
  const [startFilterDate, setStartFilterDate] = useState("");
  const [endFilterDate, setEndFilterDate] = useState("");
  const filteredAppoinments = pastAppointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.appointmentDate); // Convert to Date object
  
    // Combine date filtering logic (early return if not applicable)
    if (startFilterDate !== "" && endFilterDate !== "") {
      if (appointmentDate < new Date(startFilterDate) || appointmentDate > new Date(endFilterDate)) {
        return false; // Early return if outside date range
      }
    }

    if (startFilterDate !== "" && endFilterDate === "") {
      if (appointmentDate < new Date(startFilterDate)) {
        return false; // Early return if outside date range
      }
    }

    if (startFilterDate === "" && endFilterDate !== "") {
      if (appointmentDate > new Date(endFilterDate)) {
        return false; // Early return if outside date range
      }
    }
  
    // Search logic using optional chaining and case-insensitive comparison
    return (
      (appointment?.customer?.firstname?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
       appointment?.customer?.surname?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
       appointment?.customer?.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
       appointment?.animal?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
       appointment?.veterinarian?.firstname?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
       appointment?.veterinarian?.surname?.toLowerCase()?.includes(searchTerm.toLowerCase()))
    );
  });


  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '185px', height: '40px', padding: '5px', fontSize: '15px' }}
        />

        <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <div className="mb-3">
            <label htmlFor="startFilterDate" className="form-label">Starting date</label>
            <input type="date" className="form-control" id="startFilterDate" name="startFilterDate"
              value={startFilterDate} onChange={(e) => setStartFilterDate(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="endFilterDate" className="form-label">Ending date</label>
            <input type="date" className="form-control" id="endFilterDate" name="endFilterDate"
              value={endFilterDate} onChange={(e) => setEndFilterDate(e.target.value)} />
          </div>
        </div>
      </div>
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
                <td>{appointment.veterinarian.firstname} {appointment.veterinarian.surname}</td>
                <td>{appointment.customer.firstname} {appointment.customer.surname}</td>
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
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          )}

          {/* {pastAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.veterinarian.firstname} {appointment.veterinarian.surname}</td>
              <td>{appointment.customer.firstname} {appointment.customer.surname}</td>
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
          ))} */}
        </thead>
      </table>
    </div>
  );
}

export default PastVaccineAppointments;
