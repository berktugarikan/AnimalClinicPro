package com.example.AnimalClinicPro.dto;

public record UpdatePasswordRequest(
        String oldPassword,
        String newPassword

) {
}