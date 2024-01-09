package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.entity.CustomerUser;
import com.example.AnimalClinicPro.service.CustomerUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer-users")
public class CustomerUserController {

    private final CustomerUserService customerUserService;

    @Autowired
    public CustomerUserController(CustomerUserService customerUserService) {
        this.customerUserService = customerUserService;
    }

    @GetMapping
    public ResponseEntity<List<CustomerUser>> getAllCustomerUsers() {
        List<CustomerUser> customerUsers = customerUserService.getAllCustomerUsers();
        return new ResponseEntity<>(customerUsers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerUser> getCustomerUserById(@PathVariable Long id) {
        CustomerUser customerUser = customerUserService.getCustomerUserById(id);
        return new ResponseEntity<>(customerUser, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<CustomerUser> getCustomerUserByUserId(@PathVariable Long userId) {
        CustomerUser customerUser = customerUserService.getCustomerUserByUserId(userId);
        return new ResponseEntity<>(customerUser, HttpStatus.OK);
    }

    @GetMapping("/user/phone/{phoneNumber}")
    public ResponseEntity<CustomerUser> getCustomerUserByUserPhoneNumber(@PathVariable String phoneNumber) {
        CustomerUser customerUser = customerUserService.getCustomerUserByUserPhoneNumber(phoneNumber);
        return new ResponseEntity<>(customerUser, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CustomerUser> createCustomerUser(@RequestBody CustomerUser customerUser) {
        CustomerUser createdCustomerUser = customerUserService.createCustomerUser(customerUser);
        return new ResponseEntity<>(createdCustomerUser, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomerUser(@PathVariable Long id) {
        customerUserService.deleteCustomerUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
