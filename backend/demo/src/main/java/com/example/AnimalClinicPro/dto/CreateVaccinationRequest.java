package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.Vaccination;

import java.sql.Date;
import java.sql.Time;

public record CreateVaccinationRequest(
    String vaccinationDate, //yyyy-MM-dd
    String vaccinationTime, //HH:mm:ss
    Vaccination.VaccinationStatus vaccinationStatus,
    String vaccinationDescription,
    Long animalId,
    Long veterinarianId
) {
}
