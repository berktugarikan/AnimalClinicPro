import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Modal } from 'react-bootstrap';
import axios from "axios";

const VetProfilBilgileri = () => {
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const username = localStorage.getItem("username");
            try {
                const response = await axios.get("http://localhost:8080/api/users/username/" + username);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, []);

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(phoneNumber);
    };

    const handleEdit = () => {
        setShowModal(true);
        setNewEmail(user.email);
        setNewPhoneNumber(user.phoneNumber);
    };

    const handleUpdate = async () => {
        if (!validateEmail(newEmail)) {
            setEmailError('Invalid email format');
            return;
        }

        if (!validatePhoneNumber(newPhoneNumber)) {
            setPhoneNumberError('Invalid phone number format');
            return;
        }

        const updatedUser = {
            ...user,
            email: newEmail,
            phoneNumber: newPhoneNumber
        };

        try {
            const response = await axios.put(`http://localhost:8080/api/users/${user.id}`, updatedUser, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            console.log('Update response:', response.data);
            setShowModal(false);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <Container>
            <h1 style={{ color: '#6c9286' }}>User Profile</h1>
            <Form>
                <Form.Group controlId="username">
                    <Form.Label>UserName:</Form.Label>
                    <Form.Control type="text" value={user.username} readOnly />
                </Form.Group>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control type="text" value={user.firstname} readOnly />
                </Form.Group>
                <Form.Group controlId="surname">
                    <Form.Label>Surname:</Form.Label>
                    <Form.Control type="text" value={user.surname} readOnly />
                </Form.Group>
                <Form.Group controlId="Phone">
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control type="text" value={user.phoneNumber} readOnly />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>E-mail:</Form.Label>
                    <Form.Control type="email" value={user.email} readOnly />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={handleEdit}>Edit</Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="newEmail">
                        <Form.Label>New E-mail:</Form.Label>
                        <Form.Control type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                        {emailError && <Form.Text className="text-danger">{emailError}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="newPhoneNumber">
                        <Form.Label>New Phone:</Form.Label>
                        <Form.Control type="text" value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} />
                        {phoneNumberError && <Form.Text className="text-danger">{phoneNumberError}</Form.Text>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default VetProfilBilgileri;
