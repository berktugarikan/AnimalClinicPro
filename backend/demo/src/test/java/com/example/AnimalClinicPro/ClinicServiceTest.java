package com.example.AnimalClinicPro;

import com.example.AnimalClinicPro.config.PasswordConfig;
import com.example.AnimalClinicPro.dto.ClinicDto;
import com.example.AnimalClinicPro.dto.CreateClinicRequest;
import com.example.AnimalClinicPro.entity.Clinic;
import com.example.AnimalClinicPro.exception.ClinicNotFoundException;
import com.example.AnimalClinicPro.repository.ClinicRepository;
import com.example.AnimalClinicPro.service.ClinicService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ClinicServiceTest {

    @Mock
    private ClinicRepository clinicRepository;

    @Autowired
    private PasswordConfig passwordConfig;

    @InjectMocks
    private ClinicService clinicService;

    @Test
    public void testGetAllClinics() {
        // Mock data
        Clinic clinic = new Clinic();
        when(clinicRepository.findAll()).thenReturn(Collections.singletonList(clinic));

        // Call the method to be tested
        List<ClinicDto> result = clinicService.getAllClinics();

        // Verify
        assertEquals(1, result.size());
        // Add more assertions if needed
    }

    @Test
    public void testGetClinicById() {
        // Mock data
        Long clinicId = (Long) 1L;
        Clinic clinic = new Clinic();
        when(clinicRepository.findById(clinicId)).thenReturn(Optional.of(clinic));

        // Call the method to be tested
        ClinicDto result = clinicService.getClinicById(clinicId);

        // Verify
        assertEquals(clinic.getId(), result.id());
        // Add more assertions if needed
    }

/*
    @Test
    public void testCreateClinic() {
        // Mock data
        CreateClinicRequest request = new CreateClinicRequest("Clinic Name", "Address", "City", "District", "Authorized Name", "Authorized Surname", "test@example.com", "123456789", "password");

        // Call the method to be tested
        clinicService.createClinic(request);

        // Verify that clinicRepository.save is called once
        verify(clinicRepository, times(1)).save(any());
        // Add more assertions if needed
    }
*/
    @Test
    public void testDeleteClinic() {
        // Mock data
        Long clinicId = (Long) 1L;

        // Call the method to be tested
        clinicService.deleteClinic(clinicId);

        // Verify that clinicRepository.deleteById is called once with the correct argument
        verify(clinicRepository, times(1)).deleteById(clinicId);
        // Add more assertions if needed
    }

    @Test
    public void testFindClinicById_Success() {
        // Mock data
        Long clinicId = (Long) 1L;
        Clinic clinic = new Clinic();
        when(clinicRepository.findById(clinicId)).thenReturn(Optional.of(clinic));

        // Call the method to be tested
        Clinic result = clinicService.findClinicById(clinicId);

        // Verify
        assertEquals(clinic, result);
        // Add more assertions if needed
    }

    @Test
    public void testFindClinicById_NotFound() {
        // Mock data
        Long clinicId = (Long) 1L;
        when(clinicRepository.findById(clinicId)).thenReturn(Optional.empty());

        // Call the method to be tested and verify that it throws the expected exception
        assertThrows(ClinicNotFoundException.class, () -> clinicService.findClinicById(clinicId));
        // Add more assertions if needed
    }

    // Add tests for other methods similarly

}
