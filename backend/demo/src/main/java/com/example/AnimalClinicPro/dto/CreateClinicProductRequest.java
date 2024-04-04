package com.example.AnimalClinicPro.dto;

public record CreateClinicProductRequest(
    String productName,
    Float price,
    Integer stockQuantity,
    Long clinicId
) {
}
