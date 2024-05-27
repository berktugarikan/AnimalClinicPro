import React, { useEffect, useState } from 'react';
import axios from "axios";
//import { getPastVaccineAppointments } from 'path-to-your-api';

function PastVaccineAppointments() {
  const [pastVaccineAppointments, setPastVaccineAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [startFilterDate, setStartFilterDate] = useState("");
  const [endFilterDate, setEndFilterDate] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");

    const fetchData = async () => {
      try {
        if (role === "ROLE_VETERINARIAN") {
          const userId = localStorage.getItem("userId");
          if (userId) {
            const response = await axios.get(`http://localhost:8080/api/vaccinations/clinic/${userId}`);
            if (response?.data?.length > 0) {
              const reversedVaccineAppointments = response.data.reverse();
              setPastVaccineAppointments(reversedVaccineAppointments);
            }
          }
        } else if (role === "ROLE_CUSTOMER") {
          const customerId = localStorage.getItem("userId");
          if (customerId) {
            const response = await axios.get(`http://localhost:8080/api/vaccinations/customer/${customerId}`);
            if (response?.data?.length > 0) {
              const reversedVaccineAppointments = response.data.reverse();
              setPastVaccineAppointments(reversedVaccineAppointments);
            }
          }
        } else {
          console.error("Undefined role.");
        }
      } catch (error) {
        console.error("Error fetching the vaccination data", error);
      }
    };

    fetchData();
  }, []);


  const filteredAppoinments = pastVaccineAppointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.vaccinationDate); // Convert to Date object

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
      <div className={"p-lg-2"}>
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
              <th scope='col'>Date</th>
              <th scope='col'>Time</th>
              <th scope='col'>Type</th>
              <th scope='col'>Description</th>
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
                  <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '200px' }}>{appointment.vaccinationDescription}</td>
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
