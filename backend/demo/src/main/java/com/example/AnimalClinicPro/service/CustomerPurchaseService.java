package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.entity.CustomerPurchase;
import com.example.AnimalClinicPro.repository.CustomerPurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerPurchaseService {

    private final CustomerPurchaseRepository customerPurchaseRepository;

    @Autowired
    public CustomerPurchaseService(CustomerPurchaseRepository customerPurchaseRepository) {
        this.customerPurchaseRepository = customerPurchaseRepository;
    }

    public List<CustomerPurchase> getAllCustomerPurchases() {
        return customerPurchaseRepository.findAll();
    }

    public List<CustomerPurchase> getCustomerPurchasesByCustomerId(Long customerId) {
        return customerPurchaseRepository.findByCustomerId(customerId);
    }

    public CustomerPurchase createCustomerPurchase(CustomerPurchase customerPurchase) {
        return customerPurchaseRepository.save(customerPurchase);
    }

    public void deleteCustomerPurchase(Long id) {
        customerPurchaseRepository.deleteById(id);
    }
}
