package com.example.AnimalClinicPro.dto;

public record MailCheckRequest(
        Long userId,
        String code
) {
}
