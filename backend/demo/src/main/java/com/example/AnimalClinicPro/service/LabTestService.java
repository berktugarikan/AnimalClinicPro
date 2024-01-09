package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.entity.LabTest;
import com.example.AnimalClinicPro.repository.LabTestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LabTestService {

    private final LabTestRepository labTestRepository;

    @Autowired
    public LabTestService(LabTestRepository labTestRepository) {
        this.labTestRepository = labTestRepository;
    }

    public List<LabTest> getAllLabTests() {
        return labTestRepository.findAll();
    }

    public List<LabTest> getLabTestsByAnimalId(Long animalId) {
        return labTestRepository.findLabTestByAnimalId(animalId);
    }

    public List<LabTest> getLabTestsByCustomerId(Long customerId) {
        return labTestRepository.findByCustomerId(customerId);
    }

    public List<LabTest> getLabTestsByVeterinarianId(Long veterinarianId) {
        return labTestRepository.findByVeterinarianId(veterinarianId);
    }

    public LabTest createLabTest(LabTest labTest) {
        return labTestRepository.save(labTest);
    }

    public void deleteLabTest(Long id) {
        labTestRepository.deleteById(id);
    }
}
