package com.example.AnimalClinicPro.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Date;
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Animals")
@Data
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Name", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "Type_ID", referencedColumnName = "ID")
    private AnimalType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "Gender", nullable = false)
    private Gender gender;

    @Column(name = "Birth_Date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @Column(name = "Age")
    private Integer age;

    @Column(name = "Weight", precision = 5, scale = 2)
    private BigDecimal weight;

    @Column(name = "Chip_Number", unique = true, nullable = false)
    private String chipNumber;

    @ManyToOne
    @JoinColumn(name = "Breed_ID", referencedColumnName = "ID")
    private Breed breed;

    @Column(name = "Color")
    private String color;

    @Column(name = "Age_Category")
    private String ageCategory;

    @Enumerated(EnumType.STRING)
    @Column(name = "Blood_Type", nullable = false)
    private BloodType bloodType;

    @Column(name = "Length", precision = 5, scale = 2)
    private BigDecimal length;

    @ManyToOne
    @JoinColumn(name = "Owner_ID", referencedColumnName = "ID")
    private CustomerUser owner;

    public enum Gender {
        Male, Female, Other
    }

    public enum BloodType {
        A_POSITIVE, A_NEGATIVE, B_POSITIVE, B_NEGATIVE,
        AB_POSITIVE, AB_NEGATIVE, O_POSITIVE, O_NEGATIVE, Other
    }
}