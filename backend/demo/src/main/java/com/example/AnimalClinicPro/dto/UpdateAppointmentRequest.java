package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.Appointment;

public record UpdateAppointmentRequest(
        Long id,
        String date,
        String dateTime,
        String description,
        Appointment.AppointmentType appointmentType,
        Appointment.AppointmentStatus appointmentStatus,
        Long animalId,
        Long customerId,
        Long veterinarianId
) {
}
