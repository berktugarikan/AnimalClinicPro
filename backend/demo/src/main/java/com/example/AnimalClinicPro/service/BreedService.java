package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.entity.AnimalType;
import com.example.AnimalClinicPro.entity.Breed;
import com.example.AnimalClinicPro.repository.BreedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BreedService {

    private final BreedRepository breedRepository;

    @Autowired
    public BreedService(BreedRepository breedRepository) {
        this.breedRepository = breedRepository;
    }

    public List<Breed> getAllBreeds() {
        return breedRepository.findAll();
    }

    public List<Breed> getBreedsByAnimalType(AnimalType animalType) {
        return breedRepository.findAllBreedByAnimalType(animalType);
    }

    public Breed createBreed(Breed breed) {
        return breedRepository.save(breed);
    }

    public void deleteBreed(Long id) {
        breedRepository.deleteById(id);
    }
}
