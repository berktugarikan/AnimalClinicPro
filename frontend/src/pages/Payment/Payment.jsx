import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import './index.css';

const statuses = ['PENDING', 'COMPLETED', 'CANCELLED'];

function Payment() {
    const [selectedValue, setSelectedValue] = useState('');
    const [animal, setAnimal] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [veterinarian, setVeterinarian] = useState([]);
    const today = new Date().toISOString().split('T')[0];
    const [amount, setAmount] = useState(0);

    const [formData, setFormData] = useState({
        date: '',
        appointmentType: 'vaccination',
        amount: 0,
        animalId: 0,
        customerId: 0,
        veterinarianId: localStorage.getItem("userId"),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clinicId = localStorage.getItem("clinicId"); // Local storage'dan clinic ID'yi al
                const customerResponse = await axios.get("http://localhost:8080/api/users/customers", {
                    params: {
                        clinicId: clinicId // Clinic ID'yi query parametresi olarak ekle
                    }
                })
                setCustomer(customerResponse.data);
                if (customerResponse.data.length > 0) {
                    setFormData(prevData => ({
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
        if (customer.length > 0) {
            axios.get(`http://localhost:8080/api/animals/owner/${customer[0]?.id}`)
                .then(response => {
                    setAnimal(response.data);
                    if (response.data.length > 0) {
                        setFormData(prevData => ({
                            ...prevData,
                            animalId: response.data[0].id
                        }));
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [customer]);

    const handleChangeCustomer = (e) => {
        const customerId = +e.target.value;
        setFormData(prevData => ({
            ...prevData,
            customerId: customerId
        }));
        axios.get(`http://localhost:8080/api/animals/owner/${customerId}`)
            .then(response => {
                setAnimal(response.data);
                if (response.data.length > 0) {
                    setFormData(prevData => ({
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
        setFormData(prevData => ({
            ...prevData,
            animalId: animalId
        }));
    };

    const handleChangeVeterinarian = (e) => {
        const veterinarianId = +e.target.value;
        setFormData(prevData => ({
            ...prevData,
            veterinarianId: veterinarianId
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleClick = (value) => {
        setSelectedValue(value);
    };

    return (
        <div className="container">
            <Grid container>
                <Grid item md={6}>
                    <Box className="px-3">
                        <h5>Pay Information</h5>
                        <button
                            onClick={() => handleClick('Pay Cash')}
                            className={`d-flex-c w-100 writing_box mt-4 ${selectedValue === 'Pay Cash' ? 'active-re' : ''}`}
                        >
                            <Box className="w-100">
                                <Box className="d-flex-c both-side text-left">
                                    <div className="writing_text_hed">Pay Cash</div>
                                    <div className="d-flex-c both-side">
                                        <Typography>${amount ? amount : "0"}.00</Typography>
                                        <Radio
                                            checked={selectedValue === 'Pay Cash'}
                                            onChange={handleChange}
                                            value="Pay Cash"
                                            className="radio-writings"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': 'Pay Cash' }}
                                        />
                                    </div>
                                </Box>
                                <Typography className="text_x_sm top-8 text-left">
                                    Pay Cash Some details for content.
                                </Typography>
                            </Box>
                        </button>

                        <button
                            onClick={() => handleClick('Pay Debit')}
                            className={`d-flex-c w-100 writing_box mt-2 ${selectedValue === 'Pay Debit' ? 'active-re' : ''}`}
                        >
                            <Box className="w-100">
                                <Box className="d-flex-c both-side text-left">
                                    <div className="writing_text_hed">Pay Debit</div>
                                    <div className="d-flex-c both-side">
                                        <Typography>${amount ? amount : "0"}.00</Typography>
                                        <Radio
                                            checked={selectedValue === 'Pay Debit'}
                                            onChange={handleChange}
                                            value="Pay Debit"
                                            className="radio-writings"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': 'Pay Debit' }}
                                        />
                                    </div>
                                </Box>
                                <Typography className="text_x_sm top-8 text-left">
                                    Pay Debit Some details for content
                                </Typography>
                            </Box>
                        </button>
                    </Box>
                </Grid>
                <Grid item md={6} className="px-2">
                    <h5>Client Information</h5>
                    <label htmlFor="Customer" className="form-label">Customer</label>
                    <select className="input_" value={formData.customerId} name='customerId' onChange={handleChangeCustomer}>
                        {customer.map((item, index) => (
                            <option key={index} value={item.id}>{item.firstname} {item.surname}</option>
                        ))}
                    </select>

                    <label htmlFor="Veterinarian" className="form-label">Veterinarian</label>
                    <select className="input_" value={formData.veterinarianId} name='veterinarianId' onChange={handleChangeVeterinarian} defaultValue={localStorage.getItem("userId")}>
                        {veterinarian.map((item, index) => (
                            <option key={index} value={item.id}>{item.firstname} {item.surname}</option>
                        ))}
                    </select>

                    <label htmlFor="Animal" className="form-label">Pet name</label>
                    <select className="input_" value={formData.animalId} name='animalId' onChange={handleChangeAnimal}>
                        {animal.map((item, index) => (
                            <option key={index} value={item.id}>{item.name} - ({item.type})</option>
                        ))}
                    </select>

                    <label htmlFor="Appointment_Date" className="form-label">Appointment Date</label>
                    <input type="date" className="form-control" id="Appointment_Date" name="date"
                        value={formData.date} onChange={handleChange} min={today} required />

                    <label htmlFor="Amount" className="form-label">Payment amount</label>
                    <input type="number" className="form-control" id="Amount" name="amount"
                        value={amount} onChange={e => setAmount(e.target.value)} required />

                    <label htmlFor="ProcessType" className="form-label">Process Type</label>
                    <select className="input_" value={formData.appointmentType} name='appointmentType' onChange={handleChange}>
                        <option value="vaccination">Vaccination</option>
                        <option value="examination">Examination</option>
                    </select>
                </Grid>
            </Grid>

            <div className="w-100" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button className="button-next mt-4" role="button">Pay Now</button>
            </div>
        </div>
    );
}

export default Payment;
