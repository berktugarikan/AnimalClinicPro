package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.entity.VaccinationType;
import com.example.AnimalClinicPro.repository.VaccinationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VaccinationTypeService {

    private final VaccinationTypeRepository vaccinationTypeRepository;

    @Autowired
    public VaccinationTypeService(VaccinationTypeRepository vaccinationTypeRepository) {
        this.vaccinationTypeRepository = vaccinationTypeRepository;
    }

    public List<VaccinationType> getVaccinationTypesByAnimalType(Long animalTypeId) {
        return vaccinationTypeRepository.findByAnimalTypeId(animalTypeId);
    }

    public Integer getFrequencyByAnimalTypeAndVaccinationType(Long animalTypeId, Long vaccinationTypeId) {
        return vaccinationTypeRepository.findFrequencyByAnimalTypeAndVaccinationType(animalTypeId, vaccinationTypeId);
    }
}