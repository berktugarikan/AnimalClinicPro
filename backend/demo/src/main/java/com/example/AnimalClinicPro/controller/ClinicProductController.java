package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.dto.ClinicProductDto;
import com.example.AnimalClinicPro.dto.CreateClinicProductRequest;
import com.example.AnimalClinicPro.service.ClinicProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clinic-products")
public class ClinicProductController {

    private final ClinicProductService clinicProductService;

    public ClinicProductController(ClinicProductService clinicProductService) {
        this.clinicProductService = clinicProductService;
    }

    @PostMapping
    public ResponseEntity<ClinicProductDto> createClinicProduct(CreateClinicProductRequest request) {
        return ResponseEntity.ok(clinicProductService.createClinicProduct(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClinicProductDto> getClinicProductById(@PathVariable Long id) {
        return ResponseEntity.ok(clinicProductService.getClinicProductById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClinicProductDto> updateClinicProduct(@PathVariable Long id, @RequestBody CreateClinicProductRequest request) {
        return ResponseEntity.ok(clinicProductService.updateClinicProduct(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClinicProduct(@PathVariable Long id) {
        clinicProductService.deleteClinicProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/product-name/{name}")
    public ResponseEntity<ClinicProductDto> getClinicProductByName(@PathVariable String name) {
        return ResponseEntity.ok(clinicProductService.findClinicProductByProductName(name));
    }
}
