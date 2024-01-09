package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.entity.ClinicProduct;
import com.example.AnimalClinicPro.service.ClinicProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clinic-products")
public class ClinicProductController {

    private final ClinicProductService clinicProductService;

    @Autowired
    public ClinicProductController(ClinicProductService clinicProductService) {
        this.clinicProductService = clinicProductService;
    }

    @GetMapping
    public ResponseEntity<List<ClinicProduct>> getAllClinicProducts() {
        List<ClinicProduct> clinicProducts = clinicProductService.getAllClinicProducts();
        return new ResponseEntity<>(clinicProducts, HttpStatus.OK);
    }

    @GetMapping("/clinic/{clinicId}")
    public ResponseEntity<List<ClinicProduct>> getClinicProductsByClinicId(@PathVariable Long clinicId) {
        List<ClinicProduct> clinicProducts = clinicProductService.getClinicProductsByClinicId(clinicId);
        return new ResponseEntity<>(clinicProducts, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ClinicProduct> createClinicProduct(@RequestBody ClinicProduct clinicProduct) {
        ClinicProduct createdClinicProduct = clinicProductService.createClinicProduct(clinicProduct);
        return new ResponseEntity<>(createdClinicProduct, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClinicProduct(@PathVariable Long id) {
        clinicProductService.deleteClinicProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
