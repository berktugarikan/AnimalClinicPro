package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.AnimalDto;
import com.example.AnimalClinicPro.dto.CreateVaccinationRequest;
import com.example.AnimalClinicPro.dto.UserDto;
import com.example.AnimalClinicPro.dto.VaccinationDto;
import com.example.AnimalClinicPro.entity.User;
import com.example.AnimalClinicPro.entity.Vaccination;
import com.example.AnimalClinicPro.repository.VaccinationRepository;
import com.example.AnimalClinicPro.utils.SqlDateConverter;
import com.example.AnimalClinicPro.utils.SqlTimeConverter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VaccinationService {

    private final VaccinationRepository vaccinationRepository;
    private final AnimalService animalService;
    private final UserService userService;

    public VaccinationService(VaccinationRepository vaccinationRepository, AnimalService animalService, UserService userService) {
        this.vaccinationRepository = vaccinationRepository;
        this.animalService = animalService;
        this.userService = userService;
    }

    public List<VaccinationDto> getAllVaccinations() {
        return vaccinationRepository
                .findAll()
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    public List<VaccinationDto> findVaccinationsByAnimalId(Long animalId) {
        return vaccinationRepository.findByAnimal_Id(animalId)
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    public VaccinationDto createVaccination(CreateVaccinationRequest request) {
        Vaccination vaccination = new Vaccination();

        return setAttributeOfVaccination(request, vaccination);
    }

    public VaccinationDto updateVaccination(Long id, CreateVaccinationRequest request) {
        Vaccination vaccination = findVaccinationById(id);

        return setAttributeOfVaccination(request, vaccination);
    }

    private VaccinationDto setAttributeOfVaccination(CreateVaccinationRequest request, Vaccination vaccination) {
        vaccination.setVaccinationDate(SqlDateConverter.convert(request.vaccinationDate()));
        vaccination.setVaccinationTime(SqlTimeConverter.convert(request.vaccinationTime()));
        vaccination.setVaccinationStatus(request.vaccinationStatus());
        vaccination.setVaccinationDescription(request.vaccinationDescription());
        vaccination.setAnimal(animalService.getAnimalById(request.animalId()));
        vaccination.setVeterinarianId(request.veterinarianId());

        Vaccination savedVaccination = vaccinationRepository.save(vaccination);

        return convert(savedVaccination);
    }

    protected Vaccination findVaccinationById(Long id) {
        return vaccinationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vaccination not found by id : " + id));
    }

    public VaccinationDto getVaccinationById(Long id) {
        return convert(findVaccinationById(id));
    }

    public void deleteVaccinationById(Long id) {
        findVaccinationById(id);
        vaccinationRepository.deleteById(id);
    }

    public List<VaccinationDto> findVaccinationsByVeterinarianId(Long id) {;
        return vaccinationRepository.findByVeterinarianId(id)
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    private VaccinationDto convert(Vaccination vaccination) {
        User veterinarian = userService.getUserById(vaccination.getVeterinarianId());
        return new VaccinationDto(
                vaccination.getId(),
                vaccination.getVaccinationDate().toString(),
                vaccination.getVaccinationTime(),
                vaccination.getVaccinationStatus().toString(),
                vaccination.getVaccinationDescription(),
                AnimalDto.convert(vaccination.getAnimal()),
                UserDto.convert(vaccination.getAnimal().getUser()),
                UserDto.convert(veterinarian));
    }
}
