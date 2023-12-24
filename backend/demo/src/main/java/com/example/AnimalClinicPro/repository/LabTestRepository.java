package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.LabTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LabTestRepository extends JpaRepository<LabTest,Long> {

    List<LabTest> findLabTestByAnimalId(Long animalId); // Belirli bir hayvanın tüm lab test sonuçlarını getirir.
    List<LabTest> findByCustomerId(Long customerId);// Belirli bir müşterinin yaptırdığı lab test sonuçlarını getirir.
    List<LabTest> findByVeterinarianId(Long veterinarianId);// Belirli bir veterinerin yaptığı lab test sonuçlarını getirir.
}
