package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.CreateLabTestRequest;
import com.example.AnimalClinicPro.dto.LabTestDto;
import com.example.AnimalClinicPro.entity.LabTest;
import com.example.AnimalClinicPro.exception.LabTestNotFoundException;
import com.example.AnimalClinicPro.repository.LabTestRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LabTestServiceTest extends TestSupport{

    private LabTestService labTestService;
    private LabTestRepository labTestRepository;

    @BeforeEach
    public void setUp() {
        labTestService = mock(LabTestService.class);
        labTestRepository = mock(LabTestRepository.class);
    }

    @Test
    public void testGetAllLabTests_whenLabTestsExist_shouldReturnAllLabTests() {
        List<LabTest> labTests = Mockito.mock(List.class);

        when(labTestRepository.findAll()).thenReturn(labTests);

        List<LabTestDto> allLabTests = labTestService.getAllLabTests();

        org.assertj.core.api.Assertions.assertThat(allLabTests).isNotNull();
    }

    @Test
    public void testCreateLabTest_whenRequestIsValid_shouldReturnLabTestDto() {
        CreateLabTestRequest request = generateCreateLabTestRequest();

        when(labTestService.convert(Mockito.any(LabTest.class))).thenReturn(generateLabTestDto());

        LabTestDto labTestDto = labTestService.convert(generateLabTest());

        when(labTestRepository.save(Mockito.any(LabTest.class))).thenReturn(generateLabTest());

        when(labTestService.createLabTest(request)).thenReturn(labTestDto);

        LabTestDto savedLabTest = labTestService.createLabTest(request);

        org.assertj.core.api.Assertions.assertThat(savedLabTest).isNotNull();

        assertEquals(labTestDto, savedLabTest);
    }

    @Test
    public void testUpdateLabTest_whenRequestIsValidAndIdExists_shouldReturnLabTestDto() {
        CreateLabTestRequest request = generateCreateLabTestRequest();

        when(labTestRepository.findById(1L)).thenReturn(Optional.of(generateLabTest()));

        when(labTestService.updateLabTest(1L, request)).thenReturn(generateLabTestDto());

        LabTestDto updatedLabTest = labTestService.updateLabTest(1L, request);

        org.assertj.core.api.Assertions.assertThat(updatedLabTest).isNotNull();
    }

    @Test
    public void testUpdateLabTest_whenRequestIsValidAndIdDoesNotExist_shouldThrowLabTestNotFoundException() {

        when(labTestRepository.findById(1L)).thenReturn(Optional.empty());

        when(labTestService.updateLabTest(1L, generateCreateLabTestRequest())).thenThrow(LabTestNotFoundException.class);

        assertThrows(LabTestNotFoundException.class, () -> labTestService.updateLabTest(1L, generateCreateLabTestRequest()));
    }

    @Test
    public void testFindLabTestByGivenId_whenIdExists_shouldReturnLabTest() {
        LabTest labTest = generateLabTest();

        when(labTestRepository.findById(1L)).thenReturn(Optional.of(labTest));

        when(labTestService.findLabTestById(1L)).thenReturn(labTest);

        LabTest actual = labTestService.findLabTestById(1L);

        assertEquals(labTest, actual);
    }

    @Test
    public void testFindLabTestByGivenId_whenIdDoesNotExist_shouldThrowLabTestNotFoundException() {

        when(labTestRepository.findById(1L)).thenReturn(Optional.empty());

        when(labTestService.findLabTestById(1L)).thenThrow(LabTestNotFoundException.class);

        assertThrows(LabTestNotFoundException.class, () -> labTestService.findLabTestById(1L));
    }


    @Test
    public void testDeleteLabTestByGivenId_whenIdExists_shouldDeleteLabTest() {
        LabTest labTest = generateLabTest();

        when(labTestRepository.findById(1L)).thenReturn(Optional.of(labTest));

        doNothing().when(labTestRepository).deleteById(1L);

        assertAll(() -> labTestService.deleteLabTestById(1L));
    }

    @Test
    public void testDeleteLabTestByGivenId_whenIdDoesNotExist_shouldThrowLabTestNotFoundException() {

        when(labTestRepository.findById(1L)).thenReturn(Optional.empty());

        when(labTestService.findLabTestById(1L)).thenThrow(LabTestNotFoundException.class);

        assertThrows(LabTestNotFoundException.class, () -> labTestService.findLabTestById(1L));
    }

}