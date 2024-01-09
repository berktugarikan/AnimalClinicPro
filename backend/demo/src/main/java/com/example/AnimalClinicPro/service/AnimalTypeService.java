package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.entity.AnimalType;
import com.example.AnimalClinicPro.repository.AnimalTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalTypeService {

    private final AnimalTypeRepository animalTypeRepository;

    @Autowired
    public AnimalTypeService(AnimalTypeRepository animalTypeRepository) {
        this.animalTypeRepository = animalTypeRepository;
    }

    public List<AnimalType> getAllAnimalTypes() {
        return animalTypeRepository.findAll();
    }

    public AnimalType getAnimalTypeById(Long id) {
        return animalTypeRepository.findById(id).orElse(null);
    }

    public AnimalType getAnimalTypeByType(String type) {
        return animalTypeRepository.findByAnimalType(type);
    }

    public AnimalType createAnimalType(AnimalType animalType) {
        return animalTypeRepository.save(animalType);
    }

    public void deleteAnimalType(Long id) {
        animalTypeRepository.deleteById(id);
    }
}
