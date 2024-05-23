import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AddLabResult() {
    const statues = [
        'PENDING',
        'COMPLETED',
        'CANCELLED'
    ];
    const [result, setNewResult] = useState({
        testDate: '',
        testDescription: '',
        veterinarianId: localStorage.getItem("userId"),
        animalId: '',
        testStatus: statues[0]
    });
    const today = new Date().toISOString().split('T')[0];

    const [veterinarians, setVeterinarians] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewResult({ ...result, [name]: value });
    };

    const handleCreateResult = async () => {
        delete result.customer;
        axios.post("http://localhost:8080/api/lab-tests", result, {
            headers: "Bearer " + localStorage.getItem("token")
        })
            .then(response => {
                if (response.status === 200) {
                    navigate("/vetmainpage");
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        const fetchVeterinarian = async () => {
            axios.get('http://localhost:8080/api/users/vets')
                .then(response => {
                    if (response.data.length > 0) {
                        setVeterinarians(response.data);
                        setNewResult(prevResult => ({
                            ...prevResult,
                            veterinarianId: localStorage.getItem("userId")
                        }));
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        };

        const fetchCustomer = async () => {
            axios.get('http://localhost:8080/api/users/customers')
                .then(response => {
                    console.log(response.data)
                    if (response.data.length > 0) {
                        setCustomers(response.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
        fetchVeterinarian();
        fetchCustomer();
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/animals/owner/${customers[0]?.id}`)
        .then(response => {
            setAnimals(response.data);
            if (response.data.length > 0) {
                setNewResult((prevData) => ({
                    ...prevData,
                    animalId: response.data[0].id
                }));
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, [customers])

    const handleChangeVeterenerian = (e) => {
        console.log(e.target.value)
        const vetId = parseInt(e.target.value);
        setNewResult(prevData => ({
            ...prevData,
            veterinarianId: vetId
        }));
    }

    const handleChangeCustomer = (e) => {
        const customerId = +e.target.value;
        axios.get(`http://localhost:8080/api/animals/owner/${customerId}`)
            .then(response => {
                setAnimals(response.data);
                if (response.data.length > 0) {
                    setNewResult(prevData => ({
                        ...prevData,
                        animalId: response.data[0].id
                    }));
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleChangeAnimal = (e) => {
        const animalId = +e.target.value;
        setNewResult(prevData => ({
            ...prevData,
            animalId: animalId
        }));
    };

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <div className="card flex-grow-1">
                <div className="card-header text-center fs-4">Add Lab Result</div>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="Veterenerian" className="form-label">Veterenerian</label>
                            <select value={result.veterinarianId} name='veterinarianId' onChange={handleChangeVeterenerian} defaultValue={localStorage.getItem("userId")}>
                                {veterinarians.map((item, index) => (
                                    <option key={index} value={item.id}>{item.firstname} {item.surname} </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Customer" className="form-label">Customer</label>
                            <select name='customerId' onChange={handleChangeCustomer} >
                                {customers.map((item, index) => (
                                    <option key={index} value={item.id}>{item.firstname} {item.surname} ({item.username})</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Animal</label>
                            <select value={result.animalId} name='animalId' onChange={handleChangeAnimal}>
                                {animals.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name} - ({item.type})</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select value={result.testStatus} name='testStatus' onChange={handleInputChange}>
                                {statues.map((status, index) => (
                                    <option key={index} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Appointment_Date" className="form-label">Test Date</label>
                            <input type="date" className="form-control" id="Appointment_Date" name="testDate"
                                value={result.testDate} onChange={handleInputChange} min={today} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">
                                Description:
                                <input
                                    type="text"
                                    name="testDescription"
                                    value={result.testDescription}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </label>
                        </div>
                        <button
                            type="button"
                            onClick={handleCreateResult}
                            className="btn btn-primary"
                        >
                            Add Result
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddLabResult;
