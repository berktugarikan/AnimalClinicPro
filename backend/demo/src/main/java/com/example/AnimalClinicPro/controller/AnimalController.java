package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.dto.AnimalDto;
import com.example.AnimalClinicPro.dto.CreateAnimalRequest;
import com.example.AnimalClinicPro.entity.Animal;
import com.example.AnimalClinicPro.entity.User;
import com.example.AnimalClinicPro.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animals")
public class AnimalController {

    private final AnimalService animalService;

    @Autowired
    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @GetMapping
    public ResponseEntity<List<AnimalDto>> getAllAnimals() {
        return ResponseEntity.ok(animalService.getAllAnimals());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalDto> getAnimalById(@PathVariable Long id) {
        return ResponseEntity.ok(animalService.findAnimalById(id));
    }

    @GetMapping("/chip/{chipNumber}")
    public ResponseEntity<AnimalDto> getAnimalByChipNumber(@PathVariable String chipNumber) {
        return ResponseEntity.ok(animalService.getAnimalByChipNumber(chipNumber));
    }

    @GetMapping("/owner/{userId}")
    public ResponseEntity<List<AnimalDto>> getAnimalsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(animalService.getAnimalsByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<AnimalDto> createAnimal(@RequestBody CreateAnimalRequest request) {
        return ResponseEntity.ok(animalService.createAnimal(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnimalDto> updateAnimal(@PathVariable Long id, @RequestBody CreateAnimalRequest request) {
        return ResponseEntity.ok(animalService.updateAnimal(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable Long id) {
        animalService.deleteAnimalById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
