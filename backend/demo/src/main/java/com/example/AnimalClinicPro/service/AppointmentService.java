package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.entity.Appointment;
import com.example.AnimalClinicPro.entity.CustomerUser;
import com.example.AnimalClinicPro.entity.VeterinarianUser;
import com.example.AnimalClinicPro.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getAppointmentsByCustomer(CustomerUser customer) {
        return appointmentRepository.findAllAppointmentByCustomer(customer);
    }

    public List<Appointment> getAppointmentsByVeterinarian(VeterinarianUser veterinarian) {
        return appointmentRepository.findAppointmentsByVeterinarian(veterinarian);
    }

    public List<Appointment> getAppointmentsByAppointmentType(Appointment.AppointmentType appointmentType) {
        return appointmentRepository.findAllAppointmentByAppointmentType(appointmentType);
    }

    public List<Appointment> getAppointmentsByCustomerAndStatus(CustomerUser customer, Appointment.AppointmentStatus status) {
        return appointmentRepository.findAppointmentsByCustomerAndStatus(customer, status);
    }

    public List<Appointment> getAppointmentsByVeterinarianAndStatus(VeterinarianUser veterinarian, Appointment.AppointmentStatus status) {
        return appointmentRepository.findAppointmentsByVeterinarianAndStatus(veterinarian, status);
    }

    public List<Appointment> getAppointmentsByStatus(Appointment.AppointmentStatus status) {
        return appointmentRepository.findAllAppointmentByStatus(status);
    }

    public List<Time> getAvailableAppointmentTimes(VeterinarianUser veterinarian, Date appointmentDate) {
        return appointmentRepository.findAvailableAppointmentTimes(veterinarian, appointmentDate);
    }

    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}