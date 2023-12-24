package com.example.AnimalClinicPro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabTestType extends JpaRepository<LabTestType,Long> {
    List<LabTestType> findLabTestByAnimalType_Id(Long animalTypeId);// Belirli bir hayvan türüne ait lab test tiplerini getirir.
}
