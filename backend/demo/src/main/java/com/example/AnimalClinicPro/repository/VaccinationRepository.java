package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VaccinationRepository extends JpaRepository<Vaccination, Long> {

    List<Vaccination> findByAnimal_Id(Long animalId);

    List<Vaccination> findByVeterinarianId(Long veterinarianId);
}
