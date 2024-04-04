package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.CustomerPurchase;

public record CustomerPurchaseDto(
        Long id,
        String purchaseDate,
        ClinicProductDto clinicProduct,
        Integer quantity,
        Float totalPrice,
        String paymentDate,
        Float paymentAmount,
        String paymentMethod
) {

    public static CustomerPurchaseDto convert(CustomerPurchase from) {
        return new CustomerPurchaseDto(
                from.getId(),
                from.getPurchaseDate().toString(),
                ClinicProductDto.convert(from.getClinicProduct()),
                from.getQuantity(),
                from.getTotalPrice(),
                from.getPaymentDate().toString(),
                from.getPaymentAmount(),
                from.getPaymentMethod());

    }
}
