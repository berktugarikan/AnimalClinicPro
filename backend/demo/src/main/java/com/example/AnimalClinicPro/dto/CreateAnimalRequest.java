package com.example.AnimalClinicPro.dto;


import com.example.AnimalClinicPro.entity.Animal;

import java.sql.Date;

public record CreateAnimalRequest(
        String name,
        Animal.Gender gender,
        String type,
        String birthDate, //yyyy-MM-dd
        Integer age,
        String chipNumber,
        String breed,
        String color,
        String ageCategory,
        String bloodType,
        Float length,
        Float weight,
        Long userId
) {
}
