package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.LabTest;

public record LabTestDto(
        Long id,
        String testDate,
        String testStatus,
        String testDescription,
        AnimalDto animal,
        UserDto customer,
        UserDto veterinarian
) {
}
