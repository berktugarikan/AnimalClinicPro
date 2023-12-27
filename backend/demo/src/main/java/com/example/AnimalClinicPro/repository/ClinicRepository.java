package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClinicRepository extends JpaRepository <Clinic,Long> {
    Clinic findClinicbyId(Long id);
    Clinic findByName(String clinicName);
    Clinic findByCity(String city);
    Clinic findByPhoneNumber(String phoneNumber);
}
