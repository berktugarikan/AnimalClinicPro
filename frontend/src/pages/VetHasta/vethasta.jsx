import React, {useState, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";

const PetCard = () => {
    const [petData, setPetData] = useState({});
    const [selectedPet, setSelectedPet] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8080/api/animals');
            setPetData(response.data);
        };
        fetchData();
    }, []);

    const handleChoose = (data) => {
        setShowModal(true);
        setSelectedPet(data);
        console.log(data)
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPet(null);
    };


    return petData && petData?.length > 0 && (
        <div>
            <Container>
                <Row>


                    {petData?.map((pet) => (
                        <Col sx={{
                        }} id={pet.id}>
                            <Card key={pet.id} sx={{
                                margin: '10px',
                                maxWidth: '500px',
                                backgroundColor: '#c3dfd6',
                                borderRadius: '10px',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <CardContent>
                                    <Typography variant="h6" color="#004d40" gutterBottom>
                                        Username: {pet.owner.user.firstname} - {pet.owner.user.surname}
                                    </Typography>
                                    <Typography variant="h6" color="#004d40" gutterBottom>
                                        Pet Name: {pet.name}
                                    </Typography>
                                    <Typography variant="h6" color="#004d40" gutterBottom>
                                        Pet Type: {pet.type.animalType}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <button style={{color: '#ffffff', backgroundColor: '#6c9286', borderRadius: '15px'}}
                                            onClick={() => handleChoose(pet)}>Choose
                                    </button>
                                </CardActions>
                            </Card>

                        </Col>


                    ))
                    }
                </Row>
            </Container>
            {showModal && (
                <div className="modal" style={{display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Pet Info</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                {selectedPet && (
                                    <div className='d-flex flex-column'>
                                        <h1>Pet Name: {selectedPet.name}</h1>
                                        <h6>Owner Name: {selectedPet.owner.user.firstname}</h6>
                                        <h6>Owner Surname: {selectedPet.owner.user.surname}</h6>
                                        <small className='text-black'> Animal Type: {selectedPet.type.animalType}</small>
                                        <small>Age: {selectedPet.age} </small>
                                        <small>Age Category: {selectedPet.ageCategory} </small>
                                        <small>Birth Date: {selectedPet.birthDate} </small>
                                        <small>Blood Type: {selectedPet.bloodType} </small>
                                        <small>Breed Name: {selectedPet.breed.breedName}</small>
                                        <small>Chip Number: {selectedPet.chipNumber} </small>
                                        <small>Color: {selectedPet.color} </small>
                                        <small>Gender: {selectedPet.gender} </small>
                                        <small>Length: {selectedPet.length}</small>
                                        <small>Weight: {selectedPet.weight} </small>
                                    </div>
                                )}
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
};

export default PetCard;
