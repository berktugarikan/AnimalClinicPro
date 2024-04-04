package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.AnimalDto;
import com.example.AnimalClinicPro.dto.CreateAnimalRequest;
import com.example.AnimalClinicPro.entity.Animal;
import com.example.AnimalClinicPro.entity.User;
import com.example.AnimalClinicPro.exception.AnimalNotFoundException;
import com.example.AnimalClinicPro.repository.AnimalRepository;
import com.example.AnimalClinicPro.utils.SqlDateConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnimalService {

    private final AnimalRepository animalRepository;
    private final UserService userService;

    @Autowired
    public AnimalService(AnimalRepository animalRepository, UserService userService) {
        this.animalRepository = animalRepository;
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

    public List<AnimalDto> getAnimalsByUserId(Long userId) {
        return animalRepository.findAnimalByUserId(userId)
                .stream()
                .map(AnimalDto::convert)
                .collect(Collectors.toList());
    }

    public AnimalDto createAnimal(CreateAnimalRequest request) {
        User user = userService.getUserById(request.userId());

        Animal animal = Animal
                .builder()
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
                .build();
        Animal savedAnimal = animalRepository.save(animal);

        return AnimalDto.convert(savedAnimal);
    }

    public void deleteAnimalById(Long id) {
        animalRepository.deleteById(id);
    }

    public AnimalDto updateAnimal(Long id, CreateAnimalRequest request) {
        Animal animalById = getAnimalById(id);
        User userById = userService.getUserById(request.userId());

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
                .user(userById)
                .build();
        Animal savedAnimal = animalRepository.save(animal);

        return AnimalDto.convert(savedAnimal);
    }
}
