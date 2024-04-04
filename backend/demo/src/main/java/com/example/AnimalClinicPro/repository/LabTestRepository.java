package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.LabTest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LabTestRepository extends JpaRepository<LabTest, Long> {

    List<LabTest> findByAnimal_Id(Long animalId);
}
