package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.Clinic;
import com.example.AnimalClinicPro.entity.ClinicProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ClinicProductRepository extends JpaRepository <ClinicProduct,Long> {

    List<ClinicProduct> findAllClinicProduct (Clinic clinic); // Kliniğe ait productları listeler

}
