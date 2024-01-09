package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.entity.LabTestType;
import com.example.AnimalClinicPro.repository.LabTestTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LabTestTypeService {

    private final LabTestTypeRepository labTestTypeRepository;

    @Autowired
    public LabTestTypeService(LabTestTypeRepository labTestTypeRepository) {
        this.labTestTypeRepository = labTestTypeRepository;
    }

    public List<LabTestType> getAllLabTestTypes() {
        return labTestTypeRepository.findAll();
    }

    public List<LabTestType> getLabTestTypesByAnimalTypeId(Long animalTypeId) {
        return labTestTypeRepository.findLabTestByAnimalType_Id(animalTypeId);
    }

    public LabTestType createLabTestType(LabTestType labTestType) {
        return labTestTypeRepository.save(labTestType);
    }

    public void deleteLabTestType(Long id) {
        labTestTypeRepository.deleteById(id);
    }
}
