package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.dto.AppointmentDto;
import com.example.AnimalClinicPro.dto.CreateAppointmentRequest;
import com.example.AnimalClinicPro.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService){
        this.appointmentService=appointmentService;
    }

    @GetMapping
    public ResponseEntity<List<AppointmentDto>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @PostMapping
    public ResponseEntity<AppointmentDto> createAppointment(@RequestBody CreateAppointmentRequest createAppointmentRequest) {
        return ResponseEntity.ok(appointmentService.createAppointment(createAppointmentRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentDto> updateAppointment(@PathVariable Long id, @RequestBody CreateAppointmentRequest createAppointmentRequest) {
        return ResponseEntity.ok(appointmentService.updateAppointment(id, createAppointmentRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDto> getAppointmentById(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsForCustomer(@PathVariable Long customerId) {
        // Customer rolüne sahip kullanıcının randevularını alma işlemi
        return ResponseEntity.ok(appointmentService.findAppointmentsByCustomerId(customerId));
    }

    @GetMapping("/veterinarian/{veterinarianId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsForVeterinarian(@PathVariable Long veterinarianId) {
        // Veterinarian rolüne sahip kullanıcının randevularını alma işlemi
        return ResponseEntity.ok(appointmentService.findAppointmentsByVeterinarianId(veterinarianId));
    }
}
