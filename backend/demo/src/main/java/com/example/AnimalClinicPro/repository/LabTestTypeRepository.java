package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.LabTestType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabTestTypeRepository extends JpaRepository<LabTestType,Long> {

    List<LabTestType> findLabTestByAnimalType_Id(Long animalTypeId);// Belirli bir hayvan türüne ait lab test tiplerini getirir.
}

