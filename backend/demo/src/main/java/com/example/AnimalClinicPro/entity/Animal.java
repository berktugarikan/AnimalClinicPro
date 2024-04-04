package com.example.AnimalClinicPro.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.Objects;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Animal")
@Data
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "Gender", nullable = false)
    private Gender gender;

    @Column(name = "Type")
    private String type;

    @Column(name = "Birth_Date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @Column(name = "Age")
    private Integer age;

    @Column(name = "Weight")
    private Float weight;

    @Column(name = "Chip_Number", unique = true, nullable = false)
    private String chipNumber;

    @Column(name = "Breed")
    private String breed;

    @Column(name = "Color")
    private String color;

    @Column(name = "Age_Category")
    private String ageCategory;

    @Column(name = "Blood_Type")
    private String bloodType;
    @Column(name = "Length")
    private Float length;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_ID", referencedColumnName = "ID")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL)
    private Set<Vaccination> vaccinations;

    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL)
    private Set<LabTest> labTests;

    @Override
    public String toString() {
        return "Animal{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", gender=" + gender +
                ", type='" + type + '\'' +
                ", birthDate=" + birthDate +
                ", age=" + age +
                ", weight=" + weight +
                ", chipNumber='" + chipNumber + '\'' +
                ", breed='" + breed + '\'' +
                ", color='" + color + '\'' +
                ", ageCategory='" + ageCategory + '\'' +
                ", bloodType='" + bloodType + '\'' +
                ", length=" + length +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Animal animal = (Animal) o;
        return Objects.equals(id, animal.id) && Objects.equals(name, animal.name) && gender == animal.gender && Objects.equals(type, animal.type) && Objects.equals(birthDate, animal.birthDate) && Objects.equals(age, animal.age) && Objects.equals(weight, animal.weight) && Objects.equals(chipNumber, animal.chipNumber) && Objects.equals(breed, animal.breed) && Objects.equals(color, animal.color) && Objects.equals(ageCategory, animal.ageCategory) && Objects.equals(bloodType, animal.bloodType) && Objects.equals(length, animal.length);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, gender, type, birthDate, age, weight, chipNumber, breed, color, ageCategory, bloodType, length);
    }

    public enum Gender {
        Male, Female, Other
    }

    public Long UserId(){
        if (user!=null){
            return user.getId();
        }
        return null;
    }


}