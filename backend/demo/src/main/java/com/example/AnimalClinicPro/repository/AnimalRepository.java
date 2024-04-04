package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.Animal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AnimalRepository extends JpaRepository<Animal,Long> {
    List<Animal> findAnimalByUserId(Long userId);
    Animal findAnimalByChipNumber(String chipNumber);

    void deleteAnimalById(Long id);



}
