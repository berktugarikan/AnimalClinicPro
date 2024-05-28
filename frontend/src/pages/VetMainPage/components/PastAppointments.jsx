import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Modal, Button, Spinner } from 'react-bootstrap';

function PastVaccineAppointments() {
  const [pastAppointments, setPastAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startFilterDate, setStartFilterDate] = useState("");
  const [endFilterDate, setEndFilterDate] = useState("");
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [editStatus, setEditStatus] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);

    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (role === "ROLE_VETERINARIAN") {
          const clinicId = localStorage.getItem("userId");
          response = await axios.get(`http://localhost:8080/api/appointments/veterinarian/${clinicId}`);
        } else if (role === "ROLE_CUSTOMER") {
          const customerId = localStorage.getItem("userId");
          response = await axios.get(`http://localhost:8080/api/appointments/customer/${customerId}`);
        } else {
          console.error("Undefined role.");
          return;
        }

        if (response.data.length > 0) {
          const reversedAppointments = response.data.reverse();
          setPastAppointments(reversedAppointments);
        }
      } catch (error) {
        console.error("Error fetching the appointment data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAppointments = pastAppointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.appointmentDate);

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
    setEditStatus(appointment.status);
    setEditDescription(appointment.appointmentDescription);
    setEditModalShow(true);
  };

  const handleEditSubmit = async () => {
    try {
      const {
        id,
        appointmentDate,
        appointmentTime,
        appointmentType,
        animal,
        customer,
        veterinarian,
      } = selectedAppointment;

      const payload = {
        date: appointmentDate,
        dateTime: appointmentTime,
        appointmentType,
        appointmentStatus: editStatus,
        description: editDescription,
        animalId: animal.id,
        customerId: customer.id,
        veterinarianId: veterinarian.id
      };

      await axios.put(`http://localhost:8080/api/appointments/${id}`, payload);

      const fetchUpdatedAppointments = async () => {
        let response;
        if (role === "ROLE_VETERINARIAN") {
          const clinicId = localStorage.getItem("userId");
          response = await axios.get(`http://localhost:8080/api/appointments/veterinarian/${clinicId}`);
        } else if (role === "ROLE_CUSTOMER") {
          const customerId = localStorage.getItem("userId");
          response = await axios.get(`http://localhost:8080/api/appointments/customer/${customerId}`);
        } else {
          console.error("Undefined role.");
          return;
        }

        if (response.data.length > 0) {
          const reversedAppointments = response.data.reverse();
          setPastAppointments(reversedAppointments);
        }
      };

      fetchUpdatedAppointments();

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
      await axios.delete(`http://localhost:8080/api/appointments/${selectedAppointment.id}`);
      setDeleteModalShow(false);
      window.location.reload();
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
              <th scope='col'>Appointment Date</th>
              <th scope='col'>Appointment Time</th>
              <th scope='col'>Appointment Type</th>
              <th scope='col'>Appointment Description</th>
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
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.appointmentTime}</td>
                  <td>{appointment.appointmentType}</td>
                  <td>{appointment.appointmentDescription}</td>
                  <td>
                    <span className="badge rounded-pill text-bg-primary">
                      {appointment.status}
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
                <td colSpan="9" className="text-center">No appointments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="editStatus" className="form-label">Appointment Status</label>
            <select id="editStatus" className="form-select" value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
              <option value="PENDING">Pending</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="editDescription" className="form-label">Appointment Description</label>
            <textarea id="editDescription" className="form-control" value={editDescription} onChange={(e) => setEditDescription(e.target.value)}></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Appointment will be deleted. Are you sure?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModalShow(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteSubmit}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PastVaccineAppointments;
