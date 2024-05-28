package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.CreateVaccinationRequest;
import com.example.AnimalClinicPro.dto.VaccinationDto;
import com.example.AnimalClinicPro.entity.Vaccination;
import com.example.AnimalClinicPro.exception.UserNotFoundException;
import com.example.AnimalClinicPro.exception.VaccinationNotFoundException;
import com.example.AnimalClinicPro.repository.VaccinationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class VaccinationServiceTest extends TestSupport {

    private VaccinationService vaccinationService;
    private VaccinationRepository vaccinationRepository;

    @BeforeEach
    public void setUp() {
        vaccinationRepository = mock(VaccinationRepository.class);
        vaccinationService = mock(VaccinationService.class);
    }

    @Test
    public void testGetAllVaccinations_whenVaccinationsExist_shouldReturnVaccinationDtoList() {
        List<Vaccination> vaccinationList = new ArrayList<>();
        Vaccination vaccination = generateVaccination();
        vaccinationList.add(vaccination);

        List<VaccinationDto> vaccinationDtoList = new ArrayList<>();
        vaccinationDtoList.add(vaccinationService.convert(vaccination));

        when(vaccinationRepository.findAll()).thenReturn(vaccinationList);
        when(vaccinationService.getAllVaccinations()).thenReturn(vaccinationDtoList);

        List<VaccinationDto> actual = vaccinationService.getAllVaccinations();

        assertEquals(vaccinationDtoList.size(), actual.size());
    }

    @Test
    public void testFindVaccinationById_whenIdExists_shouldReturnVaccination() {
        Vaccination vaccination = generateVaccination();

        when(vaccinationRepository.findById(1L)).thenReturn(Optional.of(vaccination));

        when(vaccinationService.findVaccinationById(1L)).thenReturn(vaccination);

        Vaccination actual = vaccinationService.findVaccinationById(1L);

        assertEquals(vaccination, actual);
    }

    @Test
    public void testFindVaccinationById_whenIdDoesNotExist_shouldThrowVaccinationNotFoundException() {

        when(vaccinationRepository.findById(1L)).thenReturn(Optional.empty());

        when(vaccinationService.findVaccinationById(1L)).thenThrow(VaccinationNotFoundException.class);

        assertThrows(VaccinationNotFoundException.class, () -> vaccinationService.findVaccinationById(1L));
    }

    @Test
    public void testGetVaccinationByGivenId_whenIdExists_shouldReturnVaccinationDto() {
        Vaccination vaccination = generateVaccination();

        when(vaccinationRepository.findById(1L)).thenReturn(Optional.of(vaccination));

        VaccinationDto vaccinationDto = vaccinationService.convert(vaccination);

        when(vaccinationService.getVaccinationById(1L)).thenReturn(vaccinationDto);

        VaccinationDto actual = vaccinationService.getVaccinationById(1L);

        assertEquals(vaccinationService.convert(vaccination), actual);
    }

    @Test
    public void testGetVaccinationByGivenId_whenIdDoesNotExist_shouldThrowVaccinationNotFoundException() {

        when(vaccinationRepository.findById(1L)).thenReturn(Optional.empty());

        when(vaccinationService.getVaccinationById(1L)).thenThrow(VaccinationNotFoundException.class);

        assertThrows(VaccinationNotFoundException.class, () -> vaccinationService.getVaccinationById(1L));
    }

    @Test
    public void testCreateVaccination_whenRequestIsValid_shouldReturnVaccinationDto() {
        CreateVaccinationRequest request = generateCreateVaccinationRequest();

        when(vaccinationService.convert(Mockito.any(Vaccination.class))).thenReturn(generateVaccinationDto());

        VaccinationDto vaccinationDto = vaccinationService.convert(generateVaccination());

        when(vaccinationRepository.save(Mockito.any(Vaccination.class))).thenReturn(generateVaccination());

        when(vaccinationService.createVaccination(request)).thenReturn(vaccinationDto);

        VaccinationDto savedVaccination = vaccinationService.createVaccination(request);

        org.assertj.core.api.Assertions.assertThat(savedVaccination).isNotNull();

        assertEquals(vaccinationDto, savedVaccination);
    }

    @Test
    public void testUpdateVaccination_whenRequestIsValidAndIdExists_shouldReturnVaccinationDto() {
        CreateVaccinationRequest request = generateCreateVaccinationRequest();

        when(vaccinationRepository.findById(1L)).thenReturn(Optional.of(generateVaccination()));

        when(vaccinationService.updateVaccination(1L, request)).thenReturn(generateVaccinationDto());

        VaccinationDto updatedVaccination = vaccinationService.updateVaccination(1L, request);

        org.assertj.core.api.Assertions.assertThat(updatedVaccination).isNotNull();
    }

    @Test
    public void testUpdateVaccination_whenRequestIsValidAndIdDoesNotExist_shouldThrowVaccinationNotFoundException() {

        when(vaccinationRepository.findById(1L)).thenReturn(Optional.empty());

        when(vaccinationService.updateVaccination(1L, generateCreateVaccinationRequest())).thenThrow(VaccinationNotFoundException.class);

        assertThrows(VaccinationNotFoundException.class, () -> vaccinationService.updateVaccination(1L, generateCreateVaccinationRequest()));
    }

}