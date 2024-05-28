package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.CustomerPurchase;
import com.example.AnimalClinicPro.utils.SqlDateConverter;

public record CustomerPurchaseDto(
        Long id,
        ClinicProductDto clinicProduct,
        String paymentDate,
        Float paymentAmount,
        String paymentMethod,
        UserDto veterinary,
        UserDto customer
) {

}
