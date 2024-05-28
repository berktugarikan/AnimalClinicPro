package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.*;
import com.example.AnimalClinicPro.entity.LabTest;
import com.example.AnimalClinicPro.entity.User;
import com.example.AnimalClinicPro.repository.LabTestRepository;
import com.example.AnimalClinicPro.utils.SqlDateConverter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LabTestService {

    private final LabTestRepository labTestRepository;
    private final AnimalService animalService;
    private final UserService userService;

    public LabTestService(LabTestRepository labTestRepository, AnimalService animalService, UserService userService) {
        this.labTestRepository = labTestRepository;
        this.animalService = animalService;
        this.userService = userService;
    }

    public List<LabTestDto> getAllLabTests() {
        return labTestRepository
                .findAll()
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    public List<LabTestDto> findLabTestsByAnimalId(Long animalId) {
        return labTestRepository.findByAnimal_Id(animalId)
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    public LabTestDto createLabTest(CreateLabTestRequest request) {
        LabTest labTest = new LabTest();

        labTest.setTestDate(SqlDateConverter.convert(request.testDate()));
        labTest.setTestStatus(request.testStatus());
        labTest.setTestDescription(request.testDescription());
        labTest.setAnimal(animalService.getAnimalById(request.animalId()));
        labTest.setVeterinarianId(request.veterinarianId());

        return convert(labTestRepository.save(labTest));
    }

    public LabTestDto updateLabTest(Long id, CreateLabTestRequest request) {
        LabTest labTest = findLabTestById(id);

        labTest.setTestDate(SqlDateConverter.convert(request.testDate()));
        labTest.setTestStatus(request.testStatus());
        labTest.setTestDescription(request.testDescription());
        labTest.setAnimal(animalService.getAnimalById(request.animalId()));

        return convert(labTestRepository.save(labTest));
    }

    protected LabTest findLabTestById(Long id) {
        return labTestRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Lab test not found by id : " + id));
    }

    public void deleteLabTestById(Long id) {
        findLabTestById(id);
        labTestRepository.deleteById(id);
    }

    public LabTestDto getLabTestById(Long id) {
        return convert(findLabTestById(id));
    }

    public LabTestDto convert(LabTest labTest) {
        User veterinarian = userService.getUserById(labTest.getVeterinarianId());
        return new LabTestDto(
                labTest.getId(),
                labTest.getTestDate().toString(),
                labTest.getTestStatus().toString(),
                labTest.getTestDescription(),
                AnimalDto.convert(labTest.getAnimal()),
                UserDto.convert(labTest.getAnimal().getUser()),
                UserDto.convert(veterinarian));
    }

    public List<LabTestDto> geLabTetsByCustomerId(Long customerId) {
        return labTestRepository.findByCustomerId(customerId)
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    public List<LabTestDto> findLabTestsByVeterinarianClinic(Long veterinarianId) {
        User userById = userService.getUserById(veterinarianId);
        List<User> usersBySameClinic = userService.findUsersBySameClinic(userById.getClinic().getId());
        List<LabTest> labTests = new ArrayList<>();
        for (User user : usersBySameClinic) {
            List<LabTest> userLabTests = labTestRepository.findByVeterinarianId(user.getId());
            for (LabTest labTest : userLabTests) {
                if (!labTests.contains(labTest)) {
                    labTests.add(labTest);
                }
            }
        }
        return labTests.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

}
