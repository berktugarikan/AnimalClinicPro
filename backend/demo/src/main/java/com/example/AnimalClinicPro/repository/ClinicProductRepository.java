package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.ClinicProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClinicProductRepository extends JpaRepository<ClinicProduct, Long> {

    Optional<ClinicProduct> findByProductName(String productName);
}
