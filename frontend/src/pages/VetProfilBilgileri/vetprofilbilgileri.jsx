import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';

const VetProfilBilgileri = () => {
 const [username, setUserName] = useState('');
 const [address, setAddress] = useState('');
 const [phone, setPhone] = useState('');
 const [idNumber, setIdNumber] = useState('');
 const [email, setEmail] = useState('');
 const [clinicname, setClinicName] = useState('');

 const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Kullanıcı Bilgileri:', {
      username,
      address,
      phoneNumber,
      idNumber,
      email,
      clinicname,
    });
 };

 return (
    <Container>
      <h1 style={{ color:'#6c9286'}}>User Profile</h1>
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