import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VetGenelTahlil = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        const role = localStorage.getItem("role");
      
        const fetchData = async () => {
          try {
            if (role === "ROLE_VETERINARIAN") {
              const userId = localStorage.getItem("userId");
              if (userId) {
                const response = await axios.get(`http://localhost:8080/api/lab-tests/veterinarian/${userId}`);
                if (response?.data?.length > 0) {
                  const reversedResults = response.data.reverse();
                  setResults(reversedResults);
                }
              }
            } else if (role === "ROLE_CUSTOMER") {
              const customerId = localStorage.getItem("userId");
              if (customerId) {
                const response = await axios.get(`http://localhost:8080/api/lab-tests/customer/${customerId}`);
                if (response?.data?.length > 0) {
                  const reversedResults = response.data.reverse();
                  setResults(reversedResults);
                }
              }
            } else {
              console.error("Undefined role.");
            }
          } catch (error) {
            console.error("Error fetching lab test data", error);
          }
        };
      
        fetchData();
      }, []);
      

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
                                </tr>


                                {loading ? (
                                    <Spinner />
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
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No users found</td>
                                    </tr>
                                )}
                                {/* {results.map((result) => (
                                    <tr key={result.id}>
                                        <td>{result?.veterinarian?.firstname} - {result?.veterinarian?.surname}</td>
                                        <td>{result?.customer?.firstname} - {result?.customer?.surname}</td>
                                        <td>{result?.animal?.name}</td>
                                        <td>{result.testDate}</td>
                                        <td>{result.testDescription}</td>
                                        <td>
                                            <span className="badge rounded-pill text-bg-primary">
                                                {result.testStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))} */}
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VetGenelTahlil;
