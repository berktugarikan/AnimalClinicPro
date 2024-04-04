package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.LabTest;

import java.sql.Date;

public record CreateLabTestRequest(
        String testDate, //yyyy-MM-dd
        LabTest.TestStatus testStatus,
        String testDescription,
        Long animalId,
        Long veterinarianId
) {
}
