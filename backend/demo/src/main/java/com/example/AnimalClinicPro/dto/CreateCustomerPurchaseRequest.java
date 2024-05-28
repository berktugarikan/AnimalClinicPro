package com.example.AnimalClinicPro.dto;

public record CreateCustomerPurchaseRequest(
        Long clinicProductId,
        String paymentDate,
        Float paymentAmount,
        String paymentMethod,
        Long veterinaryId,
        Long customerId
) {
}
