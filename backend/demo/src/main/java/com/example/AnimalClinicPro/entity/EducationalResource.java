package com.example.AnimalClinicPro.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Educational_Resources")
@Data
public class EducationalResource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Animal_Type_ID")
    private Long animalTypeId;

    @ManyToOne
    @JoinColumn(name = "Animal_Type_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private AnimalType animalType;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "Content", nullable = false, columnDefinition = "TEXT")
    private String content;

}