import React, {useEffect, useState} from 'react';
import {Button, Form, Container} from 'react-bootstrap';
import axios from "axios";

const VetProfilBilgileri = () => {
    const [username, setUserName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [email, setEmail] = useState('');
    const [clinicname, setClinicName] = useState('');
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('authUser'));
        setUserId(user.id);
        setUser(user);
        setUserName(user.username);
        setPhone(user.phoneNumber);
        setEmail(user.email);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const bodyUser = {
                ...user,
                username,
                phoneNumber: phone,
                email,
            };

            const bodyClinic = {
                clinicName: clinicname,
                address,
            }
            localStorage.setItem('authUser', JSON.stringify(bodyUser))

            Promise.any([
                axios.put(`http://localhost:8080/api/clinics/${userId}`, bodyClinic),
                axios.put(`http://localhost:8080/api/users/${userId}`, bodyUser),

            ]).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })

        } catch (error) {
            console.log('Error:', error);
        }

    };

    return (
        <Container>
            <h1 style={{color: '#6c9286'}}>User Profile</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>UserName:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="address">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="Phone">
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="idNumber">
                    <Form.Label>ID Number:</Form.Label>
                    <Form.Control
                        type="text"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>E-mail:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="clinicname">
                    <Form.Label>Clinic Name:</Form.Label>
                    <Form.Control
                        type="text"
                        value={clinicname}
                        onChange={(e) => setClinicName(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </Container>
    );
};

export default VetProfilBilgileri;
