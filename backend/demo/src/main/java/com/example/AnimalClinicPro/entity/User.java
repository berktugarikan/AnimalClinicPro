package com.example.AnimalClinicPro.entity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@AllArgsConstructor
    @NoArgsConstructor
    @Entity
    @Table(name = "Users")
    @Data
@Getter
@Setter
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

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "Authorization_ID", referencedColumnName = "ID")
        @OnDelete(action = OnDeleteAction.SET_NULL)
        private Permission authorization;




}