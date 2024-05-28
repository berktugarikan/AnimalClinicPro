package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.Appointment;
import com.example.AnimalClinicPro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.sql.Time;
import java.util.Collection;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // Müşteriye göre randevu bulma
    List<Appointment> findByCustomerId(Long customerId);

    // Veterinere göre randevu bulma
    List<Appointment> findByVeterinarianId(Long veterinarianId);

    List<Appointment> findByAppointmentDate(Date appointmentDate);

    List<Appointment> findByAppointmentTime(Time appointmentTime);

    List<Appointment> findByCustomerIdAndStatus(Long customerId, Appointment.AppointmentStatus status);

    List<Appointment> findByVeterinarianIdAndStatus(Long veterinarianId, Appointment.AppointmentStatus status);





}



