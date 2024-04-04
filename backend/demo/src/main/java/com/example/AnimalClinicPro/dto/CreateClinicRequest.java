package com.example.AnimalClinicPro.dto;

public record CreateClinicRequest(
    String clinicName,
    String address,
    String city,
    String district,
    String authorizedName,
    String authorizedSurname,
    String email,
    String phoneNumber,
    String password
) {
}
