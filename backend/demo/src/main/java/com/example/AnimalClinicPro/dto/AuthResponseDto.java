package com.example.AnimalClinicPro.dto;

import lombok.Builder;

@Builder
public record AuthResponseDto(
        String token,
        String role,
        String username,
        Long userId
) {
}
