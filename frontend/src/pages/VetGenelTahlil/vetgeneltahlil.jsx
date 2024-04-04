import * as React from 'react';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import SelectionBar from '@/shared/components/SelectionBar';
import axios from 'axios';


const VetGenelTahlil = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            axios.get('http://localhost:8080/api/lab-tests')
                .then(response => {
                    setResults(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        };
        fetchData();
    }, []);


    const endpointParam = location.pathname;

    useEffect(() => {
        if (endpointParam === '/vetlaboratory') {
            navigate('/vetgeneltahlil');
        }
    }, [endpointParam, navigate]);

    return (
        <div>
            <h2>Lab Results</h2>

            <div className='d-flex flex-row'>

                <div><SelectionBar/></div>


                <div className='flex-grow-1'>

                    <div>
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
                            {results.map((result) => (
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
                            ))}
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VetGenelTahlil;
