package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.Vaccination;
import lombok.Builder;

import java.sql.Date;
import java.sql.Time;
@Builder
public record VaccinationDto(
        Long id,
        String vaccinationDate,
        String vaccinationTime,
        Vaccination.VaccinationStatus vaccinationStatus,
        String vaccinationDescription,
        AnimalDto animal,
        UserDto customer,
        UserDto veterinarian
) {


}

