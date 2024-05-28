import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentPaymentId, setCurrentPaymentId] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const userRole = localStorage.getItem("role");
        const userId = localStorage.getItem("userId");
        const clinicId = localStorage.getItem("clinicId");
        if (userRole === "ROLE_VETERINARIAN" && clinicId) {
            fetchData(`http://localhost:8080/api/customer-purchases/clinic/${clinicId}`);
        } else if (userRole === "ROLE_CUSTOMER" && userId) {
            fetchData(`http://localhost:8080/api/customer-purchases/customer/${userId}`);
        }
    }, []);

    useEffect(() => {
        // Calculate total amount when payments or date range change
        const filteredAmount = payments
            .filter(payment => new Date(payment.paymentDate) >= new Date(startDate) && new Date(payment.paymentDate) <= new Date(endDate))
            .reduce((total, payment) => total + parseFloat(payment.paymentAmount), 0);
        setTotalAmount(filteredAmount);
    }, [payments, startDate, endDate]);

    const fetchData = async (url) => {
        try {
            const response = await axios.get(url);
            setPayments(response.data);
        } catch (error) {
            console.error("Error fetching payments:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/customer-purchases/${currentPaymentId}`);
            fetchPayments(); // Reload payments after deletion
            setShowDeleteModal(false); // Close delete modal
        } catch (error) {
            console.error('Error deleting payment:', error);
        }
    };

    const fetchPayments = () => {
        // Implement your payment fetching logic here
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const filteredPayments = payments.filter(payment => {
        const amountString = payment.paymentAmount.toString();

        return (
            (payment.veterinary?.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.veterinary?.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.customer?.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.customer?.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.paymentDate.includes(searchTerm.toLowerCase()) ||
                amountString.includes(searchTerm.toLowerCase()) ||
                payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.clinicProduct?.productName.toLowerCase().includes(searchTerm.toLowerCase()))
        ) && (
                (!startDate || new Date(payment.paymentDate) >= new Date(startDate)) &&
                (!endDate || new Date(payment.paymentDate) <= new Date(endDate))
            );
    });

    return (
        <div>
            <h2>Payment History</h2>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Search Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '185px', height: '40px', padding: '5px', fontSize: '15px' }}
                />

                <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map((payment) => (
                            <tr key={payment.id}>
                                <td>{payment.veterinary.firstname} {payment.veterinary.surname}</td>
                                <td>{payment.customer.firstname} {payment.customer.surname}</td>
                                <td>{payment.paymentDate}</td>
                                <td>{payment.paymentAmount}</td>
                                <td>{payment.paymentMethod}</td>
                                <td>{payment.clinicProduct.productName}</td>
                                <td>
                                    {localStorage.getItem("role") === "ROLE_VETERINARIAN" && (
                                        <Button variant="danger" onClick={() => {
                                            setCurrentPaymentId(payment.id);
                                            setShowDeleteModal(true);
                                        }}>Delete</Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ position: 'fixed', top: '20px', right: '20px', padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #ced4da', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', zIndex: '9999', fontWeight: 'bold' }}>
                Total Payment: <span style={{ marginLeft: '5px', color: '#dc3545' }}>{totalAmount.toFixed(2)}</span>
            </div>


            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ color: 'red', fontWeight: 'bold' }}>Payment will be deleted. Are you sure?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PaymentHistory;
