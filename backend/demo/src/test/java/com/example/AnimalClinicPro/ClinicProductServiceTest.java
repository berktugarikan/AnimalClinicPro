package com.example.AnimalClinicPro;

import com.example.AnimalClinicPro.dto.ClinicProductDto;
import com.example.AnimalClinicPro.dto.CreateClinicProductRequest;
import com.example.AnimalClinicPro.entity.Clinic;
import com.example.AnimalClinicPro.entity.ClinicProduct;
import com.example.AnimalClinicPro.repository.ClinicProductRepository;
import com.example.AnimalClinicPro.service.ClinicProductService;
import com.example.AnimalClinicPro.service.ClinicService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ClinicProductServiceTest {

    @Mock
    private ClinicProductRepository clinicProductRepository;

    @Mock
    private ClinicService clinicService;

    @InjectMocks
    private ClinicProductService clinicProductService;

    @Test
    public void testGetAllClinicProducts() {
        // Mock data
        List<ClinicProduct> clinicProducts = List.of(/* Populate with mock clinic products */);
        when(clinicProductRepository.findAll()).thenReturn(clinicProducts);

        // Call the method
        List<ClinicProductDto> result = clinicProductService.getAllClinicProducts();

        // Verify
        assertEquals(clinicProducts.size(), result.size());
        // Add more assertions if needed
    }


    @Test
    public void testDeleteClinicProduct() {
        // Mock data
        Long productId = (Long) 1L;
        ClinicProduct clinicProduct = new ClinicProduct(/* Populate with mock data */);
        when(clinicProductRepository.findById(productId)).thenReturn(Optional.of(clinicProduct));

        // Call the method
        clinicProductService.deleteClinicProduct(productId);

        // Verify
        verify(clinicProductRepository, times(1)).deleteById(productId);
    }
}
