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

    List<Vaccination> findVaccinationByVeterinarianId(Long veterinarianId);// Belirli bir veterinerin yaptığı aşıları getirir.

    List<Vaccination> findVaccinationByCustomerIdAndVaccinationDateBetween(Long customerId, Date startDate, Date endDate);// Belirli bir müşterinin belirli bir tarih aralığındaki aşıları getirir.


    @Query("SELECT v FROM Vaccination v WHERE v.veterinarianId = :veterinarianId AND v.vaccinationStatus = 'PENDING'")
    List<Vaccination> findVeterinarianPendingVaccinations(@Param("veterinarianId") Long veterinarianId);// Belirli bir veterinerin yapacağı aşıları getirir.
}
