package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.EducationalResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationalResourceRepository extends JpaRepository <EducationalResource,Long> {

}
