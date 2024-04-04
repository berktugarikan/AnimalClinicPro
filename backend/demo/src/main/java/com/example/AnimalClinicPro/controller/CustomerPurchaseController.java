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

}
