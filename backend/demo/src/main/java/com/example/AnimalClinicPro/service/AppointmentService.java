package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.*;
import com.example.AnimalClinicPro.entity.Appointment;
import com.example.AnimalClinicPro.entity.User;
import com.example.AnimalClinicPro.exception.AppointmentNotFoundException;
import com.example.AnimalClinicPro.repository.AppointmentRepository;
import com.example.AnimalClinicPro.utils.SqlDateConverter;
import com.example.AnimalClinicPro.utils.SqlTimeConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;


import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final UserService userService;
    private final AnimalService animalService;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository, UserService userService, AnimalService animalService) {
        this.appointmentRepository = appointmentRepository;
        this.userService = userService;
        this.animalService = animalService;
    }

    public List<AppointmentDto> getAllAppointments() {
        return appointmentRepository
                .findAll()
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    public List<AppointmentDto> findAppointmentsByCustomerId(Long customerId) {
        return appointmentRepository.findByCustomerId(customerId)
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    public AppointmentDto createAppointment(CreateAppointmentRequest createAppointmentRequest) {
        Appointment appointment = new Appointment();

        setAttributeOfAppointment(createAppointmentRequest, appointment);

        Appointment savedAppointment = appointmentRepository.save(appointment);

        return convert(savedAppointment);
    }

    public AppointmentDto updateAppointment(Long id, CreateAppointmentRequest createAppointmentRequest) {
        Appointment appointment = findAppointmentById(id);
        setAttributeOfAppointment(createAppointmentRequest, appointment);
        return convert(appointmentRepository.save(appointment));

    }

    private void setAttributeOfAppointment(CreateAppointmentRequest createAppointmentRequest, Appointment appointment) {
        appointment.setAppointmentDate(SqlDateConverter.convert(createAppointmentRequest.date()));
        appointment.setAppointmentTime(SqlTimeConverter.convert(createAppointmentRequest.dateTime()));
        appointment.setAppointmentType(createAppointmentRequest.appointmentType());
        appointment.setAppointmentDescription(createAppointmentRequest.description());
        appointment.setStatus(createAppointmentRequest.appointmentStatus());
        appointment.setAnimal(animalService.getAnimalById(createAppointmentRequest.animalId()));
        appointment.setCustomerId(createAppointmentRequest.customerId());
        appointment.setVeterinarianId(createAppointmentRequest.veterinarianId());
    }

    public List<AppointmentDto> findAppointmentsByVeterinarianId(Long veterinarianId) {
        User userById = userService.getUserById(veterinarianId);
        List<User> usersBySameClinic = userService.findUsersBySameClinic(userById.getClinic().getId());
        List<Appointment> appointments = new ArrayList<>();
        for (User user : usersBySameClinic) {
            List<Appointment> userAppointments = appointmentRepository.findByVeterinarianId(user.getId());
            for (Appointment appointment : userAppointments) {
                if (!appointments.contains(appointment)) {
                    appointments.add(appointment);
                }
            }
        }
        return appointments
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    protected Appointment findAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException("Appointment not found by id : " + id));
    }

    public AppointmentDto getAppointmentById(Long id) {
        return convert(findAppointmentById(id));
    }

    public void deleteAppointment(Long id) {
        findAppointmentById(id);
        appointmentRepository.deleteById(id);
    }

    public List<AppointmentDto> findAppointmentsByCustomerAndStatus(Long customerId, Appointment.AppointmentStatus status) {
        return appointmentRepository.findByCustomerIdAndStatus(customerId, status)
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    public List<AppointmentDto> findAppointmentsByVeterinarianAndStatus(Long veterinarianId, Appointment.AppointmentStatus status) {
        return appointmentRepository.findByVeterinarianIdAndStatus(veterinarianId, status)
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    private  AppointmentDto convert(Appointment from) {
        UserDto customerById = userService.findUserById(from.getCustomerId());
        UserDto veterinarianById = userService.findUserById(from.getVeterinarianId());
        return new AppointmentDto(
                from.getId(),
                AnimalDto.convert(from.getAnimal()),
                from.getAppointmentDate().toString(),
                from.getAppointmentTime().toString(),
                from.getAppointmentType().name(),
                from.getAppointmentDescription(),
                from.getStatus().name(),
                customerById,
                veterinarianById);
    }

    private void setAttributeOfAppointmentStatus(UpdateAppointmentRequest updateAppointmentRequest, Appointment appointment) {
        appointment.setStatus(updateAppointmentRequest.appointmentStatus());

    }

    public AppointmentDto updateAppointmentStatus(Long id, UpdateAppointmentRequest updateAppointmentRequest) {
        Appointment appointment = findAppointmentById(id);
        setAttributeOfAppointmentStatus(updateAppointmentRequest, appointment);
        return convert(appointmentRepository.save(appointment));
    }
}
