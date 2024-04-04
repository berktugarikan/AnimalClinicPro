import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SelectionBar from "@/shared/components/SelectionBar.jsx";
import {useNavigate} from "react-router-dom";

const appointmentTypes = ['EMERGENCY', 'CHECKUP', 'SURGERY', 'CONSULTATION', 'VACCINATION'];
const statues = [
    'PENDING',
    'COMPLETED',
    'CANCELLED'
]

export function AddAppointment() {
    const [animal, setAnimal] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [veterinarian, setVetenerian] = useState([]);

    const [formData, setFormData] = useState({
        date: '',
        dateTime: '',
        appointmentType: '',
        description: '',
        appointmentStatus: '',
        animalId: 0,
        customerId: 0,
        veterinarianId: 0,
    });

    const navigate=useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customerResponse = await axios.get("http://localhost:8080/api/users/customers");
                setCustomer(customerResponse.data);
                if (customerResponse.data.length > 0) {
                    setFormData((prevData) => ({
                        ...prevData,
                        customerId: customerResponse.data[0].id
                    }));
                }
    
                const veterinarianResponse = await axios.get("http://localhost:8080/api/users/vets");
                setVetenerian(veterinarianResponse.data);
                if (veterinarianResponse.data.length > 0) {
                    setFormData((prevData) => ({
                        ...prevData,
                        veterinarianId: veterinarianResponse.data[0].id
                    }));
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();
    }, []);

 

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === 'dateTime') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value + ':00',
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
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

    const handleChangeVeterenerian = (e) => {
        formData.veterinarianId = + e.target.value
    }

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
        <div className='d-flex flex-row'>
            <div>
                <SelectionBar/>
            </div>


            <div className="card flex-grow-1">
                <div className="card-header text-center fs-4">Add Appointment</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="Customer" className="form-label">Customer</label>
                            <select name='customerId' onChange={handleChangeCustomer}>
                                {customer.map((item, index) => (
                                    <option key={index} value={item.id}>{item.firstname} {item.surname}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Animal</label>
                            <select name='animalId' onChange={handleChangeAnimal}>
                                {animal.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name} - ({item.type})</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Veterenerian" className="form-label">Veterenerian</label>
                            <select name='veterinarianId' onChange={handleChangeVeterenerian}>
                                {veterinarian.map((item, index) => (
                                    <option key={index} value={item.id}>{item.firstname} {item.surname}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Appointment_Date" className="form-label">Appointment Date</label>
                            <input type="date" className="form-control" id="Appointment_Date" name="date"
                                   value={formData.date} onChange={handleChange} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Appointment_Time" className="form-label">Appointment Time</label>
                            <input type="time" className="form-control" id="Appointment_Time" name="dateTime"
                                   value={formData.dateTime} onChange={handleChange} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Appointment_Type" className="form-label">Appointment Type</label>
                            <select name="appointmentType" id="appointmentType" onChange={handleChange}>
                                <option value="">Select Type</option>
                                {appointmentTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Appointment_Description" className="form-label">Appointment
                                Description</label>
                            <input type="text" className="form-control" id="Appointment_Description"
                                   name="description" value={formData.description}
                                   onChange={handleChange} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select name='appointmentStatus' onChange={handleChange}>
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
