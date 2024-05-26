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

    useEffect(() => {
        if (endpointParam === '/vetlaboratory') {
            navigate('/vetgeneltahlil');
        }
    }, [endpointParam, navigate]);

    const filteredLabResults = results.filter(
        (result) =>
            result?.customer?.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result?.customer?.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result?.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result?.animal?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result?.veterinarian?.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result?.veterinarian?.surname?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>Lab Results</h2>

            <div className='d-flex flex-row'>
                <div className='flex-grow-1'>
                    <div>
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
                                    <th>Animal</th>
                                    <th scope='col'>Test Date</th>
                                    <th scope='col'>Test Description</th>
                                    <th scope='col'>Test Status</th>
                                </tr>

                                {loading ? (
                                    <tr>
                                        <td colSpan="6">Loading...</td>
                                    </tr>
                                ) : filteredLabResults.length > 0 ? (
                                    filteredLabResults.map((result) => (
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
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No lab results found</td>
                                    </tr>
                                )}
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VetGenelTahlil;
