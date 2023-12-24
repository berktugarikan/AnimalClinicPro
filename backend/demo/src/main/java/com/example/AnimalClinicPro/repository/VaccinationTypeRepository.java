package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.VaccinationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VaccinationTypeRepository extends JpaRepository<VaccinationType,Long> {

    List<VaccinationType> findByAnimalTypeId(@Param("animalTypeId") Long animalTypeId);// Belirli bir hayvan türüne ait aşı tiplerini getirir.


    //Belirli bir hayvan türündeki belirli bir aşının yapılma sıklığını getirir.
    @Query("SELECT vt.frequency FROM VaccinationType vt WHERE vt.animalTypeId = :animalTypeId AND vt.id = :vaccinationTypeId")
    Integer findFrequencyByAnimalTypeAndVaccinationType(@Param("animalTypeId") Long animalTypeId, @Param("vaccinationTypeId") Long vaccinationTypeId);

}
