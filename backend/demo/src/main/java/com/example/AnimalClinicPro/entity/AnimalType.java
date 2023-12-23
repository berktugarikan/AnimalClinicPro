package com.example.AnimalClinicPro.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Animal_Types")
@Data
public class AnimalType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Animal_Type", unique = true, nullable = false)
    private String animalType;

}