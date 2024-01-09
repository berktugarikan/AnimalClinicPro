package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.entity.AnimalType;
import com.example.AnimalClinicPro.service.AnimalTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animal-types")
public class AnimalTypeController {

    private final AnimalTypeService animalTypeService;

    @Autowired
    public AnimalTypeController(AnimalTypeService animalTypeService) {
        this.animalTypeService = animalTypeService;
    }

    @GetMapping
    public ResponseEntity<List<AnimalType>> getAllAnimalTypes() {
        List<AnimalType> animalTypes = animalTypeService.getAllAnimalTypes();
        return new ResponseEntity<>(animalTypes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalType> getAnimalTypeById(@PathVariable Long id) {
        AnimalType animalType = animalTypeService.getAnimalTypeById(id);
        return new ResponseEntity<>(animalType, HttpStatus.OK);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<AnimalType> getAnimalTypeByType(@PathVariable String type) {
        AnimalType animalType = animalTypeService.getAnimalTypeByType(type);
        return new ResponseEntity<>(animalType, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AnimalType> createAnimalType(@RequestBody AnimalType animalType) {
        AnimalType createdAnimalType = animalTypeService.createAnimalType(animalType);
        return new ResponseEntity<>(createdAnimalType, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimalType(@PathVariable Long id) {
        animalTypeService.deleteAnimalType(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
