package com.example.AnimalClinicPro.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@AllArgsConstructor
    @NoArgsConstructor
    @Entity
    @Table(name = "Veterinarian_Users")
    @Data
    public class VeterinarianUser {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "User_ID", unique = true, nullable = false)
        @OnDelete(action = OnDeleteAction.CASCADE)
        private User user;

        @ManyToOne
        @JoinColumn(name = "Clinic_ID")
        @OnDelete(action = OnDeleteAction.SET_NULL)
        private Clinic clinic;

}