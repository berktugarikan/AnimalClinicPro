package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.entity.VeterinarianUser;
import com.example.AnimalClinicPro.service.VeterinarianUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/veterinarian-users")
public class VeterinarianUserController {

    private final VeterinarianUserService veterinarianUserService;

    @Autowired
    public VeterinarianUserController(VeterinarianUserService veterinarianUserService) {
        this.veterinarianUserService = veterinarianUserService;
    }

    @GetMapping
    public ResponseEntity<List<VeterinarianUser>> getAllVeterinarianUsers() {
        List<VeterinarianUser> veterinarianUsers = veterinarianUserService.getAllVeterinarianUsers();
        return new ResponseEntity<>(veterinarianUsers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VeterinarianUser> getVeterinarianUserById(@PathVariable Long id) {
        VeterinarianUser veterinarianUser = veterinarianUserService.getVeterinarianUserById(id);
        return new ResponseEntity<>(veterinarianUser, HttpStatus.OK);
    }

    @GetMapping("/phone/{phoneNumber}")
    public ResponseEntity<VeterinarianUser> getVeterinarianUserByPhoneNumber(@PathVariable String phoneNumber) {
        VeterinarianUser veterinarianUser = veterinarianUserService.getVeterinarianUserByPhoneNumber(phoneNumber);
        return new ResponseEntity<>(veterinarianUser, HttpStatus.OK);
    }

    @GetMapping("/clinic/{clinicId}")
    public ResponseEntity<List<VeterinarianUser>> getVeterinariansByClinicId(@PathVariable Long clinicId) {
        List<VeterinarianUser> veterinarians = veterinarianUserService.getVeterinariansByClinicId(clinicId);
        return new ResponseEntity<>(veterinarians, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<VeterinarianUser> createVeterinarianUser(@RequestBody VeterinarianUser veterinarianUser) {
        VeterinarianUser createdVeterinarianUser = veterinarianUserService.createVeterinarianUser(veterinarianUser);
        return new ResponseEntity<>(createdVeterinarianUser, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVeterinarianUser(@PathVariable Long id) {
        veterinarianUserService.deleteVeterinarianUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
