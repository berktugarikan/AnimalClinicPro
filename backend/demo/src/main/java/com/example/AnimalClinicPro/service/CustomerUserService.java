package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.entity.CustomerUser;
import com.example.AnimalClinicPro.repository.CustomerUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerUserService {

    private final CustomerUserRepository customerUserRepository;

    @Autowired
    public CustomerUserService(CustomerUserRepository customerUserRepository) {
        this.customerUserRepository = customerUserRepository;
    }

    public List<CustomerUser> getAllCustomerUsers() {
        return customerUserRepository.findAll();
    }

    public CustomerUser getCustomerUserById(Long id) {
        return customerUserRepository.findById(id).orElse(null);
    }

    public CustomerUser getCustomerUserByUserId(Long userId) {
        return customerUserRepository.findByUser_id(userId);
    }

    public CustomerUser getCustomerUserByUserPhoneNumber(String phoneNumber) {
        return customerUserRepository.findByUser_phoneNumber(phoneNumber);
    }

    public CustomerUser createCustomerUser(CustomerUser customerUser) {
        return customerUserRepository.save(customerUser);
    }

    public void deleteCustomerUser(Long id) {
        customerUserRepository.deleteById(id);
    }
}
