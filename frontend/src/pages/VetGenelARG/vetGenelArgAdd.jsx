import React, {useEffect} from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function VetGenelArgAdd() {
    const [result, setNewResult] = useState({
        vaccinationDate: '',
        vaccinationDescription: '',
        veterinarianId: 0,
        customerId: 0,
        animalId: 0,
        vaccinationStatus: '',
        vaccinationTime: ''
    })

    const appointmentTypes = ['EMERGENCY', 'CHECKUP', 'SURGERY', 'CONSULTATION', 'VACCINATION'];
    const statues = [
        'PENDING',
        'COMPLETED',
        'CANCELLED'
    ]

    const [veterinarians, setVeterinarians] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const {name, value} = e.target;

        if (name === 'vaccinationTime') {
            setNewResult((prevData) => ({
                ...prevData,
                [name]: value + ':00',
            }));
        } else {
            setNewResult((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleCreateResult = async () => {
        axios.post("http://localhost:8080/api/vaccinations", result, {
            headers: "Bearer " + localStorage.getItem("token")
        })
            .then(response => {
                if (response.status === 200) {
                    navigate("/vetmainpage");
                }
            })
            .catch(error => {
                console.log(error);
            })
    };

    useEffect(() => {
        const fetchVeterinarian = async () => {
            axios.get('http://localhost:8080/api/users/vets')
                .then(response => {
                    setVeterinarians(response.data)
                    result.veterinarianId = veterinarians[0].id;
                })
                .catch(error => {
                    console.log(error)
                })
        };

        const fetchCustomer = async () => {
            axios.get('http://localhost:8080/api/users/customers')
                .then(response => {
                    setCustomers(response.data);
                    result.customerId = customers[0].id;
                })
                .catch(error => {
                    console.log(error);
                })
        }
        fetchVeterinarian();
        fetchCustomer();
    }, []);

    const handleChangeVeterenerian = (e) => {
        const veterinarianId = +e.target.value;
        result.veterinarianId = veterinarianId;
        setNewResult(prevData => ({
            ...prevData,
            veterinarianId: veterinarianId
        }));
    };

    const handleChangeCustomer = (e) => {
        const customerId = +e.target.value;
        result.customerId = customerId; 
        axios.get(`http://localhost:8080/api/animals/owner/${customerId}`)
            .then(response => {
                setAnimals(response.data);
                setNewResult(prevData => ({
                    ...prevData,
                    animalId: response.data.length > 0 ? response.data[0].id : 0
                }));
            })
            .catch(error => {
                console.log(error);
            });
    };


    const handleChangeAnimal = (e) => {
        result.animalId = + e.target.value
    };

    return (
        <div className="container">
            <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
                <form className="card">
                    <div className="text-center card-header">
                        <h1 style={{ color: '#6c9286' }}>Vaccine Add</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="Veterenerian" className="form-label">Veterenerian</label>
                            <select name='veterinarianId' onChange={handleChangeVeterenerian}>
                                {veterinarians.map((item, index) => (
                                    <option key={index} value={item.id}>{item.firstname} {item.surname}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Customer" className="form-label">Customer</label>
                            <select name='customerId' onChange={handleChangeCustomer}>
                                {customers.map((item, index) => (
                                    <option key={index} value={item.id}>{item.firstname} {item.surname}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Animal</label>
                            <select name='animalId' onChange={handleChangeAnimal}>
                                {animals.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name} - ({item.type})</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select name='vaccinationStatus' onChange={handleInputChange}>
                                {statues.map((status, index) => (
                                    <option key={index} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Appointment_Date" className="form-label">Appointment Date</label>
                            <input type="date" className="form-control" id="Appointment_Date" name="vaccinationDate"
                                   value={result.vaccinationDate} onChange={handleInputChange} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Appointment_Time" className="form-label">Appointment Time</label>
                            <input type="time" className="form-control" id="Appointment_Time" name="vaccinationTime"
                                   value={result.vaccinationTime} onChange={handleInputChange} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">
                                Description:
                                <input
                                    type="text"
                                    name="vaccinationDescription"
                                    value={result.vaccinationDescription}
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
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VetGenelArgAdd;
