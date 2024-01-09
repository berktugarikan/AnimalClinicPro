package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.entity.Breed;
import com.example.AnimalClinicPro.entity.AnimalType;
import com.example.AnimalClinicPro.service.BreedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/breeds")
public class BreedController {

    private final BreedService breedService;

    @Autowired
    public BreedController(BreedService breedService) {
        this.breedService = breedService;
    }

    @GetMapping
    public ResponseEntity<List<Breed>> getAllBreeds() {
        List<Breed> breeds = breedService.getAllBreeds();
        return new ResponseEntity<>(breeds, HttpStatus.OK);
    }

    @GetMapping("/animal-type/{animalTypeId}")
    public ResponseEntity<List<Breed>> getBreedsByAnimalType(@PathVariable Long animalTypeId) {
        AnimalType animalType = new AnimalType();
        animalType.setId(animalTypeId);
        List<Breed> breeds = breedService.getBreedsByAnimalType(animalType);
        return new ResponseEntity<>(breeds, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Breed> createBreed(@RequestBody Breed breed) {
        Breed createdBreed = breedService.createBreed(breed);
        return new ResponseEntity<>(createdBreed, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBreed(@PathVariable Long id) {
        breedService.deleteBreed(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
