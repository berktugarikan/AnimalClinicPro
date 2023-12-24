package com.example.AnimalClinicPro.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Breeds")
@Data
public class Breed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Breed_Name", unique = true, nullable = false)
    private String breedName;

    @ManyToOne
    @JoinColumn(name = "Animal_Type_ID", referencedColumnName = "ID")
    private AnimalType animalType;

}