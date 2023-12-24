package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.AnimalType;
import com.example.AnimalClinicPro.entity.Breed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BreedRepository extends JpaRepository<Breed,Long> {

    List<Breed> findAllBreedByAnimalType(AnimalType animalType); // Belirli bir hayvan türündeki ırkları getirir.

}
