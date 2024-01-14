import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function CreateUser() {
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

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('https://example.com/api/createUser', newUser);
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
                name="firstName"
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
                name="lastName"
                value={newUser.lastName}
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
