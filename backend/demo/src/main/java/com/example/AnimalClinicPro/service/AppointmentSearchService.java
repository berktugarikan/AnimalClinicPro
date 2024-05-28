package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.AnimalDto;
import com.example.AnimalClinicPro.dto.AppointmentDto;
import com.example.AnimalClinicPro.dto.UserDto;
import com.example.AnimalClinicPro.entity.Appointment;
import com.example.AnimalClinicPro.repository.AppointmentRepository;
import com.example.AnimalClinicPro.utils.SqlDateConverter;
import com.example.AnimalClinicPro.utils.SqlTimeConverter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentSearchService {

    private final AppointmentRepository appointmentRepository;
    private final UserService userService;

    public AppointmentSearchService(AppointmentRepository appointmentRepository, UserService userService) {
        this.appointmentRepository = appointmentRepository;
        this.userService = userService;
    }

    public List<AppointmentDto> findAppointmentsByVeterinarianId(Long veterinarianId) {
        return appointmentRepository
                .findByVeterinarianId(veterinarianId)
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    public List<AppointmentDto> findAppointmentsByAppointmentDate(String appointmentDate) {
        return appointmentRepository
                .findByAppointmentDate(SqlDateConverter.convert(appointmentDate))
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    public List<AppointmentDto> findAppointmentsByAppointmentTime(String appointmentTime) {
        return appointmentRepository
                .findByAppointmentTime(SqlTimeConverter.convert(appointmentTime))
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
}
