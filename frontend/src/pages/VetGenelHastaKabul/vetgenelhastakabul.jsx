import React, { useState } from 'react';
import axios from 'axios';
import './VetGenelHastaKabul.css';
import SelectionBar from '@/shared/components/SelectionBar';

export default function VetGenelHastaKabul() {
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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimal((prevAnimal) => ({
      ...prevAnimal,
      [name]: value,
    }));
  };

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
          id: parseInt(animal.breed) // Assuming breed is a number, adjust accordingly
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

  return (
    <div className="vet-genel-hasta-kabul-page">
    {/* Sol tarafta SelectionBar */}
    <div className="selection-bar-container">
      <SelectionBar />
    </div>

    {/* Sağ tarafta VetGenelHastaKabul */}
    <div className="vet-genel-hasta-kabul-container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={animal.name} onChange={handleChange} required />
        </label>

        <label>
          Type:
          <select name="type" value={animal.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="1">Dog</option>
            <option value="2">Cat</option>
            <option value="3">Bird</option>
          </select>
        </label>

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
          <input type="date" name="birthDate" value={animal.birthDate} onChange={handleChange} required />
        </label>

        <label>
          Age:
          <input type="number" name="age" value={animal.age} onChange={handleChange} required />
        </label>

        <label>
          Weight:
          <input type="number" name="weight" value={animal.weight} onChange={handleChange} required />
        </label>

        <label>
          Chip Number:
          <input type="text" name="chipNumber" value={animal.chipNumber} onChange={handleChange} required />
        </label>

        <label>
          Breed:
          <select name="breed" value={animal.breed} onChange={handleChange} required>
            <option value="">Select Breed Type</option>
            <option value="1">Golden Retriever</option>
            <option value="2">Siamese</option>
            <option value="3">Parakeet</option>
            <option value="4">Kangal</option>
            <option value="5">British</option>
            <option value="6">Kanarya</option>
          </select>
        </label>

        <label>
          Color:
          <input type="text" name="color" value={animal.color} onChange={handleChange} required />
        </label>

        <label>
          Age Category:
          <select name="ageCategory" value={animal.ageCategory} onChange={handleChange} required >
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
          <input type="number" name="length" value={animal.length} onChange={handleChange} required />
        </label>

        <label>
          Owner:
          <input type="text" name="owner" value={animal.owner} onChange={handleChange} required />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
    </div>
  );

  
}

