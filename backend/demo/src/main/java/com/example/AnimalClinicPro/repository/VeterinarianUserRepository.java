package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.VeterinarianUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VeterinarianUserRepository extends JpaRepository<VeterinarianUser,Long> {
    VeterinarianUser findByUserName(String username);
    VeterinarianUser findByEmail(String email);
    VeterinarianUser findByPhoneNumber(String phoneNumber);
    VeterinarianUser findByVeterinarianUserId(Long id);
    VeterinarianUser findByName(String name);
}
