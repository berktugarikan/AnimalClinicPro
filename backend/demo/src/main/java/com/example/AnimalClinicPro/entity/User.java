package com.example.AnimalClinicPro.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

    @AllArgsConstructor
    @NoArgsConstructor
    @Entity
    @Table(name = "Users")
    @Data
    public class User {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "Name", nullable = false)
        private String firstname;

        @Column(name = "Surname", nullable = false)
        private String surname;

        @Column(name = "Username", unique = true, nullable = false)
        private String username;

        @Column(name = "Password", nullable = false)
        private String password;

        @Column(name = "Email", unique = true, nullable = false)
        private String email;

        @Column(name = "Phone_Number", unique = true, nullable = false)
        private String phoneNumber;

        @ManyToOne
        @JoinColumn(name = "Authorization_ID", referencedColumnName = "ID")
        private Permission permission;

}