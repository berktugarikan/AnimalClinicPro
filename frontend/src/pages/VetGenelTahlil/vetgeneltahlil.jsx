import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const VetGenelTahlil = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedTest, setSelectedTest] = useState({});
  const [editStatus, setEditStatus] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchData();
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const role = localStorage.getItem("role");
    try {
      if (role === "ROLE_VETERINARIAN") {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const response = await axios.get(`http://localhost:8080/api/lab-tests/veterinarian/${userId}`);
          if (response?.data?.length > 0) {
            const reversedResults = response.data.reverse();
            // Test tarihini doğru formata dönüştür
            const formattedResults = reversedResults.map(result => ({
              ...result,
              testDate: new Date(result.testDate).toISOString().split('T')[0] // YYYY-MM-DD formatında test tarihini al
            }));
            setResults(formattedResults);
          }
        }
      } else if (role === "ROLE_CUSTOMER") {
        const customerId = localStorage.getItem("userId");
        if (customerId) {
          const response = await axios.get(`http://localhost:8080/api/lab-tests/customer/${customerId}`);
          if (response?.data?.length > 0) {
            const reversedResults = response.data.reverse();
            // Test tarihini doğru formata dönüştür
            const formattedResults = reversedResults.map(result => ({
              ...result,
              testDate: new Date(result.testDate).toISOString().split('T')[0] // YYYY-MM-DD formatında test tarihini al
            }));
            setResults(formattedResults);
          }
        }
      } else {
        console.error("Undefined role.");
      }
    } catch (error) {
      console.error("Error fetching lab test data", error);
    } finally {
      setLoading(false);
    }
  };

  const endpointParam = location.pathname;

  const [startFilterDate, setStartFilterDate] = useState("");
  const [endFilterDate, setEndFilterDate] = useState("");

  const filteredLabResults = results.filter((appointment) => {
    const appointmentDate = new Date(appointment.testDate); // Convert to Date object

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

  const handleEditModalShow = (test) => {
    setSelectedTest(test);
    setEditStatus(test.testStatus);
    setEditDescription(test.testDescription);
    setEditModalShow(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:8080/api/lab-tests/${selectedTest.id}`, {
        testStatus: editStatus,
        testDescription: editDescription,
        testDate: selectedTest.testDate, // Test tarihi
        animalId: selectedTest.animal.id, // Hayvan ID'si
        veterinarianId: selectedTest.veterinarian.id // Veteriner ID'si
      });
      // Reload data after edit
      fetchData();
      setEditModalShow(false);
    } catch (error) {
      console.error("Error updating lab test:", error);
    }
  };

  const handleDeleteConfirmation = async (id) => {
    if (window.confirm("This Lab result will be deleted. Are you Sure?")) {
      try {
        await axios.delete(`http://localhost:8080/api/lab-tests/${id}`);
        // Reload data after delete
        fetchData();
      } catch (error) {
        console.error("Error deleting lab test:", error);
      }
    }
  };

  return (
    <div>
      <h2>Lab Results</h2>

      <div className='d-flex flex-row'>
        <div className='flex-grow-1'>
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
                  <th>Animal</th>
                  <th scope='col'>Test Date</th>
                  <th scope='col'>Test Description</th>
                  <th scope='col'>Test Status</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7">Loading...</td>
                  </tr>
                ) : filteredLabResults.length > 0 ? (
                  filteredLabResults.map((result) => (
                    <tr key={result.id}>
                      <td>{result?.veterinarian?.firstname} - {result?.veterinarian?.surname}</td>
                      <td>{result?.customer?.firstname} - {result?.customer?.surname}</td>
                      <td>{result?.animal?.name}</td>
                      <td>{result.testDate}</td>
                      <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '200px' }}>{result.testDescription}</td>
                      <td>
                        <span className="badge rounded-pill text-bg-primary">
                          {result.testStatus}
                        </span>
                      </td>
                      <td>
                        {role === "ROLE_CUSTOMER" ? (
                          // For ROLE_CUSTOMER, hide edit and delete buttons
                          null
                        ) : (
                          <>
                            <Button variant="secondary" onClick={() => handleEditModalShow(result)}>Edit</Button>{' '}
                            <Button variant="danger" onClick={() => handleDeleteConfirmation(result.id)}>Delete</Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No lab results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Edit Modal */}
      <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Lab Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="editStatus" className="form-label">Test Status</label>
            <select id="editStatus" className="form-select" value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
              <option value="PENDING">Pending</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="editDescription" className="form-label">Test Description</label>
            <textarea className="form-control" id="editDescription" rows="3" value={editDescription} onChange={(e) => setEditDescription(e.target.value)}></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalShow(false)}>Close</Button>
          <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VetGenelTahlil;
