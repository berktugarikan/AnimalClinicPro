import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import './VetGenelHastaKabul.css';
import SelectionBar from '@/shared/components/SelectionBar';
import {Button} from "react-bootstrap";

export default function VetGenelHastaKabul() {
    const [breeds, setBreeds] = useState([]); // [{ id: 1, name: 'Golden Retriever' }, { id: 2, name: 'Siamese' }, ...
    const [animalTypes, setAnimalTypes] = useState([]); // [{ id: 1, name: 'Dog' }, { id: 2, name: 'Cat' }, ...
    const [users, setUsers] = useState([]); // [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }, ...
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
        owner: '',
    });

    const [openModal, setOpenModal] = useState(false);
    const [type, setType] = useState('');


    const handleChange = (e) => {
        const {name, value} = e.target;
        setAnimal((prevAnimal) => ({
            ...prevAnimal,
            [name]: value,
        }));
    };

    const getUsers = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {

        }
    }, []);


    const getAnimalTypes = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/animal-types`);
            setAnimalTypes(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {

        }
    }, []);

    const getBreed = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/breeds`);
            setBreeds(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {

        }
    }, []);

    useEffect(() => {
        getUsers();
        getAnimalTypes()
        getBreed()
    }, [getUsers, getAnimalTypes, getBreed]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Animal nesnesini uygun formata dönüştür
            const formattedAnimal = {
                name: animal.name,
                type: {
                    id: parseInt(animal.type) // Assuming type is a number, adjust accordingly
                },
                gender: animal.gender,
                birthDate: animal.birthDate,
                age: parseInt(animal.age),
                weight: parseFloat(animal.weight),
                chipNumber: animal.chipNumber,
                breed: {
                    id: animal.breed
                },
                color: animal.color,
                ageCategory: animal.ageCategory,
                bloodType: animal.bloodType,
                length: parseFloat(animal.length),
                owner: {
                    id: parseInt(animal.owner) // Assuming owner is a number, adjust accordingly
                }
            };

            // Animal nesnesini backend'e POST isteği ile JSON formatında gönder
            const response = await axios.post('http://localhost:8080/api/animals', formattedAnimal, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Animal kaydedildi:', response.data);

            // Başarılı kayıt durumunda istediğiniz işlemleri gerçekleştirebilirsiniz.
        } catch (error) {
            console.error('Animal kaydetme hatası:', error.response || error);
            // Hata durumunda istediğiniz işlemleri gerçekleştirebilirsiniz.
        }
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
        <div className="vet-genel-hasta-kabul-page">
            {/* Sol tarafta SelectionBar */}
            <div className="selection-bar-container">
                <SelectionBar/>
            </div>

            {/* Sağ tarafta VetGenelHastaKabul */}
            <div className="vet-genel-hasta-kabul-container">
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={animal.name} onChange={handleChange} required/>
                    </label>


                    <div className='d-flex flex-column'>
                        <label>
                            Type: </label>
                        <div className='d-flex flex-row align-items-center justify-content-center'>
                            <select style={{flex: 1}} name="type" value={animal.type} onChange={handleChange} required>

                                <option value="">Select Type</option>
                                {animalTypes.map((animalType) => (
                                    <option key={animalType.id} value={animalType.id}>{animalType.animalType}</option>
                                ))}
                            </select>
                            <div className='flex-lg-row'>
                                <Button onClick={() => setOpenModal(true)}
                                        className='d-flex justify-content-center btn btn-sm btn-primary'>
                                    +
                                </Button>
                            </div>
                        </div>
                    </div>


                    <label>
                        Gender:
                        <select name="gender" value={animal.gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>

                    <label>
                        Birth Date:
                        <input type="date" name="birthDate" value={animal.birthDate} onChange={handleChange} required/>
                    </label>

                    <label>
                        Age:
                        <input type="number" name="age" value={animal.age} onChange={handleChange} required/>
                    </label>

                    <label>
                        Weight:
                        <input type="number" name="weight" value={animal.weight} onChange={handleChange} required/>
                    </label>

                    <label>
                        Chip Number:
                        <input type="text" name="chipNumber" value={animal.chipNumber} onChange={handleChange}
                               required/>
                    </label>

                    <label>
                        Breed:
                        <select name="breed" value={animal.breed} onChange={handleChange} required>
                            <option value="">Select Breed Type</option>
                            {breeds.map((breed) => (
                                <option key={breed.id} value={breed.id}>{breed.breedName}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Color:
                        <input type="text" name="color" value={animal.color} onChange={handleChange} required/>
                    </label>

                    <label>
                        Age Category:
                        <select name="ageCategory" value={animal.ageCategory} onChange={handleChange} required>
                            <option value="">Age Category</option>
                            <option value="Adult">Adult</option>
                            <option value="Baby">Baby</option>
                        </select>
                    </label>

                    <label>
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

                    <label>
                        Length:
                        <input type="number" name="length" value={animal.length} onChange={handleChange} required/>
                    </label>

                    <label>
                        Owner:
                        <select name="owner" value={animal.owner} onChange={handleChange} required>
                            <option value="">Select Type</option>
                            {users.map((user) => (
                                <option style={{color: 'black'}} key={user.id}
                                        value={user.id}>{user.firstname}-{user.surname}</option>
                            ))}
                        </select>
                    </label>


                    <button type="submit">Save</button>
                </form>
            </div>
            {openModal && (
                <div className="modal" style={{display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
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
                                           value={type} onChange={(e) => setType(e.target.value)}/>
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
    );


}

