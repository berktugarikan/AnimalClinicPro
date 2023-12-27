package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClinicRepository extends JpaRepository <Clinic,Long> {
    Clinic findClinicById(Long id);

    Clinic findClinicByClinicName(String clinicName);

    Clinic findClinicByCity(String city);

    Clinic findClinicByPhoneNumber(String phoneNumber);
}
