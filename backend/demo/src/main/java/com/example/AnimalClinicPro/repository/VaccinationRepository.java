package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface VaccinationRepository extends JpaRepository<Vaccination,Long> {

    List<Vaccination> findVaccinationByAnimalId(Long animalId);// Belirli bir hayvanın aşı geçmişini getirir.

    List<Vaccination> findVaccinationByVeterinarianIdAndVaccinationStatus(Long veterinarianId, Vaccination.VaccinationStatus status);// Belirli bir veterinerin belirli durumdki aşıları getirir.

    List<Vaccination> findVaccinationByCustomerIdAndVaccinationStatus(Long customerId, Vaccination.VaccinationStatus status);// Belirli bir müşterinin belirli durumdaki aşıları getirir.


}
