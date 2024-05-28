package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.Appointment;

public record UpdateAppointmentStatusRequest(
        Appointment.AppointmentStatus appointmentStatus
) {
}
