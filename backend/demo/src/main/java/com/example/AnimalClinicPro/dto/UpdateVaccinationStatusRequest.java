package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.Vaccination;

public record UpdateVaccinationStatusRequest (
    Vaccination.VaccinationStatus vaccinationStatus
){

}

