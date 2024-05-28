package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.dto.CreateCustomerPurchaseRequest;
import com.example.AnimalClinicPro.dto.CustomerPurchaseDto;
import com.example.AnimalClinicPro.service.CustomerPurchaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer-purchases")
public class CustomerPurchaseController {

    private final CustomerPurchaseService customerPurchaseService;

    public CustomerPurchaseController(CustomerPurchaseService customerPurchaseService) {
        this.customerPurchaseService = customerPurchaseService;
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody CreateCustomerPurchaseRequest request) {
        customerPurchaseService.save(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<CustomerPurchaseDto>> findAll() {
        return ResponseEntity.ok(customerPurchaseService.findAll());
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<CustomerPurchaseDto>> findByCustomerId(@PathVariable Long customerId) {
        return ResponseEntity.ok(customerPurchaseService.findByCustomer(customerId));
    }

    @GetMapping("/clinic/{veterinaryId}")
    public ResponseEntity<List<CustomerPurchaseDto>> findByClinic(@PathVariable Long veterinaryId) {
        return ResponseEntity.ok(customerPurchaseService.findByClinic(veterinaryId));
    }

    @GetMapping("{id}")
    public ResponseEntity<CustomerPurchaseDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(customerPurchaseService.findById(id));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        customerPurchaseService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
