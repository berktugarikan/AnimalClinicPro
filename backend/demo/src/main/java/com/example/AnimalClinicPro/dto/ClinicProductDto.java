package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.ClinicProduct;

public record ClinicProductDto(
        Long id,
        String productName,
        Float price,
        ClinicDto clinic
) {
    public static ClinicProductDto convert(ClinicProduct clinicProduct) {
        if (clinicProduct == null) {
            return null; // Return null if clinicProduct is null
        }

        return new ClinicProductDto(
                clinicProduct.getId(),
                clinicProduct.getProductName(),
                clinicProduct.getPrice(),
                ClinicDto.convert(clinicProduct.getClinic())
        );
    }
}
