package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.CreateCustomerPurchaseRequest;
import com.example.AnimalClinicPro.dto.CustomerPurchaseDto;
import com.example.AnimalClinicPro.entity.ClinicProduct;
import com.example.AnimalClinicPro.entity.CustomerPurchase;
import com.example.AnimalClinicPro.repository.CustomerPurchaseRepository;
import com.example.AnimalClinicPro.utils.SqlDateConverter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerPurchaseService {

    private final CustomerPurchaseRepository repository;
    private final ClinicProductService clinicProductService;

    public CustomerPurchaseService(CustomerPurchaseRepository repository, ClinicProductService clinicProductService) {
        this.repository = repository;
        this.clinicProductService = clinicProductService;
    }

    public void save(CreateCustomerPurchaseRequest request) {
        ClinicProduct clinicProductById = clinicProductService.findClinicProductById(request.clinicProductId());

        CustomerPurchase customerPurchase = new CustomerPurchase();
        customerPurchase.setClinicProduct(clinicProductById);
        customerPurchase.setQuantity(request.quantity());
        customerPurchase.setTotalPrice(request.totalPrice());
        customerPurchase.setPaymentDate(SqlDateConverter.convert(request.paymentDate()));
        customerPurchase.setPurchaseDate(SqlDateConverter.convert(request.purchaseDate()));
        customerPurchase.setPaymentAmount(request.paymentAmount());
        customerPurchase.setPaymentMethod(request.paymentMethod());

        repository.save(customerPurchase);
    }

    public List<CustomerPurchaseDto> findAll() {
        return repository.findAll()
                .stream()
                .map(CustomerPurchaseDto::convert)
                .toList();
    }
}
