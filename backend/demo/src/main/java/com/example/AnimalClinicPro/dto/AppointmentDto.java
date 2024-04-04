package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.Appointment;

import java.sql.Date;
import java.sql.Time;

public record AppointmentDto(
    Long id,
    AnimalDto animal,
    String appointmentDate,
    String appointmentTime,
    String appointmentType,
    String appointmentDescription,
    String status,
    UserDto customer,
    UserDto veterinarian
) {

}
