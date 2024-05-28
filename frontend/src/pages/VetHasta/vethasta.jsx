import React, { useState, useEffect, useCallback } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { Grid } from '@mui/material';

const PetCard = () => {
    const [petData, setPetData] = useState([]);
    const [selectedPet, setSelectedPet] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [role, setRole] = useState(""); // role değişkeni tanımlandı

    useEffect(() => {
        const userRole = localStorage.getItem("role"); // local storage'dan role alınıyor
        setRole(userRole); // role değişkeni güncelleniyor

        const fetchData = async () => {
            try {
                if (userRole === "ROLE_VETERINARIAN") {
                    const clinicId = localStorage.getItem("clinicId");
                    if (clinicId) {
                        const response = await axios.get(`http://localhost:8080/api/animals/clinic/${clinicId}`);
                        if (response?.data?.length > 0) {
                            const reversedPetData = response.data.reverse();
                            setPetData(reversedPetData);
                        }
                        console.log(response.data);
                    } else {
                        console.error("Clinic ID not found in localStorage");
                    }
                } else if (userRole === "ROLE_CUSTOMER") {
                    const userId = localStorage.getItem("userId");
                    if (userId) {
                        const response = await axios.get(`http://localhost:8080/api/animals/owner/customer/${userId}`);
                        if (response?.data?.length > 0) {
                            const reversedPetData = response.data.reverse();
                            setPetData(reversedPetData);
                        }
                        console.log(response.data);
                    } else {
                        console.error("User ID not found in localStorage");
                    }
                } else {
                    console.error("Undefined role.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };


        const fetchCustomerData = async () => {
            const response = await axios.get("http://localhost:8080/api/users/customers");
            console.log(response.data);
            setCustomers(response.data);
        }
        fetchData();
        fetchCustomerData();

        getUsers();
        getAnimalTypes()
        getBreed()
    }, []);

    const handleChoose = (data) => {
        setShowModal(true);
        setSelectedPet(data);
        fetchPetData(data.id);
        console.log(data)
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPet(null);
    };

    const [updateData, setUpdateData] = useState({
        id: "",
        name: "",
        color: "",
        gender: "",
        type: "",
        age: "",
        ageCategory: "",
        bloodType: "",
        breed: "",
        birthDate: "",
        length: "",
        weight: "",
        chipNumber: ""

        // Diğer gerekli alanları buraya ekleyebilirsiniz
    });

    const [breeds, setBreeds] = useState([{ id: 1, name: 'Golden Retriever' }, { id: 2, name: 'Siamese' }, { id: 3, name: 'British' }],);
    const [animalTypes, setAnimalTypes] = useState([{ id: 1, name: 'Dog' }, { id: 2, name: 'Cat' }]);
    const [users, setUsers] = useState([]);

    const getUsers = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {

        }
    }, []);

    const fetchPetData = async (petId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/animals/${petId}`);
            setSelectedPet(response.data);
            setUpdateData({
                ...response.data,
                birthDate: response.data.birthDate ? new Date(new Date(response.data.birthDate).getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0] : ''
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData({
            ...updateData,
            [name]: value
        });
    };

    const updatePet = async () => {
        const { id, ...updatedPet } = updateData;

        await axios.put(`http://localhost:8080/api/animals/${selectedPet.id}`, updatedPet)
            .then(response => {
                if (response.status === 200) {
                    getUsers();
                    closeModal();
                }
            })
            .catch(error => {
                console.error('Error updating pet:', error);
            });
    };

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

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredPetData = petData.filter((pet) => {
        return (
            pet.customer.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pet.customer.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pet.customer.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (

        <div style={{ width: "100%" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Animal List</h2>
            <input
                type="text"
                placeholder="Search by username"
                value={searchTerm}
                onChange={handleSearchTermChange}
                style={{ marginBottom: "20px", padding: "5px", maxWidth: "250px", marginTop: "20px" }}
            />
            <Grid container spacing={2}>
                {filteredPetData?.map((pet) => (
                    <Grid item xs={12} sm={6} md={4}>
                        <Card key={pet?.id} sx={{
                            margin: '10px',
                            maxWidth: '500px',
                            backgroundColor: '#c3dfd6',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <CardContent>
                                <Typography variant="h6" color="#004d40" gutterBottom>
                                    Username: {`${pet?.customer?.firstname} ${pet?.customer?.surname}`} ({pet?.customer?.username})
                                </Typography>
                                <Typography variant="h6" color="#004d40" gutterBottom>
                                    Pet Name: {pet?.name}
                                </Typography>
                                <Typography variant="h6" color="#004d40" gutterBottom>
                                    Pet Type: {pet?.type}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {
                                    <button style={{ color: '#ffffff', backgroundColor: '#6c9286', borderRadius: '10px', border: "1px", borderColor: "white", padding: "5px 10px 5px 10px" }}
                                        onClick={() => handleChoose(pet)}>Choose
                                    </button>
                                }
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {showModal && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Pet Information</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                {selectedPet && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="name">Pet Name:</label>
                                            <input type="text" className="form-control" id="name" name="name" value={updateData?.name} onChange={handleInputChange} />
                                        </div>
                                        {/* <div className="form-group">
                                            <label htmlFor="name">Owner Name:</label>
                                            <input type="text" className="form-control" id="owner" name="owner" value={updateData?.owner} onChange={handleInputChange} />
                                        </div> */}


                                        <div className="form-group">
                                            <label className="form-label">
                                                Type:
                                            </label>
                                            <select id='type' name="type" value={updateData.type} onChange={handleInputChange} required>
                                                <option value="">Animal Type</option>
                                                {animalTypes.map((animal) => (
                                                    <option style={{ color: 'black' }} key={animal.id}
                                                        value={animal.name}>{animal.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="name">Age: </label>
                                            <input type="text" className="form-control" id="age" name="age" value={updateData?.age} onChange={handleInputChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="name">Age Category: </label>
                                            <select id="ageCategory" name="ageCategory" value={updateData.ageCategory} onChange={handleInputChange} required>
                                                <option value="">Age Category</option>
                                                <option value="Adult">Adult</option>
                                                <option value="Baby">Baby</option>
                                            </select>
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="name">Birth Date: </label>
                                            <input type="date" className="form-control" id="birthDate" name="birthDate" value={updateData?.birthDate} onChange={handleInputChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="name">Blood Type: </label>
                                            <select id='bloodType' name="bloodType" value={updateData.bloodType} onChange={handleInputChange} required>
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

                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="name">Breed Name: </label>
                                            <select id='breed' name="breed" value={updateData.breed} onChange={handleInputChange} required>
                                                <option value="">Select Type</option>
                                                {breeds.map((breed) => (
                                                    <option style={{ color: 'black' }} key={breed.id}
                                                        value={breed.name}>{breed.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="name">Chip Number: </label>
                                            <input type="text" className="form-control" id="chipNumber" name="chipNumber" value={updateData?.chipNumber} onChange={handleInputChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="name">Color: </label>
                                            <input type="text" className="form-control" id="color" name="color" value={updateData?.color} onChange={handleInputChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor='gender'>
                                                Gender:
                                            </label>
                                            <select id='gender' name="gender" value={updateData.gender} onChange={handleInputChange} required>
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>

                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="name">Length: </label>
                                            <input type="text" className="form-control" id="length" name="length" value={updateData?.length} onChange={handleInputChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="name">Weight: </label>
                                            <input type="text" className="form-control" id="weight" name="weight" value={updateData?.weight} onChange={handleInputChange} />
                                        </div>

                                    </>
                                )}
                            </div>
                            <div className="modal-footer">
                                {role !== "ROLE_CUSTOMER" && (
                                    <button type="button" className="btn btn-secondary" onClick={updatePet}>Update</button>
                                )}
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default PetCard;