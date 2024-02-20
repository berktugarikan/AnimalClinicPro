import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SelectionBar from '@/shared/components/SelectionBar';


const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3000/api/payment-history')
            setPayments(response.data)
        }
        fetchData()
    }, []);

    return (
        <div>
            <h2>Payment History</h2>

            <div className='d-flex flex-row'>


                <SelectionBar/>
                <div className='flex-grow-1'>
                    <table className='table table-striped'>
                        <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Payment Date</th>
                            <th>Payment Amount</th>
                            <th>Payment Type</th>
                            <th>Payment Status</th>
                        </tr>
                        {payments.map((payment) => (
                            <tr key={payment.id}>
                                <td>{payment.id}</td>
                                <td>{payment.paymentDate}</td>
                                <td>{payment.paymentAmount}</td>
                                <td>{payment.paymentType}</td>
                                <td>{payment.paymentStatus}</td>
                            </tr>
                        ))}
                        </thead>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default PaymentHistory;
