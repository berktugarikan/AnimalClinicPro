package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.AnimalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalTypeRepository extends JpaRepository<AnimalType,Long> {
    AnimalType findByAnimalType(String animalType);

}
