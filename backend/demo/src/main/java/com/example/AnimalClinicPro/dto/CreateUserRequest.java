package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.Role;
import lombok.Builder;

@Builder
public record CreateUserRequest(
        String firstname,
        String surname,
        String email,
        String password,
        String phoneNumber,
        String username,
        Role role,
        Long clinicId
) {
}
