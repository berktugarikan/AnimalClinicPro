package com.example.AnimalClinicPro.entity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Objects;
import java.util.Set;

@AllArgsConstructor
    @NoArgsConstructor
    @Entity
    @Table(name = "User")
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

        @Column(name = "Role", nullable = false)
        @Enumerated(EnumType.STRING)
        private Role role;

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "Clinic_ID", referencedColumnName = "ID")
        @OnDelete(action = OnDeleteAction.SET_NULL)
        private Clinic clinic;

        @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
        private Set<Animal> animals;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstname='" + firstname + '\'' +
                ", surname='" + surname + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", role=" + role +
                ", clinic=" + clinic +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(firstname, user.firstname) && Objects.equals(surname, user.surname) && Objects.equals(username, user.username) && Objects.equals(password, user.password) && Objects.equals(email, user.email) && Objects.equals(phoneNumber, user.phoneNumber) && role == user.role;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstname, surname, username, password, email, phoneNumber, role);
    }


}