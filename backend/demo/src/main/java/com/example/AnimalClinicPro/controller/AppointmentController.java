package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.dto.AppointmentDto;
import com.example.AnimalClinicPro.dto.CreateAppointmentRequest;
import com.example.AnimalClinicPro.dto.UpdateAppointmentRequest;
import com.example.AnimalClinicPro.entity.Appointment;
import com.example.AnimalClinicPro.service.AppointmentSearchService;
import com.example.AnimalClinicPro.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final AppointmentSearchService appointmentSearchService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService, AppointmentSearchService appointmentSearchService){
        this.appointmentService=appointmentService;
        this.appointmentSearchService = appointmentSearchService;
    }

    @GetMapping
    public ResponseEntity<List<AppointmentDto>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @PostMapping
    public ResponseEntity<AppointmentDto> createAppointment(@RequestBody CreateAppointmentRequest createAppointmentRequest) {
        return ResponseEntity.ok(appointmentService.createAppointment(createAppointmentRequest));
    }



    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDto> getAppointmentById(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsForCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(appointmentService.findAppointmentsByCustomerId(customerId));
    }

    @GetMapping("/customer/{customerId}/{status}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByCustomerAndStatus(@PathVariable Long customerId, @PathVariable Appointment.AppointmentStatus status) {
        return ResponseEntity.ok(appointmentService.findAppointmentsByCustomerAndStatus(customerId, status));
    }

    @GetMapping("/veterinarian/{veterinarianId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsForVeterinarian(@PathVariable Long veterinarianId) {
        return ResponseEntity.ok(appointmentService.findAppointmentsByVeterinarianId(veterinarianId));
    }

    @GetMapping("/veterinarian/{veterinarianId}/{status}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByVeterinarianAndStatus(@PathVariable Long veterinarianId, @PathVariable Appointment.AppointmentStatus status) {
        return ResponseEntity.ok(appointmentService.findAppointmentsByVeterinarianAndStatus(veterinarianId, status));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<AppointmentDto> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByDate(@PathVariable String date) {
        return ResponseEntity.ok(appointmentSearchService.findAppointmentsByAppointmentDate(date));
    }

    @GetMapping("/time/{time}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByTime(@PathVariable String time) {
        return ResponseEntity.ok(appointmentSearchService.findAppointmentsByAppointmentTime(time));
    }
    @PutMapping("/{id}")
    public ResponseEntity<AppointmentDto> updateAppointment(@PathVariable Long id, @RequestBody CreateAppointmentRequest createAppointmentRequest) {
        return ResponseEntity.ok(appointmentService.updateAppointment(id, createAppointmentRequest));
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<AppointmentDto> updateAppointmentStatus(@PathVariable Long id, @RequestBody UpdateAppointmentRequest updateAppointmentRequest){
        return  ResponseEntity.ok(appointmentService.updateAppointmentStatus(id, updateAppointmentRequest));
    }
}

