package com.example.AnimalClinicPro.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;
import java.sql.Date;

@Entity
@Table(name = "Appointments")
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Customer_ID")
    private Long customerId;

    @ManyToOne
    @JoinColumn(name = "Customer_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private CustomerUser customer;

    @Column(name = "Veterinarian_ID")
    private Long veterinarianId;

    @ManyToOne
    @JoinColumn(name = "Veterinarian_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private VeterinarianUser veterinarian;

    @Column(name = "Animal_ID")
    private Long animalId;

    @ManyToOne
    @JoinColumn(name = "Animal_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private Animal animal;

    @Column(name = "Appointment_Date", nullable = false)
    private Date appointmentDate;

    @Column(name = "Appointment_Time", nullable = false)
    private Time appointmentTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "Appointment_Type", nullable = false)
    private AppointmentType appointmentType;

    @Column(name = "Appointment_Description", columnDefinition = "TEXT")
    private String appointmentDescription;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status", nullable = false, columnDefinition = "VARCHAR(20) DEFAULT 'PENDING'")
    private AppointmentStatus status;

    public enum AppointmentType {
        CHECKUP,
        VACCINATION,
        SURGERY,
        CONSULTATION,
        EMERGENCY
    }
    public enum AppointmentStatus {
        PENDING,
        COMPLETED,
        CANCELLED
    }

}