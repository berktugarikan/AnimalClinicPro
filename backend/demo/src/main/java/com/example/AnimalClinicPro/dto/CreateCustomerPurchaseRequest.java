package com.example.AnimalClinicPro.dto;

public record CreateCustomerPurchaseRequest(
        String purchaseDate,
        Long clinicProductId,
        Integer quantity,
        Float totalPrice,
        String paymentDate,
        Float paymentAmount,
        String paymentMethod
) {
}
