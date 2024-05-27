import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import './index.css';

function Payment() {
    const [selectedValue, setSelectedValue] = useState('');
    const [customer, setCustomer] = useState([]);
    const [veterinarian, setVeterinarian] = useState([]);
    const today = new Date().toISOString().split('T')[0];
    const [amount, setAmount] = useState(0);
    const [processTypes, setProcessTypes] = useState([]);
    const [formData, setFormData] = useState({
        date: '',
        appointmentType: '',
        amount: 0,
        customerId: 0,
        veterinarianId: localStorage.getItem("userId"),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clinicId = localStorage.getItem("clinicId");
                const customerResponse = await axios.get("http://localhost:8080/api/users/customers", {
                    params: {
                        clinicId: clinicId
                    }
                });
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
                    setFormData(prevData => ({
                        ...prevData,
                        veterinarianId: vetResponse.data.id
                    }));
                }

                fetchClinicProducts(clinicId);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const fetchClinicProducts = async (clinicId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/clinic-products/clinic/${clinicId}`);
            const clinicProducts = response.data;
            const types = generateProcessTypes(clinicProducts);
            setProcessTypes(types);
            // Varsa default olarak ilk işlem türünü seç
            if (types.length > 0) {
                setFormData(prevData => ({
                    ...prevData,
                    appointmentType: types[0].name,
                    amount: types[0].price
                }));
            }
        } catch (error) {
            console.error("Error fetching clinic products:", error);
        }
    };

    const generateProcessTypes = (clinicProducts) => {
        const processTypes = clinicProducts.map(product => ({
            id: product.id,
            name: product.productName,
            price: product.price
        }));
        return processTypes;
    };

    const handleChangeCustomer = (e) => {
        const customerId = +e.target.value;
        setFormData(prevData => ({
            ...prevData,
            customerId: customerId
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
        // Seçilen ürünün fiyatını güncelle
        const selectedProduct = processTypes.find(product => product.name === value);
        if (selectedProduct) {
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
                amount: selectedProduct.price // Seçilen ürünün fiyatını payment amounta yaz
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleClick = (value) => {
        setSelectedValue(value);
    };
    const handlePayNow = async () => {
        try {
            // Seçilen ürünün adını al
            const selectedProduct = processTypes.find(product => product.name === formData.appointmentType);
    
            // POST isteği için gerekli verileri topla
            const requestBody = {
                clinicProductId: selectedProduct.id, // Kliniğin seçilen ürünün ID'sini al
                paymentDate: formData.date,
                paymentAmount: formData.amount,
                paymentMethod: selectedValue,
                veterinaryId: formData.veterinarianId,
                customerId: formData.customerId
            };
    
            // POST isteği gönder
            const response = await axios.post("http://localhost:8080/api/customer-purchases", requestBody);
    
            // Başarılı bir şekilde kaydedildiğinde kullanıcıya bildir
            console.log("Payment successfully saved:", response.data);
            window.location.reload();
            // Başka bir işlem yapılabilir, örneğin sayfayı yenilemek gibi
        } catch (error) {
            console.error("Error while saving payment:", error);
            // Hata durumunda kullanıcıya bildir
        }
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

                    <label htmlFor="Appointment_Date" className="form-label">Purchase Date</label>
                    <input type="date" className="form-control" id="Appointment_Date" name="date"
                        value={formData.date} onChange={handleChange} min={today} required />

                    <label htmlFor="Amount" className="form-label">Payment amount</label>
                    <input type="number" className="form-control" id="Amount" name="amount"
                        value={formData.amount} readOnly={true} required />


                    <label htmlFor="ProcessType" className="form-label">Product Type</label>
                    <select className="input_" value={formData.appointmentType} name='appointmentType' onChange={handleChange}>
                        {processTypes.map((type, index) => (
                            <option key={index} value={type.name}>{type.name}</option>
                        ))}
                    </select>
                </Grid>
            </Grid><div className="w-100" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button className="button-next mt-4" onClick={handlePayNow} role="button">Pay Now</button>

            </div>
        </div>
    );
}

export default Payment;
