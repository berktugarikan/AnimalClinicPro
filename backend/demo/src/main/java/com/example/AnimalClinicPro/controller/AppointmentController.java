package com.example.AnimalClinicPro.controller;


import com.example.AnimalClinicPro.entity.Appointment;
import com.example.AnimalClinicPro.entity.CustomerUser;
import com.example.AnimalClinicPro.entity.VeterinarianUser;
import com.example.AnimalClinicPro.service.AppointmentService;
import com.example.AnimalClinicPro.service.CustomerUserService;
import com.example.AnimalClinicPro.service.VeterinarianUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final CustomerUserService customerUserService;

    private final VeterinarianUserService veterinarianUserService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService, CustomerUserService customerUserService, VeterinarianUserService veterinarianUserService) {
        this.appointmentService = appointmentService;
        this.customerUserService = customerUserService;
        this.veterinarianUserService = veterinarianUserService;
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentService.getAllAppointments();
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByCustomer(@PathVariable Long customerId) {
        CustomerUser customerUser = customerUserService.getCustomerUserById(customerId);
        List<Appointment> appointments = appointmentService.getAppointmentsByCustomer(customerUser);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }


    @GetMapping("/veterinarian/{veterinarianId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByVeterinarian(@PathVariable Long veterinarianId) {
        VeterinarianUser veterinarianUser = veterinarianUserService.getVeterinarianUserById(veterinarianId);
        List<Appointment> appointments = appointmentService.getAppointmentsByVeterinarian(veterinarianUser);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @GetMapping("/type/{appointmentType}")
    public ResponseEntity<List<Appointment>> getAppointmentsByType(@PathVariable Appointment.AppointmentType appointmentType) {
        List<Appointment> appointments = appointmentService.getAppointmentsByAppointmentType(appointmentType);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @GetMapping("/customer/{customerId}/status/{status}")
    public ResponseEntity<List<Appointment>> getAppointmentsByCustomerAndStatus(
            @PathVariable Long customerId,
            @PathVariable Appointment.AppointmentStatus status) {
        CustomerUser customerUser = customerUserService.getCustomerUserById(customerId);
        List<Appointment> appointments = appointmentService.getAppointmentsByCustomerAndStatus(customerUser, status);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @GetMapping("/veterinarian/{veterinarianId}/status/{status}")
    public ResponseEntity<List<Appointment>> getAppointmentsByVeterinarianAndStatus(@PathVariable Long veterinarianId,@PathVariable Appointment.AppointmentStatus status) {
        VeterinarianUser veterinarianUser = veterinarianUserService.getVeterinarianUserById(veterinarianId);
        List<Appointment> appointments = appointmentService.getAppointmentsByVeterinarianAndStatus(veterinarianUser, status);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Appointment>> getAppointmentsByStatus(@PathVariable Appointment.AppointmentStatus status) {
        List<Appointment> appointments = appointmentService.getAppointmentsByStatus(status);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @GetMapping("/available-times/{veterinarianId}/{appointmentDate}")
    public ResponseEntity<List<Time>> getAvailableAppointmentTimes(@PathVariable Long veterinarianId,@PathVariable Date appointmentDate) {
        VeterinarianUser veterinarianUser = veterinarianUserService.getVeterinarianUserById(veterinarianId);
        List<Time> availableTimes = appointmentService.getAvailableAppointmentTimes(veterinarianUser, appointmentDate);
        return new ResponseEntity<>(availableTimes, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
        Appointment createdAppointment = appointmentService.createAppointment(appointment);
        return new ResponseEntity<>(createdAppointment, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}