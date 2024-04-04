package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.Vaccination;

import java.sql.Date;
import java.sql.Time;

public record VaccinationDto(
    Long id,
    String vaccinationDate,
    Time vaccinationTime,
    String vaccinationStatus,
    String vaccinationDescription,
    AnimalDto animal,
    UserDto customer,
    UserDto veterinarian
) {

}
