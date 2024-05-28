package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.LabTest;
import com.example.AnimalClinicPro.entity.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LabTestRepository extends JpaRepository<LabTest, Long> {

    List<LabTest> findByAnimal_Id(Long animalId);

    @Query("SELECT v FROM LabTest v WHERE v.animal.user.id = :customerId")
    List<LabTest> findByCustomerId(@Param("customerId") Long customerId);

    List<LabTest> findByVeterinarianId(Long veterinarianId);
}
