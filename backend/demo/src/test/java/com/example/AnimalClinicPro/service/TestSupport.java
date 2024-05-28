package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.*;
import com.example.AnimalClinicPro.entity.*;

import java.sql.Date;
import java.sql.Time;
import java.util.Set;

public class TestSupport {

    public User generateCustomer() {
        return User.builder()
                .id(1L)
                .email("email@gmail.com")
                .username("customer")
                .firstname("firstname")
                .surname("surname")
                .password("password")
                .phoneNumber("phoneNumber")
                .isEnabled(false)
                .role(Role.ROLE_CUSTOMER)
                .build();
    }

    public User generateVeterinarian() {
        return User.builder()
                .id(1L)
                .email("email@gmail.com")
                .username("veterinarian")
                .firstname("firstname")
                .surname("surname")
                .password("password")
                .phoneNumber("phoneNumber")
                .isEnabled(false)
                .role(Role.ROLE_VETERINARIAN)
                .build();
    }

    public Animal generateAnimal() {
        return Animal.builder()
                .id(1L)
                .name("name")
                .gender(Animal.Gender.Male)
                .type("type")
                .birthDate(Date.valueOf("2022-01-01"))
                .age(1)
                .weight(1f)
                .chipNumber("chipNumber")
                .breed("breed")
                .color("color")
                .ageCategory("ageCategory")
                .bloodType("bloodType")
                .length(1f)
                .user(generateCustomer())
                .build();
    }

    public Appointment generateAppointment() {
        return Appointment.builder()
                .id(1L)
                .appointmentDate(Date.valueOf("2022-01-01"))
                .appointmentTime(Time.valueOf("10:00:00"))
                .appointmentDescription("description")
                .animal(generateAnimal())
                .status(Appointment.AppointmentStatus.PENDING)
                .customerId(generateCustomer().getId())
                .veterinarianId(generateVeterinarian().getId())
                .build();
    }

    public Clinic generateClinic() {
        return Clinic.builder()
                .id(1L)
                .clinicName("name")
                .city("city")
                .address("address")
                .district("district")
                .authorizedName("authorizedName")
                .authorizedSurname("authorizedSurname")
                .email("email")
                .phoneNumber("phoneNumber")
                .password("password")
                .build();
    }

    public CreateClinicRequest generateCreateClinicRequest() {
        return CreateClinicRequest.builder()
                .clinicName("name")
                .city("city")
                .address("address")
                .district("district")
                .authorizedName("authorizedName")
                .authorizedSurname("authorizedSurname")
                .email("email")
                .phoneNumber("phoneNumber")
                .password("password")
                .build();
    }

    public LabTest generateLabTest() {
        return LabTest.builder()
                .id(1L)
                .testDate(Date.valueOf("2022-01-01"))
                .testStatus(LabTest.TestStatus.PENDING)
                .testDescription("description")
                .animal(generateAnimal())
                .veterinarianId(generateVeterinarian().getId())
                .build();
    }

    public CreateLabTestRequest generateCreateLabTestRequest() {
        return CreateLabTestRequest.builder()
                .testDate("2022-01-01")
                .testStatus(LabTest.TestStatus.PENDING)
                .testDescription("description")
                .animalId(generateAnimal().getId())
                .veterinarianId(generateVeterinarian().getId())
                .build();
    }

    public LabTestDto generateLabTestDto() {
        return LabTestDto.builder()
                .id(1L)
                .testDate("2022-01-01")
                .testStatus("PENDING")
                .testDescription("description")
                .animal(AnimalDto.convert(generateAnimal()))
                .veterinarian(UserDto.convert(generateVeterinarian()))
                .build();
    }

    public CreateUserRequest generateCreateUserRequest() {
        return CreateUserRequest.builder()
                .email("email")
                .username("username")
                .firstname("firstname")
                .surname("surname")
                .password("password")
                .phoneNumber("phoneNumber")
                .role(Role.ROLE_CUSTOMER)
                .build();
    }

    public UpdateUserRequest generateUpdateUserRequest() {
        return UpdateUserRequest.builder()
                .email("email")
                .username("username")
                .firstname("firstname")
                .surname("surname")
                .phoneNumber("phoneNumber")
                .role(Role.ROLE_CUSTOMER)
                .build();
    }

    public CreateVeterinarianRequest generateCreateVeterinarianRequest() {
        return CreateVeterinarianRequest.builder()
                .email("email")
                .username("username")
                .firstname("firstname")
                .surname("surname")
                .password("password")
                .phoneNumber("phoneNumber")
                .clinicId(generateClinic().getId())
                .build();
    }

    public Vaccination generateVaccination() {
        return Vaccination.builder()
                .id(1L)
                .vaccinationDate(Date.valueOf("2022-01-01"))
                .vaccinationTime(Time.valueOf("10:00:00"))
                .vaccinationDescription("description")
                .animal(generateAnimal())
                .veterinarianId(generateVeterinarian().getId())
                .build();
    }

    public CreateVaccinationRequest generateCreateVaccinationRequest() {
        return CreateVaccinationRequest.builder()
                .vaccinationDate("2022-01-01")
                .vaccinationTime("10:00:00")
                .vaccinationStatus(Vaccination.VaccinationStatus.PENDING)
                .vaccinationDescription("description")
                .animalId(generateAnimal().getId())
                .veterinarianId(generateVeterinarian().getId())
                .build();
    }

    public VaccinationDto generateVaccinationDto() {
        return VaccinationDto.builder()
                .id(1L)
                .vaccinationDate("2022-01-01")
                .vaccinationTime("10:00:00")
                .vaccinationStatus(Vaccination.VaccinationStatus.PENDING)
                .vaccinationDescription("description")
                .animal(AnimalDto.convert(generateAnimal()))
                .veterinarian(UserDto.convert(generateVeterinarian()))
                .build();
    }
}
