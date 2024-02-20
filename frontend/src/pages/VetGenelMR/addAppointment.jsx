import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SelectionBar from "@/shared/components/SelectionBar.jsx";

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
        appointmentDate: '',
        appointmentTime: '',
        appointmentType: '',
        appointmentDescription: '',
        status: '',
        animalId: {},
        customerId: {},
        veterinarianId: {},
    });

    useEffect(() => {
        const fetchData = async () => {
            const responseAnimal = await axios.get('http://localhost:8080/api/animals');
            const responseCustomer = await axios.get('http://localhost:8080/api/customer-users');
            const responseVetenerian = await axios.get('http://localhost:8080/api/veterinarian-users');


            setAnimal(responseAnimal.data);
            setCustomer(responseCustomer.data);
            setVetenerian(responseVetenerian.data);
        };
        fetchData();
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === 'appointmentTime') {
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

    const handleSubmit = async (e) => {


        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/appointments', formData);

            console.log('Appointment successfully added!');
        } catch (error) {
            console.error('Error adding appointment:', error.response || error);

        }
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
                            <select name='customerId' onChange={handleChange}>
                                {customer.map((item, index) => (
                                    <option key={index} value={item.id}>{item.user.firstname}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Animal</label>
                            <select name='animalId' onChange={handleChange}>
                                {animal.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Veterenerian" className="form-label">Veterenerian</label>
                            <select name='veterinarianId' onChange={handleChange}>
                                {veterinarian.map((item, index) => (
                                    <option key={index} value={item.id}>{item.user.firstname}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Appointment_Date" className="form-label">Appointment Date</label>
                            <input type="date" className="form-control" id="Appointment_Date" name="appointmentDate"
                                   value={formData.appointmentDate} onChange={handleChange} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Appointment_Time" className="form-label">Appointment Time</label>
                            <input type="time" className="form-control" id="Appointment_Time" name="appointmentTime"
                                   value={formData.appointmentTime} onChange={handleChange} required/>
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
                                   name="appointmentDescription" value={formData.appointmentDescription}
                                   onChange={handleChange} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select name='status' onChange={handleChange}>
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
