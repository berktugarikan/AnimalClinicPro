/*export default function VetMainPage() {
    return <div>Vet Main Page</div>
}
*/

/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VetMainPage() {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    // Axios ile sunucudan müşteri verilerini çekme
    axios.get('/api/customerData')
      .then(response => setCustomerData(response.data))
      .catch(error => console.error('Veri çekme hatası: ', error));
  }, []);

  return (
    <div>
      <h1>Vet Main Page</h1>
      <ul>
        {customerData.map(customer => (
          <li key={customer.id}>
            {customer.name} - {customer.vaccineSchedule}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VetMainPage;*/
import React, { useEffect } from 'react';
// import { useState } from 'react';
// import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './vetmainpage.css';
import { UserList } from './components/UserList';
// import { VaccineScheduleList } from './components/VaccineScheduleList';
import { Button } from "react-bootstrap";


// const userData = [
//   { id: 1, name: 'User 1', vaccineSchedule: 'Aşı Takvimi 1' },
//   { id: 2, name: 'User 2', vaccineSchedule: 'Aşı Takvimi 2' },
//   { id: 3, name: 'User 3', vaccineSchedule: 'Aşı Takvimi 3' },
//   // Diğer müşteri verileri
// ];

function VetMainPage() {

  const navigate = useNavigate();

  // const [newUser, setNewUser] = useState({
  //   firstName: '',
  //   lastName: '',
  //   username: '',
  //   password: '',
  //   email: '',
  //   phoneNumber: ''
  // });

  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:8080/api/users/customers")
  //     .then(response => setUsers(response.data))
  // }, []);


  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewUser({ ...newUser, [name]: value });
  // };

  const handleAddUser = () => {
    const role = localStorage.getItem('role'); // Local storage'dan role değerini al
  
    if (role === 'ROLE_VETERINARIAN') {
      navigate('/createuser'); 
    } else if (role === 'ROLE_CUSTOMER') {
      alert('Access Denied'); 
    } else {
      console.log('Unknown role'); 
    }
  };


  return (
    <div className="main-container" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <h1>Vet Main Page</h1>
      <div className='add-user-form'>
        <Button type="button" onClick={handleAddUser}>Create User</Button>
      </div>
      <UserList />
    </div >
  );
}

export default VetMainPage;


