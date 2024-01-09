package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.entity.ClinicProduct;
import com.example.AnimalClinicPro.repository.ClinicProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClinicProductService {

    private final ClinicProductRepository clinicProductRepository;

    @Autowired
    public ClinicProductService(ClinicProductRepository clinicProductRepository) {
        this.clinicProductRepository = clinicProductRepository;
    }

    public List<ClinicProduct> getAllClinicProducts() {
        return clinicProductRepository.findAll();
    }

    public List<ClinicProduct> getClinicProductsByClinicId(Long clinicId) {
        return clinicProductRepository.findByClinicId(clinicId);
    }

    public ClinicProduct createClinicProduct(ClinicProduct clinicProduct) {
        return clinicProductRepository.save(clinicProduct);
    }

    public void deleteClinicProduct(Long id) {
        clinicProductRepository.deleteById(id);
    }
}
