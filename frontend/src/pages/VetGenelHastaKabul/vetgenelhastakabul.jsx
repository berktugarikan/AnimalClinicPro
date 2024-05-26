import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './vetgenelhastakabul.css';
import { Button } from "react-bootstrap";
//import Combobox from "react-widgets/Combobox";
import { useNavigate } from "react-router-dom";

export default function VetGenelHastaKabul() {
    const [breeds, setBreeds] = useState([{ id: 1, name: 'Golden Retriever' }, { id: 2, name: 'Siamese' }, { id: 3, name: 'British' }],);
    const [animalTypes, setAnimalTypes] = useState([{ id: 1, name: 'Dog' }, { id: 2, name: 'Cat' }]);
    const [users, setUsers] = useState([]);
    const [animal, setAnimal] = useState({
        name: '',
        type: '',
        gender: '',
        birthDate: '',
        age: 0,
        weight: 0,
        chipNumber: '',
        breed: '',
        color: '',
        ageCategory: '',
        bloodType: '',
        length: 0,
        userId: 2,
        clinicId: localStorage.getItem('clinicId') || ''
    });

    const [openModal, setOpenModal] = useState(false);
    const [type, setType] = useState('');
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name)
        console.log(value)
        setAnimal((prevAnimal) => ({
            ...prevAnimal,
            [name]: value,
        }));
    };

    const getUsers = useCallback(async () => {
        try {
            const clinicId = localStorage.getItem("clinicId"); // Local storage'dan clinic ID'yi al
            const response = await axios.get("http://localhost:8080/api/users/customers", {
                params: {
                    clinicId: clinicId // Clinic ID'yi query parametresi olarak ekle
                }
            });
            setUsers(response.data);
            if (response.data.length > 0) {
                setAnimal(prev => ({
                    ...prev,
                    userId: response.data[0].id
                }))
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {

        }
    }, []);



    

    useEffect(() => {
        getUsers();
               
    }, [getUsers]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Animal nesnesini uygun formata dönüştür
        const formattedAnimal = {
            name: animal.name,
            type: animal.type,
            gender: animal.gender,
            birthDate: animal.birthDate,
            age: parseInt(animal.age),
            weight: parseFloat(animal.weight),
            chipNumber: animal.chipNumber,
            breed: animal.breed,
            color: animal.color,
            ageCategory: animal.ageCategory,
            bloodType: animal.bloodType,
            length: parseFloat(animal.length),
            userId: animal.userId,
            clinicId:  localStorage.getItem("clinicId")
        };

        console.log(formattedAnimal)

        axios.post("http://localhost:8080/api/animals", formattedAnimal, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(response => {
                if (response.status === 200) {
                    navigate("/vetmainpage")
                }
            })
            .catch(error => {
                console.log(error)
            })
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    const addAnimalType = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/animal-types', {
                animalType: type
            });
            if (response.status === 201) {
                getAnimalTypes();
                setOpenModal(false);
            }
        } catch (error) {
            console.error('Error adding animal type:', error);
        }
    }


    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <div className="card flex-grow-1">
                <div className="card-header text-center fs-4">Patient Admission</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <label className="form-label">
                            Name:
                            <input type="text" name="name" value={animal.name} onChange={handleChange} required />
                        </label>

                        <div >
                            <label className="form-label">
                                Type:
                                <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: '5px' }}>
                                    <select name="type" value={animal.type} onChange={handleChange} required>
                                        <option value="">Select Type</option>
                                        {animalTypes.map((animal) => (
                                            <option style={{ color: 'black' }} key={animal.id}
                                                value={animal.name}>{animal.name}</option>
                                        ))}
                                    </select>
                                    <Button onClick={() => setOpenModal(true)}
                                        className='d-flex justify-content-center btn btn-sm btn-primary' style={{ width: "40px" }}>
                                        +
                                    </Button>
                                </div>


                            </label>
                        </div>


                        <label className="form-label">
                            Gender:
                            <select name="gender" value={animal.gender} onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>

                        <label className="form-label">
                            Birth Date:
                            <input type="date" name="birthDate" value={animal.birthDate} onChange={handleChange} max={today} required />
                        </label>

                        <label className="form-label">
                            Age:
                            <input type="number" name="age" value={animal.age} onChange={handleChange} required />
                        </label>

                        <label className="form-label">
                            Weight:
                            <input type="number" name="weight" value={animal.weight} onChange={handleChange} required />
                        </label>

                        <label className="form-label">
                            Chip Number:
                            <input type="text" name="chipNumber" value={animal.chipNumber} onChange={handleChange}
                                required />
                        </label>
                        <label className="form-label">
                            Breed:
                            <select name="breed" value={animal.breed} onChange={handleChange} required>
                                <option value="">Select Type</option>
                                {breeds.map((breed) => (
                                    <option style={{ color: 'black' }} key={breed.id}
                                        value={breed.name}>{breed.name}</option>
                                ))}
                            </select>
                        </label>

                        <label className="form-label">
                            Color:
                            <input type="text" name="color" value={animal.color} onChange={handleChange} required />
                        </label>

                        <label className="form-label">
                            Age Category:
                            <select name="ageCategory" value={animal.ageCategory} onChange={handleChange} required>
                                <option value="">Age Category</option>
                                <option value="Adult">Adult</option>
                                <option value="Baby">Baby</option>
                            </select>
                        </label>

                        <label className="form-label">
                            Blood Type:
                            <select name="bloodType" value={animal.bloodType} onChange={handleChange} required>
                                <option value="">Select Blood Type</option>
                                <option value="A_POSITIVE">A Positive</option>
                                <option value="A_NEGATIVE">A Negative</option>
                                <option value="B_POSITIVE">B Positive</option>
                                <option value="B_NEGATIVE">B Negative</option>
                                <option value="AB_POSITIVE">AB Positive</option>
                                <option value="AB_NEGATIVE">AB Negative</option>
                                <option value="O_POSITIVE">O Positive</option>
                                <option value="O_NEGATIVE">O Negative</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>

                        <label className="form-label">
                            Length:
                            <input type="number" name="length" value={animal.length} onChange={handleChange} required />
                        </label>

                        <label className="form-label">
                            Owner:
                            <select name="userId" value={animal.userId} onChange={handleChange} required>
                                <option value={0}>Select Type</option>
                                {users.map((user) => (
                                    <option style={{ color: 'black' }} key={user.id}
                                        value={user.id}>{user.firstname} {user.surname} ({user.username})</option>
                                ))}
                            </select>
                        </label>


                        <button style={{ width: "100%" }} type="submit">Save</button>
                    </form>
                </div>
                {openModal && (
                    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add Aniaml Type</h5>
                                    <button type="button" className="btn-close" onClick={closeModal}></button>
                                </div>
                                <div className="modal-body">

                                    <div className="form-group">
                                        <label htmlFor="animalType">Animal Type</label>
                                        <input type="text" className="form-control" id="animalType" name="animalType"
                                            value={type} onChange={(e) => setType(e.target.value)} />
                                    </div>
                                    {/* Diğer gerekli alanları buraya ekleyebilirsiniz */}
                                    <button type="button" className="btn btn-primary mt-3"
                                        onClick={() => addAnimalType()}>Add
                                    </button>


                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );


}

