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
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './VetMainPage.css';
import { UserList } from './components/UserList';
import { VaccineScheduleList } from './components/VaccineScheduleList';
import {Button} from "react-bootstrap";


const userData = [
  { id: 1, name: 'User 1', vaccineSchedule: 'Aşı Takvimi 1' },
  { id: 2, name: 'User 2', vaccineSchedule: 'Aşı Takvimi 2' },
  { id: 3, name: 'User 3', vaccineSchedule: 'Aşı Takvimi 3' },
  // Diğer müşteri verileri
];

function VetMainPage() {

  const navigate=useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: ''
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {

    navigate('/createuser');
  };


  return(
  <div className="main-container">
  <div className="left-menu">
    <div className="menu-box">
        <Link to="/VetGenelHastaKabul">Patient Admission</Link>
      </div>
      <div className="menu-box">
        <Link to="/addAppointment">Appointments</Link>
      </div>
      <div className="menu-box">
        <Link to="/VetGenelMRG">Appointment History</Link>
      </div>
      <div className="menu-box">
        <Link to="/VetGenelARG">Vaccine Appointment History</Link>
     </div>
    <div className="menu-box">
      <Link to="/vetgenelargadd">Vaccine Add</Link>
    </div>
     <div className="menu-box">
        <Link to="/VetGenelTahlil">Laboratory Tests</Link>
      </div>
    <div className="menu-box">
      <Link to="/addLabResult">Laboratory Result Add</Link>
    </div>

      <div className="menu-box">
        <Link to="/VetGenelÖdemeGeçmişi">Payment History</Link>
     </div>
  </div>
  <div className="right-content">
    <h1>Vet Main Page</h1>
      <div className='add-user-form'>
        <Button type="button" onClick={handleAddUser}>Create User</Button>
      </div>
   {/*} <div>
      {userData.map(user => (
        <div key={user.id} className="customer-card">
          <h2>{user.name}</h2>
          <p>{user.vaccineSchedule}</p>
      </div>
        ))}
      </div> */}

      <UserList />

  </div>
</div>
);
}

export default VetMainPage;


