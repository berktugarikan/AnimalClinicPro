package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.entity.CustomerPurchase;
import com.example.AnimalClinicPro.service.CustomerPurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer-purchases")
public class CustomerPurchaseController {

    private final CustomerPurchaseService customerPurchaseService;

    @Autowired
    public CustomerPurchaseController(CustomerPurchaseService customerPurchaseService) {
        this.customerPurchaseService = customerPurchaseService;
    }

    @GetMapping
    public ResponseEntity<List<CustomerPurchase>> getAllCustomerPurchases() {
        List<CustomerPurchase> customerPurchases = customerPurchaseService.getAllCustomerPurchases();
        return new ResponseEntity<>(customerPurchases, HttpStatus.OK);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<CustomerPurchase>> getCustomerPurchasesByCustomerId(@PathVariable Long customerId) {
        List<CustomerPurchase> customerPurchases = customerPurchaseService.getCustomerPurchasesByCustomerId(customerId);
        return new ResponseEntity<>(customerPurchases, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CustomerPurchase> createCustomerPurchase(@RequestBody CustomerPurchase customerPurchase) {
        CustomerPurchase createdCustomerPurchase = customerPurchaseService.createCustomerPurchase(customerPurchase);
        return new ResponseEntity<>(createdCustomerPurchase, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomerPurchase(@PathVariable Long id) {
        customerPurchaseService.deleteCustomerPurchase(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
