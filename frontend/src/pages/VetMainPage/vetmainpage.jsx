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

// VetMainPage.js
/*import React from 'react';

function VetMainPage() {
  return (
    <div>
      <h1>Vet Main Page</h1>
      {/* VetMainPage içeriği buraya eklenebilir /}
    </div>
  );
}

export default VetMainPage;*/

// VetMainPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './VetMainPage.css';
import { UserList } from './components/UserList';
import { VaccineScheduleList } from './components/VaccineScheduleList';

const userData = [
  { id: 1, name: 'User 1', vaccineSchedule: 'Aşı Takvimi 1' },
  { id: 2, name: 'User 2', vaccineSchedule: 'Aşı Takvimi 2' },
  { id: 3, name: 'User 3', vaccineSchedule: 'Aşı Takvimi 3' },
  // Diğer müşteri verileri
];

function VetMainPage() {

  return(
  <div className="main-container">
  <div className="left-menu">
    <div className="menu-box">
        <Link to="/VetGenelHastaKabul">Hasta Kabul</Link>
      </div>
      <div className="menu-box">
        <Link to="/VetGenelMR">Muayene Randevuları</Link>
      </div>
      <div className="menu-box">
        <Link to="/VetGenelMRG">Muayene Randevu Geçmişi</Link>
      </div>
      <div className="menu-box">
        <Link to="/VetGenelAR">Aşı Randevuları</Link>
      </div>
      <div className="menu-box">
        <Link to="/VetGenelARG">Aşı Randevu Geçmişi</Link>
     </div>
     <div className="menu-box">
        <Link to="/VetGenelTahlil">Tahliller</Link>
      </div>
      <div className="menu-box">
        <Link to="/VetGenelÖdemeGeçmişi">Hasta Ödeme Geçmişi</Link>
     </div>
  </div>
  <div className="right-content">
    <h1>Vet Main Page</h1>
   {/*} <div>
      {userData.map(user => (
        <div key={user.id} className="customer-card">
          <h2>{user.name}</h2>
          <p>{user.vaccineSchedule}</p>
      </div>
        ))}
      </div> */}

      <UserList />
      <VaccineScheduleList />
  </div>
</div>
);
}

export default VetMainPage;


