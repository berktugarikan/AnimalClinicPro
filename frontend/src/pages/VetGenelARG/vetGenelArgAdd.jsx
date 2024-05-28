import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function VetGenelArgAdd() {
    const statues = [
        'PENDING',
        'COMPLETED',
        'CANCELLED'
    ];
    const [result, setNewResult] = useState({
        vaccinationDate: '',
        vaccinationDescription: '',
        veterinarianId: localStorage.getItem("userId"),
        customerId: '',
        animalId: '',
        vaccinationStatus: statues[0],
        vaccinationTime: ''
    });

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

    };

    const handleCreateResult = async () => {
        axios.post("http://localhost:8080/api/vaccinations", result, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
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
        const clinicId = localStorage.getItem("clinicId");

        const fetchVeterinarian = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/${localStorage.getItem("userId")}`);
                setVeterinarians([response.data]);
                if (response.data) {
                    setNewResult((prevData) => ({
                        ...prevData,
                        veterinarianId: response.data.id
                    }));
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchCustomer = async () => {
            const clinicId = localStorage.getItem("clinicId");
            const response = await axios.get("http://localhost:8080/api/users/customers", {
                params: {
                    clinicId: clinicId
                }
            })
                .then(response => {
                    setCustomers(response.data);
                    if (response.data.length > 0) {
                        setNewResult((prevData) => ({
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
        if (customers.length > 0) {
            axios.get(`http://localhost:8080/api/animals/owner/${customers[0].id}`)
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
        }
    }, [customers]);

    const handleChangeVeterenerian = (e) => {
        const veterinarianId = e.target.value;
        setNewResult(prevData => ({
            ...prevData,
            veterinarianId: veterinarianId
        }));
    };

    const handleChangeCustomer = (e) => {
        const customerId = e.target.value;
        setNewResult(prevData => ({
            ...prevData,
            customerId: customerId,
            animalId: ''
        }));
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
        const animalId = e.target.value;
        setNewResult(prevData => ({
            ...prevData,
            animalId: animalId
        }));
    };


    const [vaccinationHistory, setVaccinationHistory] = useState([]);
    const [appointmentHistory, setAppointmentHistory] = useState([]);

    const fetchVaccinationHistoryByVetId = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/vaccinations/veterinarian/${result.veterinarianId}`);

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
            const response = await axios.get(`http://localhost:8080/api/appointments/veterinarian/${result.veterinarianId}`);

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
    }, [result.veterinarianId])

    const [filteredVaccinationHistory, setFilteredVaccinationHistory] = useState([]);
    const [filteredAppointmentHistory, setFilteredAppointmentHistory] = useState([]);

    const getVaccinationHistoryBySelectedDate = () => {
        const history = vaccinationHistory.filter((history) => history.vaccinationDate === result.vaccinationDate);
        setFilteredVaccinationHistory(history);
    }
    const getAppointmentHistoryBySelectedDate = () => {
        const history = appointmentHistory.filter((history) => history.appointmentDate === result.vaccinationDate);
        setFilteredAppointmentHistory(history);
    }

    useEffect(() => {
        getVaccinationHistoryBySelectedDate();
        getAppointmentHistoryBySelectedDate()
    }, [vaccinationHistory, appointmentHistory, result.vaccinationDate])

    const [timeOptions, setTimeOptions] = useState([]);
    const updateTimeOptions = () => {
        setTimeOptions([]);
        // console.log("updateTimeOptions called");
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
                                    <option key={index} value={item.id}>{item.firstname} {item.surname}</option>
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
                            <label htmlFor="Appointment_Date" className="form-label">Vaccination Date</label>
                            <input type="date" className="form-control" id="Appointment_Date" name="vaccinationDate"
                                value={result.vaccinationDate} onChange={handleInputChange} min={today} required />
                        </div>
                        {/* <div className="mb-3">
                            <label htmlFor="Appointment_Time" className="form-label">Appointment Time</label>
                            <input type="time" className="form-control" id="Appointment_Time" name="vaccinationTime"
                                value={result.vaccinationTime} onChange={handleInputChange} required />
                        </div> */}

                        <div className="mb-3">
                            <label htmlFor="Appointment_Time" className="form-label">Appointment Time</label>
                            <select value={result.vaccinationTime} name="vaccinationTime" id="Appointment_Time" onChange={handleInputChange}>
                                <option value="">Select Time</option>
                                {timeOptions?.map((time, index) => (
                                    <option key={index} value={time}>{time}</option>
                                ))}
                            </select>
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
