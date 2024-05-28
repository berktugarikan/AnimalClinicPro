package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.*;
import com.example.AnimalClinicPro.entity.Appointment;
import com.example.AnimalClinicPro.entity.User;
import com.example.AnimalClinicPro.entity.Vaccination;
import com.example.AnimalClinicPro.repository.VaccinationRepository;
import com.example.AnimalClinicPro.utils.SqlDateConverter;
import com.example.AnimalClinicPro.utils.SqlTimeConverter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public List<VaccinationDto> findVaccinationsByVeterinarianId(Long id) {
        return vaccinationRepository.findByVeterinarianId(id)
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    public List<VaccinationDto> findVaccinationsByVeterinarianClinic(Long id) {
        User userById = userService.getUserById(id);
        List<User> usersBySameClinic = userService.findUsersBySameClinic(userById.getClinic().getId());
        List<Vaccination> vaccinations = new ArrayList<>();
        for (User user : usersBySameClinic) {
            List<Vaccination> userVaccinations = vaccinationRepository.findByVeterinarianId(user.getId());
            for (Vaccination vaccination : userVaccinations) {
                if (!vaccinations.contains(vaccination)) {
                    vaccinations.add(vaccination);
                }
            }
        }
        return vaccinations
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    public VaccinationDto convert(Vaccination vaccination) {
        User veterinarian = userService.getUserById(vaccination.getVeterinarianId());
        return new VaccinationDto(
                vaccination.getId(),
                vaccination.getVaccinationDate().toString(),
                vaccination.getVaccinationTime().toString(),
                vaccination.getVaccinationStatus(),
                vaccination.getVaccinationDescription(),
                AnimalDto.convert(vaccination.getAnimal()),
                UserDto.convert(vaccination.getAnimal().getUser()),
                UserDto.convert(veterinarian));
    }
    public List<VaccinationDto> getVaccinationsByCustomerId(Long customerId) {
        return vaccinationRepository.findByCustomerId(customerId)
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }
    public List<VaccinationDto> findVaccinationsByVeterinarianAndVaccinationStatus(Long veterinarianId, Vaccination.VaccinationStatus vaccinationStatus) {
        return vaccinationRepository.findByVeterinarianIdAndVaccinationStatus(veterinarianId, vaccinationStatus)
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    private void setAttributeOfVaccinationStatus(UpdateVaccinationStatusRequest updateVaccinationStatusRequest, Vaccination vaccination) {
        vaccination.setVaccinationStatus(updateVaccinationStatusRequest.vaccinationStatus());

    }

    public VaccinationDto updateVaccinationStatus(Long id, UpdateVaccinationStatusRequest updateVaccinationStatusRequest) {
        Vaccination vaccination = findVaccinationById(id);
        setAttributeOfVaccinationStatus(updateVaccinationStatusRequest, vaccination);
        return convert(vaccinationRepository.save(vaccination));
    }
    public List<VaccinationDto> findVaccinationsByCustomerAndVaccinationStatus(Long customerId, Vaccination.VaccinationStatus vaccinationStatus) {
        return vaccinationRepository.findByCustomerIdAndVaccinationStatus(customerId, vaccinationStatus)
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }
}
