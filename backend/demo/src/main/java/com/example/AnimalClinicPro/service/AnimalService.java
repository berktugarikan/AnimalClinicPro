package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.AnimalClinicDto;
import com.example.AnimalClinicPro.dto.AnimalCustomerDto;
import com.example.AnimalClinicPro.dto.AnimalDto;
import com.example.AnimalClinicPro.dto.CreateAnimalRequest;
import com.example.AnimalClinicPro.entity.*;
import com.example.AnimalClinicPro.exception.AnimalNotFoundException;
import com.example.AnimalClinicPro.repository.AnimalRepository;
import com.example.AnimalClinicPro.repository.ClinicRepository;
import com.example.AnimalClinicPro.utils.SqlDateConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnimalService {

    private final AnimalRepository animalRepository;
    private final ClinicService clinicService;
    private final UserService userService;

    @Autowired
    public AnimalService(AnimalRepository animalRepository, ClinicService clinicService, UserService userService) {
        this.animalRepository = animalRepository;
        this.clinicService = clinicService;

        this.userService = userService;
    }

    public AnimalDto findAnimalById(Long id){
        return animalRepository.findById(id)
                .map(AnimalDto::convert)
                .orElseThrow(() -> new AnimalNotFoundException("Animal not found with id: " + id));
    }

    public Animal getAnimalById(Long id){
        return animalRepository.findById(id)
                .orElseThrow(() -> new AnimalNotFoundException("Animal not found with id: " + id));
    }

    public List<AnimalDto> getAllAnimals() {
        return animalRepository.findAll()
                .stream()
                .map(AnimalDto::convert)
                .collect(Collectors.toList());
    }


    public AnimalDto getAnimalByChipNumber(String chipNumber) {
        return AnimalDto.convert(animalRepository.findAnimalByChipNumber(chipNumber));
    }
    /*
    public List<AnimalDto> findAnimalsByClinic(Long veterinarianId) {
        List<User> users = userService.findUsersBySameClinic(veterinarianId);
        List<Animal> animals = animalRepository.findAll();

        List<Animal> filteredAnimals = new ArrayList<>();

        for (Animal animal : animals) {
            for (Vaccination vaccination: animal.getVaccinations()) {
                for (User user: users) {
                    if (vaccination.getVeterinarianId().equals(user.getId())) {
                        filteredAnimals.add(animal);
                    }
                }
            }
            for (LabTest labTest: animal.getLabTests()) {
                for (User user: users) {
                    if (labTest.getVeterinarianId().equals(user.getId())) {
                        if (!filteredAnimals.contains(animal)) {
                            filteredAnimals.add(animal);
                        }
                    }
                }
            }
        }

        return filteredAnimals
                .stream()
                .map(AnimalDto::convert)
                .collect(Collectors.toList());
    }*/
    public List<AnimalDto> getAnimalsByUserId(Long userId) {
        return animalRepository.findAnimalByUserId(userId)
                .stream()
                .map(AnimalDto::convert)
                .collect(Collectors.toList());
    }
    public List<AnimalCustomerDto> getAnimalsByUserIdAsCustomerDto(Long userId) {
        return animalRepository.findAnimalByUserId(userId)
                .stream()
                .map(AnimalCustomerDto::convert)
                .collect(Collectors.toList());
    }

    public AnimalDto createAnimal(CreateAnimalRequest request) {
        User user = userService.getUserById(request.userId());


        // Klinik ID'yi doğrudan kullanarak Clinic nesnesi oluşturun
        Clinic clinic = Clinic.builder()
                .id(request.clinicId())
                .build();

        Animal animal = Animal.builder()
                .age(request.age())
                .ageCategory(request.ageCategory())
                .birthDate(SqlDateConverter.convert(request.birthDate()))
                .bloodType(request.bloodType())
                .breed(request.breed())
                .chipNumber(request.chipNumber())
                .color(request.color())
                .gender(request.gender())
                .length(request.length())
                .name(request.name())
                .type(request.type())
                .weight(request.weight())
                .user(user)
                .clinic(clinic)
                .build();

        Animal savedAnimal = animalRepository.save(animal);
        return AnimalDto.convert(savedAnimal);
    }

    public void deleteAnimalById(Long id) {
        animalRepository.deleteById(id);
    }

    public AnimalDto updateAnimal(Long id, CreateAnimalRequest request) {
        Animal animalById = getAnimalById(id);

        Animal animal = Animal
                .builder()
                .id(animalById.getId())
                .age(request.age())
                .ageCategory(request.ageCategory())
                .birthDate(SqlDateConverter.convert(request.birthDate()))
                .bloodType(request.bloodType())
                .breed(request.breed())
                .chipNumber(request.chipNumber())
                .color(request.color())
                .gender(request.gender())
                .length(request.length())
                .name(request.name())
                .type(request.type())
                .weight(request.weight())
                .user(animalById.getUser())
                .clinic(animalById.getClinic())
                .build();
        Animal savedAnimal = animalRepository.save(animal);

        return AnimalDto.convert(savedAnimal);
    }

    public List<AnimalClinicDto> findAnimalsByClinic(Long clinicId) {


        // Klinik ID'ye göre hayvanları getir
        List<Animal> animals = animalRepository.findByClinicId(clinicId);

        // Animal -> AnimalDto dönüşümü yap
        return animals
                .stream()
                .map(AnimalClinicDto::convert)
                .collect(Collectors.toList());

    }

}
