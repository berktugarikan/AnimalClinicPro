package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.entity.LabTest;
import com.example.AnimalClinicPro.service.LabTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lab-tests")
public class LabTestController {

    private final LabTestService labTestService;

    @Autowired
    public LabTestController(LabTestService labTestService) {
        this.labTestService = labTestService;
    }

    @GetMapping
    public ResponseEntity<List<LabTest>> getAllLabTests() {
        List<LabTest> labTests = labTestService.getAllLabTests();
        return new ResponseEntity<>(labTests, HttpStatus.OK);
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<LabTest>> getLabTestsByAnimalId(@PathVariable Long animalId) {
        List<LabTest> labTests = labTestService.getLabTestsByAnimalId(animalId);
        return new ResponseEntity<>(labTests, HttpStatus.OK);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<LabTest>> getLabTestsByCustomerId(@PathVariable Long customerId) {
        List<LabTest> labTests = labTestService.getLabTestsByCustomerId(customerId);
        return new ResponseEntity<>(labTests, HttpStatus.OK);
    }

    @GetMapping("/veterinarian/{veterinarianId}")
    public ResponseEntity<List<LabTest>> getLabTestsByVeterinarianId(@PathVariable Long veterinarianId) {
        List<LabTest> labTests = labTestService.getLabTestsByVeterinarianId(veterinarianId);
        return new ResponseEntity<>(labTests, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<LabTest> createLabTest(@RequestBody LabTest labTest) {
        LabTest createdLabTest = labTestService.createLabTest(labTest);
        return new ResponseEntity<>(createdLabTest, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLabTest(@PathVariable Long id) {
        labTestService.deleteLabTest(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
