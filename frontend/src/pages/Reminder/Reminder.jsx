import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function Reminder() {
    const [appointments, setAppointments] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('PENDING');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    const fetchAppointmentsVeterinarian = useCallback(async (status) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:8080/api/appointments/veterinarian/${userId}/${status}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(`Fetched ${status} appointments for veterinarian:`, response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setError('Failed to fetch appointments. Please try again later.');
            return [];
        }
    }, [userId]);

    const fetchVaccinationsVeterinarian = useCallback(async (status) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:8080/api/vaccinations/veterinarian/${userId}/${status}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(`Fetched ${status} vaccinations for veterinarian:`, response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching vaccinations:', error);
            setError('Failed to fetch vaccinations. Please try again later.');
            return [];
        }
    }, [userId]);

    const fetchAppointmentsCustomer = useCallback(async (status) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:8080/api/appointments/customer/${userId}/${status}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(`Fetched ${status} appointments for customer:`, response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setError('Failed to fetch appointments. Please try again later.');
            return [];
        }
    }, [userId]);

    const fetchVaccinationsCustomer = useCallback(async (status) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:8080/api/vaccinations/customer/${userId}/${status}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(`Fetched ${status} vaccinations for customer:`, response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching vaccinations:', error);
            setError('Failed to fetch vaccinations. Please try again later.');
            return [];
        }
    }, [userId]);

    useEffect(() => {
        const fetchData = async () => {
            let appointmentsData = [];
            let vaccinationsData = [];

            if (role === "ROLE_VETERINARIAN") {
                appointmentsData = await fetchAppointmentsVeterinarian(status);
                vaccinationsData = await fetchVaccinationsVeterinarian(status);
            } else if (role === "ROLE_CUSTOMER") {
                appointmentsData = await fetchAppointmentsCustomer(status);
                vaccinationsData = await fetchVaccinationsCustomer(status);
            }

            setAppointments(appointmentsData);
            setVaccinations(vaccinationsData);
        };

        fetchData();
    }, [role, status, fetchAppointmentsVeterinarian, fetchVaccinationsVeterinarian, fetchAppointmentsCustomer, fetchVaccinationsCustomer]);

    useEffect(() => {
        const allItems = [...appointments, ...vaccinations];

        const filtered = allItems.filter(
            (item) =>
                (item.customer?.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.customer?.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.customer?.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.animal?.name?.toLowerCase().includes(searchTerm.toLowerCase())) &&
                (!startDate || new Date(item.appointmentDate || item.vaccinationDate) >= new Date(startDate)) &&
                (!endDate || new Date(item.appointmentDate || item.vaccinationDate) <= new Date(endDate))
        );
        setFilteredItems(filtered);
    }, [searchTerm, startDate, endDate, appointments, vaccinations]);

    const updateStatus = async (id, newStatus, type) => {
        try {
            const token = localStorage.getItem("token");
            const url = type === 'appointment'
                ? `http://localhost:8080/api/appointments/status/${id}`
                : `http://localhost:8080/api/vaccinations/status/${id}`;

            const data = type === 'appointment'
                ? { appointmentStatus: newStatus }
                : { vaccinationStatus: newStatus };

            await axios.put(url, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Refresh data
            const appointmentsData = role === "ROLE_VETERINARIAN"
                ? await fetchAppointmentsVeterinarian(status)
                : await fetchAppointmentsCustomer(status);
            const vaccinationsData = role === "ROLE_VETERINARIAN"
                ? await fetchVaccinationsVeterinarian(status)
                : await fetchVaccinationsCustomer(status);

            setAppointments(appointmentsData);
            setVaccinations(vaccinationsData);
        } catch (error) {
            console.error('Error updating status:', error);
            setError('Failed to update status. Please try again later.');
        }
    };

    const handleStatusUpdate = async (id, newStatus, type) => {
        const confirmed = window.confirm("Are you sure you want to update the status?");
        if (confirmed) {
            await updateStatus(id, newStatus, type);
        }
    };

    const getStatusOptions = (currentStatus) => {
        switch (currentStatus) {
            case 'PENDING':
                return ['COMPLETED', 'CANCELLED'];
            case 'COMPLETED':
                return ['PENDING', 'CANCELLED'];
            case 'CANCELLED':
                return ['PENDING', 'COMPLETED'];
            default:
                return [];
        }
    };

    return (
        <div className="container">
            <h1 className="text-center">Reminders</h1>
            <div className="mb-3" style={{ maxWidth: '200px' }}>
                <label htmlFor="status" className="form-label">Status</label>
                <select
                    id="status"
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="PENDING">PENDING</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                </select>
            </div>
            <div className="mb-3" style={{ maxWidth: '200px' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="mb-3" style={{ display: 'flex', gap: '10px' }}>
                <div>
                    <label htmlFor="startDate" className="form-label">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="endDate" className="form-label">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Phone Number</th>
                        <th>Animal Name</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.customer.firstname} {item.customer.surname}</td>
                            <td>{item.customer.phoneNumber}</td>
                            <td>{item.animal.name}</td>
                            <td>{item.appointmentType || 'Vaccination'}</td>
                            <td>{item.appointmentDate || item.vaccinationDate}</td>
                            <td>{item.appointmentTime || item.vaccinationTime}</td>
                            <td>{item.appointmentDescription || item.vaccinationDescription}</td>
                            <td>{item.status || item.vaccinationStatus}</td>
                            <td><div style={{ display: 'flex', gap: '5px' }}>
                                {localStorage.getItem("role") === "ROLE_VETERINARIAN" &&
                                getStatusOptions(item.status || item.vaccinationStatus).map((option) => (
                                    <button
                                        key={option}
                                        style={{ padding: '5px 10px', fontSize: '14px' }}
                                        className="btn btn-primary"
                                        onClick={() => handleStatusUpdate(item.id, option, item.appointmentType ? 'appointment' : 'vaccination')}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Reminder;
