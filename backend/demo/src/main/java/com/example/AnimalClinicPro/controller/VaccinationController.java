package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.dto.CreateVaccinationRequest;
import com.example.AnimalClinicPro.dto.VaccinationDto;
import com.example.AnimalClinicPro.service.VaccinationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vaccinations")
public class VaccinationController {

    private final VaccinationService vaccinationService;

    public VaccinationController(VaccinationService vaccinationService) {
        this.vaccinationService = vaccinationService;
    }

    @GetMapping
    public ResponseEntity<List<VaccinationDto>> getAllVaccinations() {
        return ResponseEntity.ok(vaccinationService.getAllVaccinations());
    }

    @PostMapping
    public ResponseEntity<VaccinationDto> createVaccination(@RequestBody CreateVaccinationRequest request) {
        return ResponseEntity.ok(vaccinationService.createVaccination(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VaccinationDto> getVaccinationById(@PathVariable Long id) {
        return ResponseEntity.ok(vaccinationService.getVaccinationById(id));
    }

    @GetMapping("/veterinarian/{id}")
    public ResponseEntity<List<VaccinationDto>> findVaccinationsByVeterinarianId(@PathVariable Long id) {
        return ResponseEntity.ok(vaccinationService.findVaccinationsByVeterinarianId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VaccinationDto> updateVaccination(@PathVariable Long id, @RequestBody CreateVaccinationRequest request) {
        return ResponseEntity.ok(vaccinationService.updateVaccination(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVaccination(@PathVariable Long id) {
        vaccinationService.deleteVaccinationById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<VaccinationDto>> findVaccinationsByAnimalId(@PathVariable Long animalId) {
        return ResponseEntity.ok(vaccinationService.findVaccinationsByAnimalId(animalId));
    }
}
