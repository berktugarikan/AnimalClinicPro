package com.example.AnimalClinicPro.exception;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record ErrorResponse(String message,
                            LocalDateTime timestamp) {
}
