import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const appointmentTypes = ['EMERGENCY', 'CHECKUP', 'SURGERY', 'CONSULTATION', 'VACCINATION'];
const statues = ['PENDING', 'COMPLETED', 'CANCELLED'];

export function AddAppointment() {
    const [animal, setAnimal] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [veterinarian, setVeterinarian] = useState([]);
    const today = new Date().toISOString().split('T')[0];

    const [appointments, setAppointments] = useState([]);

    const [formData, setFormData] = useState({
        date: '',
        dateTime: '',
        appointmentType: appointmentTypes[0],
        description: '',
        appointmentStatus: statues[0],
        animalId: 0,
        customerId: 0,
        veterinarianId: localStorage.getItem("userId"),
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clinicId = localStorage.getItem("clinicId"); // Local storage'dan clinic ID'yi al
                const customerResponse = await axios.get("http://localhost:8080/api/users/customers", {
                    params: {
                        clinicId: clinicId // Clinic ID'yi query parametresi olarak ekle
                    }
                });
                setCustomer(customerResponse.data);
                if (customerResponse.data.length > 0) {
                    setFormData((prevData) => ({
                        ...prevData,
                        customerId: customerResponse.data[0].id
                    }));
                }

                const vetResponse = await axios.get(`http://localhost:8080/api/users/${localStorage.getItem("userId")}`);
                setVeterinarian([vetResponse.data]);
                if (vetResponse.data) {
                    setFormData((prevData) => ({
                        ...prevData,
                        veterinarianId: vetResponse.data.id
                    }));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/animals/owner/${customer[0]?.id}`)
            .then(response => {
                setAnimal(response.data);
                if (response.data.length > 0) {
                    setFormData((prevData) => ({
                        ...prevData,
                        animalId: response.data[0].id
                    }));
                }
            })
            .catch(error => {
                console.log(error);
            })
    }, [customer]);

    function timeInMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'dateTime') {
            const selectedTimeInMinutes = timeInMinutes(value);
            const selectedDaysAppointments = appointments.filter((appointment) => appointment.appointmentDate === formData.date)
            var available = true;

            selectedDaysAppointments.forEach((app) => {
                const appStartTimeInMin = timeInMinutes(app.appointmentTime);
                const appEndTimeInMin = timeInMinutes(app.appointmentTime) + 60;

                if (appStartTimeInMin <= selectedTimeInMinutes && selectedTimeInMinutes < appEndTimeInMin) {
                    available = false;
                }
            })

            if (!available) { return toast.error("Time not Available!") };

            setFormData((prevData) => ({
                ...prevData,
                [name]: value + ':00',
            }));
        } else {
            if (name === 'date') {
                setFormData((prevData) => ({
                    ...prevData,
                    dateTime: '',
                    [name]: value
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            }
        }
    };

    const handleChangeCustomer = (e) => {
        const customerId = +e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            customerId: customerId
        }));
        axios.get(`http://localhost:8080/api/animals/owner/${customerId}`)
            .then(response => {
                setAnimal(response.data);
                if (response.data.length > 0) {
                    setFormData((prevData) => ({
                        ...prevData,
                        animalId: response.data[0].id
                    }));
                }
            })
            .catch(error => {
                console.log(error);
            })
    };

    const handleChangeAnimal = (e) => {
        formData.animalId = + e.target.value
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        axios.post('http://localhost:8080/api/appointments', formData)
            .then(response => {
                if (response.status === 200) {
                    navigate("/vetmainpage")
                }
            })
            .catch(error => {
                console.log(error);
            })

    };

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <div className="card flex-grow-1">
                <div className="card-header text-center fs-4">Add Appointment</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="Customer" className="form-label">Customer</label>
                            <select value={formData.customerId} name='customerId' onChange={handleChangeCustomer}>
                                {customer.map((item, index) => (
                                    <option key={index} value={item.id}>{item.firstname} {item.surname} ({item.username})</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Animal</label>
                            <select value={formData.animalId} name='animalId' onChange={handleChangeAnimal}>
                                {animal.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name} - ({item.type})</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Veterinarian" className="form-label">Veterinarian</label>
                            <select value={formData.veterinarianId} name='veterinarianId' onChange={handleChange}>
                                {veterinarian.map((item, index) => (
                                    <option key={index} value={item.id}>{item.firstname} {item.surname}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Appointment_Date" className="form-label">Appointment Date</label>
                            <input type="date" className="form-control" id="Appointment_Date" name="date"
                                value={formData.date} onChange={handleChange} min={today} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Appointment_Time" className="form-label">Appointment Time</label>
                            <input type="time" className="form-control" id="Appointment_Time" name="dateTime"
                                value={formData.dateTime} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Appointment_Type" className="form-label">Appointment Type</label>
                            <select value={formData.appointmentType} name="appointmentType" id="appointmentType" onChange={handleChange}>
                                <option value="">Select Type</option>
                                {appointmentTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Appointment_Description" className="form-label">Appointment Description</label>
                            <input type="text" className="form-control" id="Appointment_Description"
                                name="description" value={formData.description} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select value={formData.appointmentStatus} name='appointmentStatus' onChange={handleChange}>
                                {statues.map((status, index) => (
                                    <option key={index} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
