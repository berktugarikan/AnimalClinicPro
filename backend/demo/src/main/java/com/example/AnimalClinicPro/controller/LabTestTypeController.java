package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.entity.LabTestType;
import com.example.AnimalClinicPro.service.LabTestTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lab-test-types")
public class LabTestTypeController {

    private final LabTestTypeService labTestTypeService;

    @Autowired
    public LabTestTypeController(LabTestTypeService labTestTypeService) {
        this.labTestTypeService = labTestTypeService;
    }

    @GetMapping
    public ResponseEntity<List<LabTestType>> getAllLabTestTypes() {
        List<LabTestType> labTestTypes = labTestTypeService.getAllLabTestTypes();
        return new ResponseEntity<>(labTestTypes, HttpStatus.OK);
    }

    @GetMapping("/animal-type/{animalTypeId}")
    public ResponseEntity<List<LabTestType>> getLabTestTypesByAnimalTypeId(@PathVariable Long animalTypeId) {
        List<LabTestType> labTestTypes = labTestTypeService.getLabTestTypesByAnimalTypeId(animalTypeId);
        return new ResponseEntity<>(labTestTypes, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<LabTestType> createLabTestType(@RequestBody LabTestType labTestType) {
        LabTestType createdLabTestType = labTestTypeService.createLabTestType(labTestType);
        return new ResponseEntity<>(createdLabTestType, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLabTestType(@PathVariable Long id) {
        labTestTypeService.deleteLabTestType(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
