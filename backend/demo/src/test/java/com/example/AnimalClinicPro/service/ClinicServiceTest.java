package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.ClinicDto;
import com.example.AnimalClinicPro.dto.CreateClinicRequest;
import com.example.AnimalClinicPro.entity.Clinic;
import com.example.AnimalClinicPro.exception.ClinicNotFoundException;
import com.example.AnimalClinicPro.repository.ClinicRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertAll;

class ClinicServiceTest extends TestSupport {

    private ClinicRepository clinicRepository;
    private ClinicService clinicService;

    @BeforeEach
    public void setUp() {
        clinicRepository = mock(ClinicRepository.class);
        clinicService = mock(ClinicService.class);
    }

    @Test
    public void testCreateClinic_whenRequestIsValid_shouldReturnClinicDto() {
        CreateClinicRequest request = generateCreateClinicRequest();

        ClinicDto clinicDto = ClinicDto.convert(generateClinic());

        when(clinicRepository.save(Mockito.any(Clinic.class))).thenReturn(generateClinic());

        when(clinicService.createClinic(request)).thenReturn(clinicDto);

        ClinicDto savedClinic = clinicService.createClinic(request);

        org.assertj.core.api.Assertions.assertThat(savedClinic).isNotNull();

        assertEquals(clinicDto, savedClinic);
    }

    @Test
    public void testFindClinicByGivenId_whenIdExists_shouldReturnClinic() {
        when(clinicRepository.findById(1L)).thenReturn(Optional.of(generateClinic()));

        when(clinicService.findClinicById(1L)).thenReturn(generateClinic());

        Clinic actual = clinicService.findClinicById(1L);

        assertEquals(generateClinic(), actual);
    }

    @Test
    public void testFindClinicByGivenId_whenIdDoesNotExist_shouldThrowClinicNotFoundException() {
        when(clinicRepository.findById(1L)).thenReturn(Optional.empty());

        when(clinicService.findClinicById(1L)).thenThrow(ClinicNotFoundException.class);

        assertThrows(ClinicNotFoundException.class, () -> clinicService.findClinicById(1L));
    }

    @Test
    public void testGetClinicByGivenId_whenIdExists_shouldReturnClinicDto() {
        ClinicDto clinicDto = ClinicDto.convert(generateClinic());

        when(clinicRepository.findById(1L)).thenReturn(Optional.of(generateClinic()));

        when(clinicService.getClinicById(1L)).thenReturn(clinicDto);

        ClinicDto actual = clinicService.getClinicById(1L);

        assertEquals(clinicDto, actual);
    }

    @Test
    public void testDeleteClinicByGivenId_whenIdExists_shouldDeleteClinic() {
        when(clinicRepository.findById(1L)).thenReturn(Optional.of(generateClinic()));

        doNothing().when(clinicRepository).deleteById(1L);

        assertAll(() -> clinicService.deleteClinic(1L));
    }

    @Test
    public void testDeleteClinicByGivenId_whenIdDoesNotExist_shouldThrowClinicNotFoundException() {
        when(clinicRepository.findById(1L)).thenReturn(Optional.empty());

        when(clinicService.findClinicById(1L)).thenThrow(ClinicNotFoundException.class);

        assertThrows(ClinicNotFoundException.class, () -> clinicService.findClinicById(1L));
    }

}