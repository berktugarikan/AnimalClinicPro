package com.example.AnimalClinicPro.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Vaccination_Types")
@Data
public class VaccinationType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Type_Name", unique = true, nullable = false)
    private String typeName;

    @Column(name = "Frequency", nullable = false)
    private int frequency;

    @ManyToOne
    @JoinColumn(name = "Animal_Type_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private AnimalType animalType;

    @Column(name = "Animal_Type_ID")
    private Long animalTypeId;

}