package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.dto.*;
import com.example.AnimalClinicPro.entity.Role;
import com.example.AnimalClinicPro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/customers")
    public ResponseEntity<List<UserDto>> getAllCustomers(@RequestParam(required = false) Long clinicId) {
        if (clinicId != null) {
            return ResponseEntity.ok(userService.findCustomersByClinicId(clinicId));
        } else {
            return ResponseEntity.ok(userService.findUsersByCustomer());
        }
    }

    @GetMapping("/vets")
    public ResponseEntity<List<UserDto>> getAllVets(@RequestParam(required = false) Long clinicId) {
        if (clinicId != null) {
            return ResponseEntity.ok(userService.findVetsByClinicId(clinicId));
        } else {
            return ResponseEntity.ok(userService.findUsersByVeterinarian());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }

    @GetMapping("/phone/{phoneNumber}")
    public ResponseEntity<UserDto> getUserByPhoneNumber(@PathVariable String phoneNumber) {
        return ResponseEntity.ok(userService.getUserByPhoneNumber(phoneNumber));
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody CreateUserRequest request) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    @PostMapping("/veterinarian")
    public ResponseEntity<UserDto> createVeterinarian(@RequestBody CreateVeterinarianRequest request) {
        return ResponseEntity.ok(userService.createVeterinarian(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UpdateUserRequest request) {
        return ResponseEntity.ok(userService.updateUser(id, request));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/role/{username}")
    public ResponseEntity<UserDto> updateUserRole(@PathVariable String username, @RequestBody UpdateUserRoleRequest request) {

        Role newRole = request.getRole();

        UserDto updatedUser = userService.updateUserRole(username, newRole);

        return ResponseEntity.ok(updatedUser);
    }
    @PutMapping("/change-password/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UpdatePasswordRequest request) {
        return ResponseEntity.ok(userService.updatePassword(id, request));
    }

    @GetMapping("/clinic/{clinicId}/customers-and-vets")
    public ResponseEntity<List<UserDto>> getCustomersAndVetsByClinicId(@PathVariable Long clinicId) {
        return ResponseEntity.ok(userService.findCustomersAndVetsByClinicId(clinicId));
    }
    @GetMapping("/clinic/{clinicId}/vets")
    public ResponseEntity<List<UserDto>> getVetsByClinicId(@PathVariable Long clinicId) {
        return ResponseEntity.ok(userService.findVetsByClinicId(clinicId));
    }

}
