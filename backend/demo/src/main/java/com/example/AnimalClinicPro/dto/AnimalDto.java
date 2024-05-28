package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.Animal;


import java.util.Date;

public record AnimalDto(
    Long id,
    String name,
    String gender,
    String type,
    Date birthDate,
    Integer age,
    String chipNumber,
    String breed,
    String color,
    String ageCategory,
    String bloodType,
    Float length,
    Float weight

) {

    public static AnimalDto convert(Animal from) {
        if (from == null) {
            return null;
        }

        String gender = from.getGender() != null ? from.getGender().name() : "Unknown";
        UserDto customer=null;
        if (from.getUser()!=null){
            customer = UserDto.convert(from.getUser());
        }
        return new AnimalDto(
                from.getId(),
                from.getName(),
                gender,
                from.getType(),
                from.getBirthDate(),
                from.getAge(),
                from.getChipNumber(),
                from.getBreed(),
                from.getColor(),
                from.getAgeCategory(),
                from.getBloodType(),
                from.getLength(),
                from.getWeight()

        );
    }

}

