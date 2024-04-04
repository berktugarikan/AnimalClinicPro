package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.Clinic;

import java.util.Set;

public record ClinicDto(
    Long id,
    String clinicName,
    String city,
    String district,
    String address,
    String authorizedName,
    String authorizedSurname,
    String email,
    String phoneNumber,
    Set<UserDto> users
) {

    public static ClinicDto convert(Clinic clinic) {
        return new ClinicDto(
            clinic.getId(),
            clinic.getClinicName(),
            clinic.getCity(),
            clinic.getDistrict(),
            clinic.getAddress(),
            clinic.getAuthorizedName(),
            clinic.getAuthorizedSurname(),
            clinic.getEmail(),
            clinic.getPhoneNumber(),
            UserDto.convert(clinic.getUsers())
        );
    }
}
