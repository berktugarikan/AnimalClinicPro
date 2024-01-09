package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.entity.Vaccination;
import com.example.AnimalClinicPro.repository.VaccinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VaccinationService {

    private final VaccinationRepository vaccinationRepository;

    @Autowired
    public VaccinationService(VaccinationRepository vaccinationRepository) {
        this.vaccinationRepository = vaccinationRepository;
    }

    public List<Vaccination> getVaccinationsByAnimal(Long animalId) {
        return vaccinationRepository.findVaccinationByAnimalId(animalId);
    }

    public List<Vaccination> getVaccinationsByVeterinarianAndStatus(Long veterinarianId, Vaccination.VaccinationStatus status) {
        return vaccinationRepository.findVaccinationByVeterinarianIdAndVaccinationStatus(veterinarianId, status);
    }

    public List<Vaccination> getVaccinationsByCustomerAndStatus(Long customerId, Vaccination.VaccinationStatus status) {
        return vaccinationRepository.findVaccinationByCustomerIdAndVaccinationStatus(customerId, status);
    }

    public Vaccination createVaccination(Vaccination vaccination) {
        return vaccinationRepository.save(vaccination);
    }

    public void deleteVaccination(Long id) {
        vaccinationRepository.deleteById(id);
    }
}
