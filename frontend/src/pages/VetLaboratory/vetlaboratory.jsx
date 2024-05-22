import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';


const LabResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8080/api/lab-tests');
            if (response.data.length > 0) {
                const reversedData = response.data.reverse();
                setResults(reversedData);
            }
            console.log(response.data)
        };
        fetchData();
    }, []);



    const filteredLabResults = results.filter(
        (result) =>
            result?.customer?.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result?.customer?.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result?.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result?.animal?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result?.veterinarian?.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result?.veterinarian?.surname.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <div>
            <h2>Lab Results</h2>

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
                            <th>Anmimal</th>
                            <th scope='col'>Test Date</th>
                            <th scope='col'>Test Type</th>
                            <th scope='col'>Test Description</th>
                            <th scope='col'>Test Status</th>
                        </tr>


                        {loading ? (
                            <Spinner />
                        ) : filteredLabResults.length > 0 ? (
                            filteredLabResults.map((result) => (
                                <tr key={result?.id}>
                                    <td>{result?.veterinarian?.firstname} - {result?.veterinarian?.surname}</td>
                                    <td>{result?.customer?.firstname} - {result?.customer?.surname}</td>
                                    <td>{result?.animal?.name}</td>
                                    <td>{result.testDate}</td>
                                    <td>{result?.labTestType?.testTypeName}</td>
                                    <td>{result?.testDescription}</td>
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
                            <tr key={result?.id}>
                                <td>{result?.veterinarian?.firstname} - {result?.veterinarian?.surname}</td>
                                <td>{result?.customer?.firstname} - {result?.customer?.surname}</td>
                                <td>{result?.animal?.name}</td>
                                <td>{result.testDate}</td>
                                <td>{result?.labTestType?.testTypeName}</td>
                                <td>{result?.testDescription}</td>
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
    );
};

export default LabResults;
