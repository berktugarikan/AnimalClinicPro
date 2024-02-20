import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function CreateUser() {
  const [newUser, setNewUser] = useState({
    firstname: '',
    surname: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: ''
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = async () => {
    try {
      console.log(newUser)

      const response = await axios.post('http://localhost:8080/api/users', newUser);
      if(response.status === 201){
        navigate('/vetmainpage')
      }
      console.log('Yeni kullanıcı oluşturuldu:', response.data);
    } catch (error) {
      console.error('Kullanıcı oluşturulurken bir hata oluştu:', error);
    }
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
