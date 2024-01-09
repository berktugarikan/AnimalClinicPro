package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.entity.Animal;
import com.example.AnimalClinicPro.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalService {

    private final AnimalRepository animalRepository;

    @Autowired
    public AnimalService(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    public Animal getAnimalById(Long id) {
        return animalRepository.findAnimalById(id);
    }

    public Animal getAnimalByChipNumber(String chipNumber) {
        return animalRepository.findAnimalByChipNumber(chipNumber);
    }

    public List<Animal> getAnimalsByOwnerId(Long ownerId) {
        return animalRepository.findAnimalByOwner_Id(ownerId);
    }

    public Animal createAnimal(Animal animal) {
        return animalRepository.save(animal);
    }
}
