package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.VeterinarianUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VeterinarianUserRepository extends JpaRepository<VeterinarianUser,Long> {

    VeterinarianUser findByUser_phoneNumber(String phoneNumber);
    VeterinarianUser findByUser_id(Long id);
    List<VeterinarianUser> findByClinicId(Long clinicId);
}
