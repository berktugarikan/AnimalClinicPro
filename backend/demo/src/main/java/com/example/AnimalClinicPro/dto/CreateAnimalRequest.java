package com.example.AnimalClinicPro.dto;


import com.example.AnimalClinicPro.entity.Animal;



public record CreateAnimalRequest(
        String name,
        Animal.Gender gender,
        String type,
        String birthDate, //yyyy-MM-dd
        int age,
        String chipNumber,
        String breed,
        String color,
        String ageCategory,
        String bloodType,
        float length,
        float weight,
        long userId,
        long clinicId
) {
}
