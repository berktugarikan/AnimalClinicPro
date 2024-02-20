import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
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
        const {name, value} = e.target;
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

            console.log(response)

            if (response.ok && response.status === 201) {
                const data = await response.json();
                console.log('Registration successful:', data);
                navigate('/login');
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
        <div className="container">
            <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">

                <form className="card" onSubmit={handleSubmit}>
                    <div className="text-center card-header">
                        <h1 style={{color: '#6c9286'}}>Sign Up</h1>
                    </div>
                    <div className="card-body">
                        <label>
                            Firstname:
                            <input type="text" name="firstname" value={formData.firstname} onChange={handleChange}/>
                        </label>
                        <br/>
                        <label>
                            Surname:
                            <input type="text" name="surname" value={formData.surname} onChange={handleChange}/>
                        </label>
                        <br/>
                        <label>
                            Username:
                            <input type="text" name="username" value={formData.username} onChange={handleChange}/>
                        </label>
                        <br/>
                        <label>
                            Password:
                            <input type="password" name="password" value={formData.password} onChange={handleChange}/>
                        </label>
                        <br/>
                        <label>
                            Email:
                            <input type="text" name="email" value={formData.email} onChange={handleChange}/>
                        </label>
                        <br/>
                        <label>
                            Phone Number:
                            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
                        </label>
                        <br/>
                        <button  className="btn btn-primary" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
