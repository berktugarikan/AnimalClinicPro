import { Grid, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import React, { useEffect, useState } from 'react';
import './index.css';

const appointmentTypes = ['EMERGENCY', 'CHECKUP', 'SURGERY', 'CONSULTATION', 'VACCINATION'];
const statues = [
    'PENDING',
    'COMPLETED',
    'CANCELLED'
]


function Payment() {
    const [selectedValue, setSelectedValue] = React.useState('');
    const [checked, setChecked] = React.useState();
    const [isResearch, setResearch] = React.useState(false);
    const [animal, setAnimal] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [veterinarian, setVetenerian] = useState([]);
    const today = new Date().toISOString().split('T')[0];
    const [amount, setAmount] = useState(0);

    const [formData, setFormData] = useState({
        date: '',
        dateTime: '',
        appointmentType: appointmentTypes[0],
        handleChangeAmount: 0,
        animalId: 0,
        customerId: 0,
        veterinarianId: localStorage.getItem("userId"),
    });


   
    useEffect(() => {
        const handleChangeAmount = (e) => {
            formData.amount = amount
        }
        handleChangeAmount()

    }, [amount]);


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
                        veterinarianId: localStorage.getItem("userId")
                    }));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

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

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleClick = (event) => {
        setSelectedValue(event);
    };
 


    return (
        <div className="container">

            <Grid container>

                <Grid item md={6}>
                    <Box className="px-3">
                        <h5>Pay Information</h5>
                        <button
                            onClick={(e) => handleClick('Short News Story')}
                            id={`${selectedValue === 'Short News Story' && 'active-re'}`}
                            className="d-flex-c w-100 writing_box mt-4"
                        >

                            <Box className="w-100">
                                <Box className="d-flex-c both-side text-left">
                                    <div className="writing_text_hed">Pay Cash</div>
                                    <div className="d-flex-c both-side">
                                        <Typography>${amount ? amount : "0"}.00</Typography>
                                        <Radio
                                            checked={selectedValue === 'Short News Story'}
                                            onChange={handleChange}
                                            value="Short News Story"
                                            className="radio-writings"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': 'Short News Story' }}
                                        />
                                    </div>
                                </Box>
                                <Typography className="text_x_sm top-8 text-left">
                                    Pay Cash Some details for content.
                                </Typography>
                            </Box>
                        </button>

                        <button
                            onClick={(e) => handleClick('Regular News Story')}
                            className="d-flex-c w-100 writing_box mt-2 "
                            id={`${selectedValue === 'Regular News Story' && 'active-re'}`}
                        >


                            <Box className="w-100">
                                <Box className="d-flex-c both-side text-left">
                                    <div className="writing_text_hed">Pay Debit</div>
                                    <div className="d-flex-c both-side">
                                        <Typography>${amount ? amount : "0"}.00</Typography>
                                        <Radio
                                            checked={selectedValue === 'Regular News Story'}
                                            onChange={handleChange}
                                            value="Regular News Story"
                                            className="radio-writings"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': 'Regular News Story' }}
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
                    <select className="input_" value={formData.customerId} name='customerId' id="Appointment_Date" onChange={handleChangeCustomer}>
                        {customer.map((item, index) => (
                            <option key={index} value={item.id}>{item.firstname} {item.surname}</option>
                        ))}
                    </select>


                    <label htmlFor="Veterenerian" className="form-label">Veterenerian</label>
                    <select className="input_" value={formData.veterinarianId} name='veterinarianId' onChange={handleChangeVeterenerian} defaultValue={localStorage.getItem("userId")}>
                        {veterinarian.map((item, index) => (
                            <option key={index} value={item.id}>{item.firstname} {item.surname}</option>
                        ))}
                    </select>

                    <label htmlFor="" className="form-label">Pet name</label>
                    <select className="input_" value={formData.animalId} name='animalId' id="Appointment_Date" onChange={handleChangeAnimal}>
                        {animal.map((item, index) => (
                            <option key={index} value={item.id}>{item.name} - ({item.type})</option>
                        ))}
                    </select>

                    <label htmlFor="Appointment_Date" className="form-label">Appointment Date</label>
                    <input type="date" className="form-control" id="Appointment_Date" name="date"
                        value={formData.date} onChange={handleChange} min={today} required />

                    <label htmlFor="Appointment_Date" className="form-label">Payment amount</label>
                    <input type="number" name="amount"
                        value={amount} onChange={e => setAmount(e.target.value)} required />

                    <label htmlFor="" className="form-label">Processtype</label>
                    <select className="input_" value={formData.animalId} name='animalId' id="Appointment_Date" onChange={handleChangeAnimal}>
                        <option value="vaccination"> Vaccination </option>
                        <option value="examination">  Examination</option>
                    </select>


                </Grid>
            </Grid>

            <div className="w-100"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <button className="button-next mt-4" role="button">
                    Pay Now
                </button>
            </div> 

        </div>
    );
}

export default Payment;
