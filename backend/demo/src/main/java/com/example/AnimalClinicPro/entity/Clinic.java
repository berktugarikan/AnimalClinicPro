package com.example.AnimalClinicPro.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.util.Objects;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Clinic")
@Data
public class Clinic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Clinic_Name", nullable = false)
    private String clinicName;

    @Column(name = "City", nullable = false)
    private String city;

    @Column(name = "District", nullable = false)
    private String district;

    @Column(name = "Address", nullable = false)
    private String address;

    @Column(name = "Authorized_Name", nullable = false)
    private String authorizedName;

    @Column(name = "Authorized_Surname", nullable = false)
    private String authorizedSurname;

    @Column(name = "Email", unique = true, nullable = false)
    private String email;

    @Column(name = "Phone_Number")
    private String phoneNumber;

    @Column(name = "Password", nullable = false)
    private String password;

    @OneToMany(mappedBy = "clinic", cascade = CascadeType.ALL)
    private Set<User> users;
    @OneToMany(mappedBy = "clinic", cascade = CascadeType.ALL)
    private Set<ClinicProduct> clinicProducts;

    @Override
    public String toString() {
        return "Clinic{" +
                "id=" + id +
                ", clinicName='" + clinicName + '\'' +
                ", city='" + city + '\'' +
                ", district='" + district + '\'' +
                ", address='" + address + '\'' +
                ", authorizedName='" + authorizedName + '\'' +
                ", authorizedSurname='" + authorizedSurname + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Clinic clinic = (Clinic) o;
        return Objects.equals(id, clinic.id) && Objects.equals(clinicName, clinic.clinicName) && Objects.equals(city, clinic.city) && Objects.equals(district, clinic.district) && Objects.equals(address, clinic.address) && Objects.equals(authorizedName, clinic.authorizedName) && Objects.equals(authorizedSurname, clinic.authorizedSurname) && Objects.equals(email, clinic.email) && Objects.equals(phoneNumber, clinic.phoneNumber) && Objects.equals(password, clinic.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, clinicName, city, district, address, authorizedName, authorizedSurname, email, phoneNumber, password);
    }
}