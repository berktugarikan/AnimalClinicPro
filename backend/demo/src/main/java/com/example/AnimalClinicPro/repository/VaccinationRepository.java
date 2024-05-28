package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VaccinationRepository extends JpaRepository<Vaccination, Long> {

    List<Vaccination> findByAnimal_Id(Long animalId);

    List<Vaccination> findByVeterinarianId(Long veterinarianId);

    @Query("SELECT v FROM Vaccination v WHERE v.animal.user.id = :customerId")
    List<Vaccination> findByCustomerId(@Param("customerId") Long customerId);

    List<Vaccination> findByVeterinarianIdAndVaccinationStatus(Long veterinarianId, Vaccination.VaccinationStatus vaccinationStatus);
    @Query("SELECT v FROM Vaccination v WHERE v.animal.user.id = :customerId AND v.vaccinationStatus = :status")
    List<Vaccination> findByCustomerIdAndVaccinationStatus(@Param("customerId") Long customerId, @Param("status") Vaccination.VaccinationStatus vaccinationStatus);

}
