package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.ClinicDto;
import com.example.AnimalClinicPro.dto.ClinicProductDto;
import com.example.AnimalClinicPro.dto.CreateClinicProductRequest;
import com.example.AnimalClinicPro.entity.ClinicProduct;
import com.example.AnimalClinicPro.repository.ClinicProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClinicProductService {

    private final ClinicProductRepository clinicProductRepository;
    private final ClinicService clinicService;

    public ClinicProductService(ClinicProductRepository clinicProductRepository, ClinicService clinicService) {
        this.clinicProductRepository = clinicProductRepository;
        this.clinicService = clinicService;
    }

    public List<ClinicProductDto> getAllClinicProducts() {
        return clinicProductRepository.findAll()
                .stream()
                .map(ClinicProductDto::convert)
                .collect(Collectors.toList());
    }

    public ClinicProductDto findClinicProductByProductName(String productName) {
        return clinicProductRepository.findByProductName(productName)
                .map(ClinicProductDto::convert)
                .orElseThrow(() -> new IllegalArgumentException("Clinic product not found by name : " + productName));
    }

    public ClinicProductDto createClinicProduct(CreateClinicProductRequest request) {
        ClinicProduct clinicProduct = new ClinicProduct();

        clinicProduct.setProductName(request.productName());
        clinicProduct.setPrice(request.price());
        clinicProduct.setStockQuantity(request.stockQuantity());
        clinicProduct.setClinic(clinicService.findClinicById(request.clinicId()));

        return ClinicProductDto.convert(clinicProductRepository.save(clinicProduct));
    }

    public ClinicProductDto updateClinicProduct(Long id, CreateClinicProductRequest request) {
        ClinicProduct clinicProduct = findClinicProductById(id);

        clinicProduct.setProductName(request.productName());
        clinicProduct.setPrice(request.price());
        clinicProduct.setStockQuantity(request.stockQuantity());
        clinicProduct.setClinic(clinicService.findClinicById(request.clinicId()));

        return ClinicProductDto.convert(clinicProductRepository.save(clinicProduct));
    }

    public ClinicProductDto getClinicProductById(Long id) {
        return ClinicProductDto.convert(findClinicProductById(id));
    }

    protected ClinicProduct findClinicProductById(Long id) {
        return clinicProductRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Clinic product not found by id : " + id));
    }

    public void deleteClinicProduct(Long id) {
        findClinicProductById(id);
        clinicProductRepository.deleteById(id);
    }
}
