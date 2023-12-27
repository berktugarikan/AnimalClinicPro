package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.CustomerUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerUserRepository extends JpaRepository <CustomerUser, Long> {

    CustomerUser findByUser_id(Long id);
    CustomerUser findByUser_email(String email);
    CustomerUser findByUser_phoneNumber(String phoneNumber);
    CustomerUser findByUser_firstname(String name);
}
