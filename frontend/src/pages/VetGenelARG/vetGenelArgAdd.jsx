import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function VetGenelArgAdd() {
    const statues = [
        'PENDING',
        'COMPLETED',
        'CANCELLED'
    ]
    const [result, setNewResult] = useState({
        vaccinationDate: '',
        vaccinationDescription: '',
        veterinarianId: localStorage.getItem("userId"),
        customerId: '',
        animalId: '',
        vaccinationStatus: statues[0],
        vaccinationTime: ''
    })

    const today = new Date().toISOString().split('T')[0];

    const [veterinarians, setVeterinarians] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [appointments, setAppoinments] = useState([]);

    const navigate = useNavigate();

    function timeInMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'vaccinationTime') {
            const selectedTimeInMinutes = timeInMinutes(value);
            const selectedDaysAppointments = appointments.filter((appointment) => appointment.vaccinationDate === result.vaccinationDate)
            var available = true;
            selectedDaysAppointments.forEach((app) => {
                const appStartTimeInMin = timeInMinutes(app.vaccinationTime);
                const appEndTimeInMin = timeInMinutes(app.vaccinationTime) + 60;

                if (appStartTimeInMin <= selectedTimeInMinutes && selectedTimeInMinutes < appEndTimeInMin) {
                    available = false;
                }
            })
            if (!available) { return toast.error("Time not Available!") };
            setNewResult((prevData) => ({
                ...prevData,
                [name]: value + ':00',
            }));
        } else {
            if (name === 'vaccinationDate') {
                setNewResult((prevData) => ({
                    ...prevData,
                    vaccinationTime: '',
                    [name]: value
                }));
            } else {
                setNewResult((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            }
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
                    if (response.data.length > 0) {
                        setFormData((prevData) => ({
                            ...prevData,
                            veterinarianId: localStorage.getItem("userId")
                        }));
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        };

        const fetchCustomer = async () => {
            axios.get('http://localhost:8080/api/users/customers')
                .then(response => {
                    setCustomers(response.data);
                    if (response.data.length > 0) {
                        setFormData((prevData) => ({
                            ...prevData,
                            customerId: response.data[0].id
                        }));
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }

        const fetchAppointments = async () => {
            const response = await axios.get("http://localhost:8080/api/vaccinations");
            setAppoinments(response.data);
        }

        fetchVeterinarian();
        fetchCustomer();
        fetchAppointments();
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
        <div style={{ display: 'flex', width: '100%' }}>

            <div className="card flex-grow-1">
                <div className="card-header text-center fs-4">Vaccine Add</div>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="Veterenerian" className="form-label">Veterenerian</label>
                            <select value={result.veterinarianId} name='veterinarianId' onChange={handleChangeVeterenerian} defaultValue={localStorage.getItem("userId")}>
                                {veterinarians.map((item, index) => (
                                    <option key={index} value={item.id}>{item.firstname} {item.surname}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Customer" className="form-label">Customer</label>
                            <select value={result.customerId} name='customerId' onChange={handleChangeCustomer}>
                                {customers.map((item, index) => (
                                    <option key={index} value={item.id}>{item.firstname} {item.surname} - ({item.username})</option>
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
                            <select value={result.vaccinationStatus} name='vaccinationStatus' onChange={handleInputChange}>
                                {statues.map((status, index) => (
                                    <option key={index} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Appointment_Date" className="form-label">Appointment Date</label>
                            <input type="date" className="form-control" id="Appointment_Date" name="vaccinationDate"
                                value={result.vaccinationDate} onChange={handleInputChange} min={today} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Appointment_Time" className="form-label">Appointment Time</label>
                            <input type="time" className="form-control" id="Appointment_Time" name="vaccinationTime"
                                value={result.vaccinationTime} onChange={handleInputChange} required />
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
                    </form>
                </div>
            </div>
        </div >
    );
}

export default VetGenelArgAdd;
