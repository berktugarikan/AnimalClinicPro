package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.VeterinarianUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VeterinarianUserRepository extends JpaRepository<VeterinarianUser,Long> {
    VeterinarianUser findByUser_username(String username);
    VeterinarianUser findByUser_email(String email);
    VeterinarianUser findByUser_phoneNumber(String phoneNumber);
    VeterinarianUser findByUser_id(Long id);
    VeterinarianUser findByUser_firstname(String name);
}
