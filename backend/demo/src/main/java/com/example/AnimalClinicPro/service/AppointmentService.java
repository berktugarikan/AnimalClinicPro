package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.AnimalDto;
import com.example.AnimalClinicPro.dto.AppointmentDto;
import com.example.AnimalClinicPro.dto.CreateAppointmentRequest;
import com.example.AnimalClinicPro.dto.UserDto;
import com.example.AnimalClinicPro.entity.Appointment;
import com.example.AnimalClinicPro.exception.AppointmentNotFoundException;
import com.example.AnimalClinicPro.repository.AppointmentRepository;
import com.example.AnimalClinicPro.utils.SqlDateConverter;
import com.example.AnimalClinicPro.utils.SqlTimeConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        return appointmentRepository.findByVeterinarianId(veterinarianId)
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

    private AppointmentDto convert(Appointment from) {
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
}
