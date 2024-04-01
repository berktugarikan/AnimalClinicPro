import React, {useEffect} from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function VetGenelArgAdd() {
    const [result, setNewResult] = useState({
        type: '',
        date: '',
        description: '',
        veterinarian: '',
        customer: '',
        animal: '',
        status: '',
        time: ''
    });
    const [veterinarians, setVeterinarians] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewResult({ ...result, [name]: value });
    };

    const handleCreateResult = async () => {
        try {
            console.log('Result:', result)
            return

            const response = await axios.post('http://localhost:8080/api/veterinarian-users', result);
            if(response.status === 201){
                navigate('/vetmainpage')
            }
            console.log('Başarılı:', response.data);
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    };

    useEffect(() => {
        const fetchVeterinarian = async () => {
            const response = await axios.get('http://localhost:8080/api/veterinarian-users')
            setVeterinarians(response.data)
        };

        const fetchCustomer = async () => {
            const response = await axios.get('http://localhost:8080/api/customer-users')
            setCustomers(response.data)
        }

        const fetchAnimal = async () => {
            const response = await axios.get('http://localhost:8080/api/animals')
            setAnimals(response.data)
        }

        fetchVeterinarian();
        fetchCustomer();
        fetchAnimal()
    }, []);

    return (
        <div className="container">
            <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
                <form className="card">
                    <div className="text-center card-header">
                        <h1 style={{ color: '#6c9286' }}>Vaccine Add</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">
                                Veterinarian:
                                <select style={{flex: 1}} name="veterinarian" required>

                                    <option value="">Select Veterinarian</option>
                                    {
                                        veterinarians.map((veterinarian) => (
                                            <option key={veterinarian.id} value={veterinarian.id}>{veterinarian.user.firstname} - {veterinarian.user.surname}</option>
                                        ))
                                    }
                                </select>
                            </label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label" >
                                Customer:
                                <select style={{flex: 1}} name="customer" required>

                                    <option value="">Select Customer</option>
                                    {
                                        customers.map((customer) => (
                                            <option key={customer.id} value={customer.id}>{customer.user.firstname} - {customer.user.surname}</option>
                                        ))
                                    }
                                </select>
                            </label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">
                                Animal:
                                <select style={{flex: 1}} name="animal" required>

                                    <option value="">Select Animal</option>
                                    {
                                        animals.map((animals) => (
                                            <option key={animals.id} value={animals.id}>{animals.user.firstname} - {animals.user.surname}</option>
                                        ))
                                    }
                                </select>
                            </label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">
                                Appointment  Type:
                                <select style={{flex: 1}} name="type" required>

                                    <option value="">Select Type</option>
                                </select>
                            </label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">
                                Status:
                                <select style={{flex: 1}} name="status" required>
                                    <option value="">Select Status</option>
                                </select>
                            </label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">
                                Appointment Date:
                                <input
                                    type="date"
                                    name="date"
                                    value={result.date}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">
                                Appointment Time:
                                <input
                                    type="time"
                                    name="time"
                                    value={result.date}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">
                                Description:
                                <input
                                    type="text"
                                    name="description"
                                    value={result.description}
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
