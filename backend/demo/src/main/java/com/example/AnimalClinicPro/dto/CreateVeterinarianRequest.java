package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.Role;

public record CreateVeterinarianRequest(
        String firstname,
        String surname,
        String email,
        String password,
        String phoneNumber,
        String username,
        Long clinicId
) {
}
