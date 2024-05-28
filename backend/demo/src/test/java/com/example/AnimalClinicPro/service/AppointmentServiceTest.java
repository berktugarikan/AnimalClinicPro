package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.entity.Appointment;
import com.example.AnimalClinicPro.exception.AppointmentNotFoundException;
import com.example.AnimalClinicPro.repository.AppointmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AppointmentServiceTest {

    private AppointmentRepository appointmentRepository;
    private AppointmentService appointmentService;
    private TestSupport testSupport = new TestSupport();

    @BeforeEach
    public void setUp() {
        appointmentRepository = mock(AppointmentRepository.class);
        appointmentService = mock(AppointmentService.class);
    }

    @Test
    public void testFindAppointmentByGivenId_whenIdExists_shouldReturnAppointment() {
        Appointment appointment = testSupport.generateAppointment();

        when(appointmentRepository.findById(1L)).thenReturn(Optional.of(appointment));
        when(appointmentService.findAppointmentById(1L)).thenReturn(appointment);

        Appointment actual = appointmentService.findAppointmentById(1L);

        assertEquals(appointment, actual);
    }

    @Test
    public void testFindAppointmentByGivenId_whenIdDoesNotExist_shouldThrowAppointmentNotFoundException() {

        when(appointmentRepository.findById(1L)).thenReturn(Optional.empty());

        when(appointmentService.findAppointmentById(1L)).thenThrow(AppointmentNotFoundException.class);

        assertThrows(AppointmentNotFoundException.class, () -> appointmentService.findAppointmentById(1L));
    }

    @Test
    public void testDeleteAppointmentByGivenId_whenIdExists_shouldDeleteAppointment() {

        Appointment appointment = testSupport.generateAppointment();

        when(appointmentRepository.findById(1L)).thenReturn(Optional.of(appointment));

        doNothing().when(appointmentRepository).deleteById(1L);

        assertAll(() -> appointmentService.deleteAppointment(1L));
    }

    @Test
    public void testDeleteAppointmentByGivenId_whenIdDoesNotExists_shouldThrowAppointmentNotFoundException() {

        when(appointmentRepository.findById(1L)).thenReturn(Optional.empty());

        when(appointmentService.findAppointmentById(1L)).thenThrow(AppointmentNotFoundException.class);

        assertThrows(AppointmentNotFoundException.class, () -> appointmentService.findAppointmentById(1L));
    }


}