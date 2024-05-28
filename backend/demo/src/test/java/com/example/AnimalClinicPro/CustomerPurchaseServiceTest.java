package com.example.AnimalClinicPro;

import com.example.AnimalClinicPro.dto.CreateCustomerPurchaseRequest;
import com.example.AnimalClinicPro.dto.CustomerPurchaseDto;
import com.example.AnimalClinicPro.entity.ClinicProduct;
import com.example.AnimalClinicPro.entity.CustomerPurchase;
import com.example.AnimalClinicPro.exception.PurchaseNotFoundException;
import com.example.AnimalClinicPro.repository.CustomerPurchaseRepository;
import com.example.AnimalClinicPro.service.ClinicProductService;
import com.example.AnimalClinicPro.service.CustomerPurchaseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CustomerPurchaseServiceTest {

    @Mock
    private CustomerPurchaseRepository customerPurchaseRepository;

    @Mock
    private ClinicProductService clinicProductService;

    @InjectMocks
    private CustomerPurchaseService customerPurchaseService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
/*
    @Test
    void testSave() {
        // Create mock data
        CreateCustomerPurchaseRequest request = new CreateCustomerPurchaseRequest(
                "2024-05-15",
                1L,
                2,
                100.0f,
                "2024-05-15",
                50.0f,
                "Cash"
        );
        ClinicProduct clinicProduct = new ClinicProduct();
        clinicProduct.setId(1L);

        // Mock behavior of ClinicProductService
        when(clinicProductService.findClinicProductById(1L)).thenReturn(clinicProduct);

        // Call the method to be tested
        customerPurchaseService.save(request);

        // Verify that save method of CustomerPurchaseRepository is called
        verify(customerPurchaseRepository, times(1)).save(any());
    }
*/
    @Test
    void testFindAll() {
        // Create mock customer purchases
        List<CustomerPurchase> customerPurchases = new ArrayList<>();
        customerPurchases.add(new CustomerPurchase());
        customerPurchases.add(new CustomerPurchase());

        // Mock behavior of CustomerPurchaseRepository
        when(customerPurchaseRepository.findAll()).thenReturn(customerPurchases);

        // Call the method to be tested
        List<CustomerPurchaseDto> result = customerPurchaseService.findAll();

        // Verify that the result matches the size of the mock customer purchases
        assertEquals(customerPurchases.size(), result.size());
    }

    @Test
    void testFindById() {
        // Create mock customer purchase
        CustomerPurchase customerPurchase = new CustomerPurchase();
        customerPurchase.setId(1L);

        // Mock behavior of CustomerPurchaseRepository
        when(customerPurchaseRepository.findById(1L)).thenReturn(Optional.of(customerPurchase));

        // Call the method to be tested
        CustomerPurchaseDto result = customerPurchaseService.findById(1L);

        // Verify that the result matches the mock customer purchase
        assertNotNull(result);
        assertEquals(customerPurchase.getId(), result.id());
    }

    @Test
    void testFindByIdNotFound() {
        // Mock behavior of CustomerPurchaseRepository to return empty optional
        when(customerPurchaseRepository.findById(1L)).thenReturn(Optional.empty());

        // Call the method to be tested and assert that it throws PurchaseNotFoundException
        assertThrows(PurchaseNotFoundException.class, () -> customerPurchaseService.findById(1L));
    }
}
