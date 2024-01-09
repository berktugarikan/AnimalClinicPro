package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.entity.VaccinationType;
import com.example.AnimalClinicPro.service.VaccinationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vaccination-types")
public class VaccinationTypeController {

    private final VaccinationTypeService vaccinationTypeService;

    @Autowired
    public VaccinationTypeController(VaccinationTypeService vaccinationTypeService) {
        this.vaccinationTypeService = vaccinationTypeService;
    }

    @GetMapping("/animal-type/{animalTypeId}")
    public ResponseEntity<List<VaccinationType>> getVaccinationTypesByAnimalType(@PathVariable Long animalTypeId) {
        List<VaccinationType> vaccinationTypes = vaccinationTypeService.getVaccinationTypesByAnimalType(animalTypeId);
        return new ResponseEntity<>(vaccinationTypes, HttpStatus.OK);
    }

    @GetMapping("/frequency/{animalTypeId}/{vaccinationTypeId}")
    public ResponseEntity<Integer> getFrequencyByAnimalTypeAndVaccinationType(
            @PathVariable Long animalTypeId,
            @PathVariable Long vaccinationTypeId) {
        Integer frequency = vaccinationTypeService.getFrequencyByAnimalTypeAndVaccinationType(animalTypeId, vaccinationTypeId);
        return new ResponseEntity<>(frequency, HttpStatus.OK);
    }
}