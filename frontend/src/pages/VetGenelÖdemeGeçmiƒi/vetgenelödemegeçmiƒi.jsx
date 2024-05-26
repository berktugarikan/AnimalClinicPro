import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SelectionBar from '@/shared/components/SelectionBar';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const userRole = localStorage.getItem("role");
        const userId = localStorage.getItem("userId");
        const clinicId=localStorage.getItem("clinicId")
        if (userRole === "ROLE_VETERINARIAN") {
            if (clinicId) {
                const fetchData = async () => {
                    try {
                        // Veterinerin yaptığı ödemeleri al
                        const vetPaymentsResponse = await axios.get(`http://localhost:8080/api/customer-purchases/clinic/${clinicId}`);
                        setPayments(vetPaymentsResponse.data);
                    } catch (error) {
                        console.error("Error fetching veterinarian payments:", error);
                    }
                };
                fetchData();
            }
        } else if (userRole === "ROLE_CUSTOMER") {
            if (userId) {
                const fetchData = async () => {
                    try {
                        // Müşteriye ait ödemeleri al
                        const customerPaymentsResponse = await axios.get(`http://localhost:8080/api/customer-purchases/customer/${userId}`);
                        setPayments(customerPaymentsResponse.data);
                    } catch (error) {
                        console.error("Error fetching customer payments:", error);
                    }
                };
                fetchData();
            }
        }
    }, []);

    return (
        <div>
            <h2>Payment History</h2>

            <div className='d-flex flex-row'>
                {/* <SelectionBar /> */}
                <div className='flex-grow-1'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Veterinary</th>
                                <th>Customer</th>
                                <th>Payment Date</th>
                                <th>Payment Amount</th>
                                <th>Payment Method</th>
                                <th>Product Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.veterinary.firstname} {payment.veterinary.surname}</td>
                                    <td>{payment.customer.firstname} {payment.customer.surname}</td>
                                    <td>{payment.paymentDate}</td>
                                    <td>{payment.paymentAmount}</td>
                                    <td>{payment.paymentMethod}</td>
                                    <td>{payment.clinicProduct.productName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;
