import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [newUser, setNewUser] = useState({
    firstname: '',
    surname: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    role: 'ROLE_CUSTOMER',
    clinicId: localStorage.getItem('clinicId') // Local storage'dan klinik kimliği al
  });
  const navigate = useNavigate();

  // Türk telefon numarası formatını kontrol etmek için doğrulama fonksiyonu
  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^[1-9]{1}[0-9]{9}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  // E-posta adresinin doğruluğunu kontrol etmek için doğrulama fonksiyonu
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = async () => {
    // Telefon numarası ve e-posta adresi doğrulaması yap
    if (!validatePhoneNumber(newUser.phoneNumber)) {
      alert("Please enter a valid Turkish phone number.");
      return;
    }

    if (!validateEmail(newUser.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    await axios.post('http://localhost:8080/api/users', newUser)
      .then(response => {
        if (response.status === 200) {
          navigate('/vetmainpage');
        }
      }).catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className="card">
          <div className="text-center card-header">
            <h1 style={{ color: '#6c9286' }}>Create User</h1>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                FirstName:
                <input
                  type="text"
                  name="firstname"
                  value={newUser.firstName}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="id" className="form-label" >
                LastName:
                <input
                  type="text"
                  name="surname"
                  value={newUser.surname}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                UserName:
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                Password:
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                E-mail:
                <input
                  type="text"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                Phone:
                <input
                  type="text"
                  name="phoneNumber"
                  value={newUser.phoneNumber}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={handleCreateUser}
              className="btn btn-primary"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
