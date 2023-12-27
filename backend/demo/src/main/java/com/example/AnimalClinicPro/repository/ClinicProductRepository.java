package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.Clinic;
import com.example.AnimalClinicPro.entity.ClinicProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClinicProductRepository extends JpaRepository <ClinicProduct,Long> {

    List<ClinicProduct> findAllClinicProduct (Clinic clinic); // Kliniğe ait productları listeler

}
