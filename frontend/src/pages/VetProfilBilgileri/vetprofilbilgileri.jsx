import React, {useEffect, useState} from 'react';
import {Button, Form, Container} from 'react-bootstrap';
import axios from "axios";

const VetProfilBilgileri = () => {
    const [username, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState({});


    useEffect(() => {
        const username = localStorage.getItem("username");
        const fetchData = async () => {
            axios.get("http://localhost:8080/api/users/username/" + username)
                .then(response => {
                    setUser(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
        };
        fetchData();
    }, []);

    function handleSubmit() {
    }

    return (
        <Container>
            <h1 style={{color: '#6c9286'}}>User Profile</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>UserName:</Form.Label>
                    <Form.Control
                        type="text"
                        value={user.username}
                    />
                </Form.Group>

                <Form.Group controlId="firstName">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control
                        type="text"
                        value={user.firstname}
                    />
                </Form.Group>

                <Form.Group controlId="surname">
                    <Form.Label>Surname:</Form.Label>
                    <Form.Control
                        type="text"
                        value={user.surname}
                    />
                </Form.Group>

                <Form.Group controlId="Phone">
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control
                        type="text"
                        value={user.phoneNumber}
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>E-mail:</Form.Label>
                    <Form.Control
                        type="email"
                        value={user.email}
                    />
                </Form.Group>
            </Form>
        </Container>
    );
};

export default VetProfilBilgileri;