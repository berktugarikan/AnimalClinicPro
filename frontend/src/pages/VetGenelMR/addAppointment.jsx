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
                const role = localStorage.getItem('role');
                const clinicId = localStorage.getItem("clinicId");
                
                if(role === 'ROLE_VETERINARIAN') {
                    const vetResponse = await axios.get(`http://localhost:8080/api/users/${localStorage.getItem("userId")}`);
                    setVeterinarian([vetResponse.data]);
                    if (vetResponse.data) {
                        setFormData((prevData) => ({
                            ...prevData,
                            veterinarianId: vetResponse.data.id
                        }));
                    }
                    const customerResponse = await axios.get("http://localhost:8080/api/users/customers", {
                        params: {
                            clinicId: clinicId
                        }
                    });
                    setCustomer(customerResponse.data);
                    if (customerResponse.data.length > 0) {
                        setFormData((prevData) => ({
                            ...prevData,
                            customerId: customerResponse.data[0].id
                        }));
                    }
                } else if (role === 'ROLE_CUSTOMER') {
                    const customerResponse = await axios.get(`http://localhost:8080/api/users/${localStorage.getItem("userId")}`);
                    setCustomer([customerResponse.data]);
                    if (customerResponse.data) {
                        setFormData((prevData) => ({
                            ...prevData,
                            customerId: customerResponse.data.id
                        }));
                    }
                    const vetResponse = await axios.get(`http://localhost:8080/api/users/clinic/${clinicId}/vets`);
                    setVeterinarian(vetResponse.data);
                    if (vetResponse.data.length > 0) {
                        setFormData((prevData) => ({
                            ...prevData,
                            veterinarianId: vetResponse.data[0].id
                        }));
                    }                  
                
                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (formData.customerId) {
            axios.get(`http://localhost:8080/api/animals/owner/${formData.customerId}`)
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
        }
    }, [formData.customerId]);

    function timeInMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
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
    };

    const handleChangeCustomer = (e) => {
        const customerId = +e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            customerId: customerId,
            animalId: 0 // Reset the animalId when customer changes
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
        const animalId = +e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            animalId: animalId
        }));
    };
    const role = localStorage.getItem('role');
    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/appointments', formData)
            .then(response => {
                if (response.status === 200) {
                    
                    navigate("/vetgenelmrg")
                }
            })
            .catch(error => {
                console.log(error);
            })
    };


    
    const [vaccinationHistory, setVaccinationHistory] = useState([]);
    const [appointmentHistory, setAppointmentHistory] = useState([]);

    const fetchVaccinationHistoryByVetId = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/vaccinations/veterinarian/${formData.veterinarianId}`);

            if (response.data.length > 0) {
                setVaccinationHistory(response.data);
                // console.log("History:", response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchAppointmentHistoryByVetId = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/appointments/veterinarian/${formData.veterinarianId}`);

            if (response.data.length > 0) {
                setAppointmentHistory(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchVaccinationHistoryByVetId();
        fetchAppointmentHistoryByVetId();
    }, [veterinarian])

    const [filteredVaccinationHistory, setFilteredVaccinationHistory] = useState([]);
    const [filteredAppointmentHistory, setFilteredAppointmentHistory] = useState([]);

    const getVaccinationHistoryBySelectedDate = () => {
        const history = vaccinationHistory.filter((history) => history.vaccinationDate === formData.date);
        setFilteredVaccinationHistory(history);
    }
    const getAppointmentHistoryBySelectedDate = () => {
        const history = appointmentHistory.filter((history) => history.appointmentDate === formData.date);
        setFilteredAppointmentHistory(history);
    }

    useEffect(() => {
        getVaccinationHistoryBySelectedDate();
        getAppointmentHistoryBySelectedDate()
    }, [vaccinationHistory, appointmentHistory, formData.date])



    // const timeOptions = [];
    const [timeOptions, setTimeOptions] = useState([]);
    const updateTimeOptions = () => {
        setTimeOptions([]);
        console.log("updateTimeOptions called");
        // console.log("updateTimeOptions timeOptions:", timeOptions);
        // console.log("UpdateTimeOptions filteredVaccinationHistory[0].vaccinationTime: ",filteredVaccinationHistory[0]?.vaccinationTime)
        for (let hour = 9; hour < 18; hour++) {
            for (let minute = 0; minute <= 40; minute += 20) {
                const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
                let exists = false;
                if (formattedTime) {
                    filteredVaccinationHistory.forEach((history) => {
                        if (formattedTime === history.vaccinationTime) {
                            exists = true;
                        }
                    })
                    filteredAppointmentHistory.forEach((history) => {
                        if (formattedTime === history.appointmentTime) {
                            exists = true;
                        }
                    })

                    if (!exists) {
                        // timeOptions.push(formattedTime);
                        setTimeOptions((prev) => [...prev, formattedTime])
                    }
                }
            }
        }
    }
    useEffect(() => {
        updateTimeOptions()
    }, [filteredVaccinationHistory, filteredAppointmentHistory])


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
                            <label htmlFor="Animal" className="form-label">Animal</label>
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
                            <select value={formData.dateTime} name="dateTime" id="Appointment_Time" onChange={handleChange}>
                                <option value="">Select Time</option>
                                {timeOptions?.map((time, index) => (
                                    <option key={index} value={time}>{time}</option>
                                ))}
                            </select>
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
                                {/* ROLE_CUSTOMER ise sadece 'PENDING' seçeneği gösterilir */}
                                {role === 'ROLE_CUSTOMER' && (
                                    <option value="PENDING">PENDING</option>
                                )}
                                {/* Diğer roller için tüm durumlar gösterilir */}
                                {role !== 'ROLE_CUSTOMER' && statues.map((status, index) => (
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