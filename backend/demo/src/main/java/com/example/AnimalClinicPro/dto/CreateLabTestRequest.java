package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.LabTest;
import lombok.Builder;

import java.sql.Date;

@Builder
public record CreateLabTestRequest(
        String testDate, //yyyy-MM-dd
        LabTest.TestStatus testStatus,
        String testDescription,
        Long animalId,
        Long veterinarianId
) {
}
