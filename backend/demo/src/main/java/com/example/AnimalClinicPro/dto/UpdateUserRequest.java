package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.Role;

public record UpdateUserRequest(
        String firstname,
        String surname,
        String email,
        String phoneNumber,
        String username,
        Role role
) {
}
