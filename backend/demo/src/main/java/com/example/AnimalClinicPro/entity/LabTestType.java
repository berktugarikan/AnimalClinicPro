package com.example.AnimalClinicPro.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Lab_Test_Types")
@Data
public class LabTestType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Test_Type_Name", unique = true, nullable = false)
    private String testTypeName;

    @ManyToOne
    @JoinColumn(name = "Animal_Type_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private AnimalType animalType;

    @Column(name = "Animal_Type_ID")
    private Long animalTypeId;

}