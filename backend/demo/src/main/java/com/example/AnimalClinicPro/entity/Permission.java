package com.example.AnimalClinicPro.entity;

import jakarta.persistence.*;
import lombok.Data;


    @Entity
    @Table(name = "Permissions")
    @Data
    public class Permission {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "Permission_Name", unique = true, nullable = false)
        private String permissionName;

    }

