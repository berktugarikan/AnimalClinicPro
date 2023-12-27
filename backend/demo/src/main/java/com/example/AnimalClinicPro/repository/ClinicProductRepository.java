package com.example.AnimalClinicPro.repository;


import com.example.AnimalClinicPro.entity.ClinicProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClinicProductRepository extends JpaRepository<ClinicProduct, Long> {
    List<ClinicProduct> findByClinicId(Long clinicId);// Kliniğe ait productları listeler
}