import React, { useState } from 'react';

const SignUp = () => {
	const [formData, setFormData] = useState({
		firstname: '',
		surname: '',
		username: '',
		password: '',
		email: '',
		phoneNumber: '',
		permission: {
		  id: 1,
		  permissionName: 'ADMIN'
		}
	  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    

    // API endpoint URL'sini güncelleyin
    const apiUrl = 'http://localhost:8080/api/users';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        // Başarılı kayıt durumunda istediğiniz işlemleri gerçekleştirin
      } else {
        console.error('Registration error:', response.statusText);
        // Hata durumunda istediğiniz işlemleri gerçekleştirin
      }
    } catch (error) {
      console.error('Registration error:', error.message);
      // Hata durumunda istediğiniz işlemleri gerçekleştirin
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Firstname:
        <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
      </label>
      <br />
      <label>
        Surname:
        <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
      </label>
      <br />
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Phone Number:
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default SignUp;
