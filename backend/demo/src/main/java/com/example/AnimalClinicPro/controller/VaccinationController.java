package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.entity.Vaccination;
import com.example.AnimalClinicPro.service.VaccinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vaccinations")
public class VaccinationController {

    private final VaccinationService vaccinationService;

    @Autowired
    public VaccinationController(VaccinationService vaccinationService) {
        this.vaccinationService = vaccinationService;
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<Vaccination>> getVaccinationsByAnimal(@PathVariable Long animalId) {
        List<Vaccination> vaccinations = vaccinationService.getVaccinationsByAnimal(animalId);
        return new ResponseEntity<>(vaccinations, HttpStatus.OK);
    }

    @GetMapping("/veterinarian/{veterinarianId}/{status}")
    public ResponseEntity<List<Vaccination>> getVaccinationsByVeterinarianAndStatus(
            @PathVariable Long veterinarianId,
            @PathVariable Vaccination.VaccinationStatus status) {
        List<Vaccination> vaccinations = vaccinationService.getVaccinationsByVeterinarianAndStatus(veterinarianId, status);
        return new ResponseEntity<>(vaccinations, HttpStatus.OK);
    }

    @GetMapping("/customer/{customerId}/{status}")
    public ResponseEntity<List<Vaccination>> getVaccinationsByCustomerAndStatus(
            @PathVariable Long customerId,
            @PathVariable Vaccination.VaccinationStatus status) {
        List<Vaccination> vaccinations = vaccinationService.getVaccinationsByCustomerAndStatus(customerId, status);
        return new ResponseEntity<>(vaccinations, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Vaccination> createVaccination(@RequestBody Vaccination vaccination) {
        Vaccination createdVaccination = vaccinationService.createVaccination(vaccination);
        return new ResponseEntity<>(createdVaccination, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVaccination(@PathVariable Long id) {
        vaccinationService.deleteVaccination(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
