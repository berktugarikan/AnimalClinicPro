import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Modal, Button, Spinner } from 'react-bootstrap';

function PastVaccineAppointments() {
  const [pastVaccineAppointments, setPastVaccineAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [editStatus, setEditStatus] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [startFilterDate, setStartFilterDate] = useState("");
  const [endFilterDate, setEndFilterDate] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);
    fetchData(role);
  }, []);

  const fetchData = async (role) => {
    setLoading(true);
    try {
      let response;
      if (role === "ROLE_VETERINARIAN") {
        const userId = localStorage.getItem("userId");
        if (userId) {
          response = await axios.get(`http://localhost:8080/api/vaccinations/clinic/${userId}`);
        }
      } else if (role === "ROLE_CUSTOMER") {
        const customerId = localStorage.getItem("userId");
        if (customerId) {
          response = await axios.get(`http://localhost:8080/api/vaccinations/customer/${customerId}`);
        }
      } else {
        console.error("Undefined role.");
        return;
      }

      if (response?.data?.length > 0) {
        const reversedVaccineAppointments = response.data.reverse();
        setPastVaccineAppointments(reversedVaccineAppointments);
      }
    } catch (error) {
      console.error("Error fetching the vaccination data", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = pastVaccineAppointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.vaccinationDate);

    if (startFilterDate !== "" && endFilterDate !== "") {
      if (appointmentDate < new Date(startFilterDate) || appointmentDate > new Date(endFilterDate)) {
        return false;
      }
    }

    if (startFilterDate !== "" && endFilterDate === "") {
      if (appointmentDate < new Date(startFilterDate)) {
        return false;
      }
    }

    if (startFilterDate === "" && endFilterDate !== "") {
      if (appointmentDate > new Date(endFilterDate)) {
        return false;
      }
    }

    return (
      (appointment?.customer?.firstname?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        appointment?.customer?.surname?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        appointment?.customer?.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        appointment?.animal?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        appointment?.veterinarian?.firstname?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        appointment?.veterinarian?.surname?.toLowerCase()?.includes(searchTerm.toLowerCase()))
    );
  });

  const handleEditModalShow = (appointment) => {
    setSelectedAppointment(appointment);
    setEditStatus(appointment.vaccinationStatus);
    setEditDescription(appointment.vaccinationDescription);
    setEditModalShow(true);
  };

  const handleEditSubmit = async () => {
    try {
      const { id, vaccinationDate, vaccinationTime, animal, veterinarian } = selectedAppointment;
      await axios.put(`http://localhost:8080/api/vaccinations/${id}`, {
        vaccinationStatus: editStatus,
        vaccinationDescription: editDescription,
        vaccinationDate,
        vaccinationTime,
        animalId: animal.id,
        veterinarianId: veterinarian.id,
      });
      fetchData(role);
      setEditModalShow(false);
    } catch (error) {
      console.error("Error updating the appointment:", error);
    }
  };

  const handleDeleteModalShow = (appointment) => {
    setSelectedAppointment(appointment);
    setDeleteModalShow(true);
  };

  const handleDeleteSubmit = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/vaccinations/${selectedAppointment.id}`);
      fetchData(role);
      setDeleteModalShow(false);
    } catch (error) {
      console.error("Error deleting the appointment:", error);
    }
  };


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
              <th>Animal</th>
              <th scope='col'>Date</th>
              <th scope='col'>Time</th>
              <th scope='col'>Description</th>
              <th scope='col'>Status</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center">
                  <Spinner animation="border" />
                </td>
              </tr>
            ) : filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment?.veterinarian?.firstname} {appointment?.veterinarian?.surname}</td>
                  <td>{appointment?.customer.firstname} {appointment?.customer.surname}</td>
                  <td>{appointment?.animal?.name}</td>
                  <td>{appointment.vaccinationDate}</td>
                  <td>{appointment.vaccinationTime}</td>

                  <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '200px' }}>{appointment.vaccinationDescription}</td>
                  <td>
                    <span className="badge rounded-pill text-bg-primary">
                      {appointment.vaccinationStatus}
                    </span>
                  </td>
                  <td>
                    {role === "ROLE_VETERINARIAN" && (
                      <>
                        <Button variant="secondary" onClick={() => handleEditModalShow(appointment)}>Edit</Button>{' '}
                        <Button variant="danger" onClick={() => handleDeleteModalShow(appointment)}>Delete</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No appointments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Vaccination Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="editStatus" className="form-label">Vaccination Status</label>
            <select id="editStatus" className="form-select" value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
              <option value="PENDING">Pending</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="editDescription" className="form-label">Vaccination Description</label>
            <textarea id="editDescription" className="form-control" value={editDescription} onChange={(e) => setEditDescription(e.target.value)}></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalShow(false)}>Close</Button>
          <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Vaccination will be deleted. Are you sure?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModalShow(false)}>No</Button>
          <Button variant="danger" onClick={() => { handleDeleteSubmit(); }}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PastVaccineAppointments;
