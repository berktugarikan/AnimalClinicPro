package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.ClinicProduct;

public record ClinicProductDto(
    Long id,
    String productName,
    Float price,
    Integer stockQuantity,
    ClinicDto clinic
) {
    public static ClinicProductDto convert(ClinicProduct clinicProduct) {
        return new ClinicProductDto(
            clinicProduct.getId(),
            clinicProduct.getProductName(),
            clinicProduct.getPrice(),
            clinicProduct.getStockQuantity(),
            ClinicDto.convert(clinicProduct.getClinic()));
    }

}
