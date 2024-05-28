package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.ClinicProductDto;
import com.example.AnimalClinicPro.dto.CreateCustomerPurchaseRequest;
import com.example.AnimalClinicPro.dto.CustomerPurchaseDto;
import com.example.AnimalClinicPro.entity.ClinicProduct;
import com.example.AnimalClinicPro.entity.CustomerPurchase;
import com.example.AnimalClinicPro.entity.User;
import com.example.AnimalClinicPro.exception.PurchaseNotFoundException;
import com.example.AnimalClinicPro.repository.CustomerPurchaseRepository;
import com.example.AnimalClinicPro.utils.SqlDateConverter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerPurchaseService {

    private final CustomerPurchaseRepository repository;
    private final ClinicProductService clinicProductService;
    private final UserService userService;

    public CustomerPurchaseService(CustomerPurchaseRepository repository, ClinicProductService clinicProductService, UserService userService) {
        this.repository = repository;
        this.clinicProductService = clinicProductService;
        this.userService = userService;
    }

    public void save(CreateCustomerPurchaseRequest request) {
        ClinicProduct clinicProductById = clinicProductService.findClinicProductById(request.clinicProductId());

        CustomerPurchase customerPurchase = new CustomerPurchase();
        customerPurchase.setClinicProduct(clinicProductById);
        customerPurchase.setPaymentDate(SqlDateConverter.convert(request.paymentDate()));
        customerPurchase.setPaymentAmount(request.paymentAmount());
        customerPurchase.setPaymentMethod(request.paymentMethod());
        customerPurchase.setCustomerId(request.customerId());
        customerPurchase.setVeterinaryId(request.veterinaryId());

        repository.save(customerPurchase);
    }

    public List<CustomerPurchaseDto> findByClinic(Long veterinaryId) {
        List<User> users = userService.findUsersBySameClinic(veterinaryId);
        List<CustomerPurchase> purchases = repository.findAll();

        List<CustomerPurchase> filteredPurchases = new ArrayList<>();

        for (CustomerPurchase purchase : purchases) {
            for (User user : users) {
                if (user.getId().equals(purchase.getVeterinaryId())) {
                    filteredPurchases.add(purchase);
                }
            }
        }

        return filteredPurchases.stream().map(this::convert).toList();
    }

    public List<CustomerPurchaseDto> findByCustomer(Long customerId) {
        return repository.findByCustomerId(customerId)
                .stream()
                .map(this::convert)
                .toList();
    }
    public CustomerPurchaseDto convert(CustomerPurchase customerPurchase) {
        if (customerPurchase == null) {
            return null; // Return null if customerPurchase is null
        }
        return new CustomerPurchaseDto(customerPurchase.getId(),
                ClinicProductDto.convert(customerPurchase.getClinicProduct()),
                SqlDateConverter.convert(customerPurchase.getPaymentDate()),
                customerPurchase.getPaymentAmount(),
                customerPurchase.getPaymentMethod(),
                userService.findUserById(customerPurchase.getVeterinaryId()),
                userService.findUserById(customerPurchase.getCustomerId()));
    }
    public List<CustomerPurchaseDto> findAll() {
        return repository.findAll()
                .stream()
                .map(this::convert)
                .toList();
    }

    public CustomerPurchaseDto findById(Long id) {
        return repository.findById(id)
                .map(this::convert)
                .orElseThrow(() -> new PurchaseNotFoundException("Purchase can not find " + id));
    }
    public void deleteById(Long id) {
        repository.findById(id).orElseThrow(() -> new PurchaseNotFoundException("Purchase with id " + id + " not found"));
        repository.deleteById(id);
    }
}
