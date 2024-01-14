import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SelectionBar from '@/shared/components/SelectionBar';


const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/payment-history')  
      .then(response => setPayments(response.data))
      .catch(error => console.error('Error fetching payment history:', error));
  }, []);

  return (
    <div>
      <h2>Payment History</h2>

      <SelectionBar />
      <ul>
        {payments.map(payment => (
          <li key={payment._id}>{payment.name}: {payment.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentHistory;