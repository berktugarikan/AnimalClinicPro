package com.example.AnimalClinicPro.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Customer_Users")
@Data
public class CustomerUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "User_ID", unique = true, nullable = false)
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "User_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private User user;

    @Column(name = "Clinic_ID")
    private Long clinicId;

    @ManyToOne
    @JoinColumn(name = "Clinic_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private Clinic clinic;

}