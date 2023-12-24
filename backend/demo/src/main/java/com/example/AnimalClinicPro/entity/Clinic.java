package com.example.AnimalClinicPro.entity;

import lombok.Data;
import jakarta.persistence.*;
@Entity
@Table(name = "Clinics")
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

}