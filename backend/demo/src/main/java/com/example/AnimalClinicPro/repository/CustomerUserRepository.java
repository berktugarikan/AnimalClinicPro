package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.CustomerUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerUserRepository extends JpaRepository <CustomerUser, Long> {

    CustomerUser findByCustomerUserId(Long id);
    CustomerUser findByEmail(String email);
    CustomerUser findByPhoneNumber(String phoneNumber);
    CustomerUser findyByName(String name);
}
