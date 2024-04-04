package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.dto.CreateLabTestRequest;
import com.example.AnimalClinicPro.dto.LabTestDto;
import com.example.AnimalClinicPro.service.LabTestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lab-tests")
public class LabTestController {

    private final LabTestService labTestService;

    public LabTestController(LabTestService labTestService) {
        this.labTestService = labTestService;
    }

    @GetMapping
    public ResponseEntity<List<LabTestDto>> getAllLabTests() {
        return ResponseEntity.ok(labTestService.getAllLabTests());
    }

    @PostMapping
    public ResponseEntity<LabTestDto> createLabTest(@RequestBody CreateLabTestRequest request) {
        return ResponseEntity.ok(labTestService.createLabTest(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LabTestDto> getLabTestById(@PathVariable Long id) {
        return ResponseEntity.ok(labTestService.getLabTestById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LabTestDto> updateLabTest(@PathVariable Long id, @RequestBody CreateLabTestRequest request) {
        return ResponseEntity.ok(labTestService.updateLabTest(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLabTest(@PathVariable Long id) {
        labTestService.deleteLabTestById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<LabTestDto>> findLabTestsByAnimalId(@PathVariable Long animalId) {
        return ResponseEntity.ok(labTestService.findLabTestsByAnimalId(animalId));
    }
}
