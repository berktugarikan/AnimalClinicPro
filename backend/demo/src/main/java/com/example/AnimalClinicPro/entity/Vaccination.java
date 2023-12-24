package com.example.AnimalClinicPro.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
    @AllArgsConstructor
    @NoArgsConstructor
    @Entity
    @Table(name = "Vaccinations")
    @Data
    public class Vaccination {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "Animal_ID")
        private Long animalId;

        @ManyToOne
        @JoinColumn(name = "Animal_ID", referencedColumnName = "ID", insertable = false, updatable = false)
        private Animal animal;

        @Column(name = "Vaccination_Type_ID")
        private Long vaccinationTypeId;

        @ManyToOne
        @JoinColumn(name = "Vaccination_Type_ID", referencedColumnName = "ID", insertable = false, updatable = false)
        private VaccinationType vaccinationType;

        @Column(name = "Vaccination_Date", nullable = false)
        private Date vaccinationDate;

        @Enumerated(EnumType.STRING)
        @Column(name = "Vaccination_Status", nullable = false, columnDefinition = "VARCHAR(20) DEFAULT 'PENDING'")
        private VaccinationStatus vaccinationStatus;

        @Column(name = "Vaccination_Description", columnDefinition = "TEXT")
        private String vaccinationDescription;

        @Column(name = "Veterinarian_ID")
        private Long veterinarianId;

        @ManyToOne
        @JoinColumn(name = "Veterinarian_ID", referencedColumnName = "ID", insertable = false, updatable = false)
        private VeterinarianUser veterinarian;

        @Column(name = "Customer_ID")
        private Long customerId;

        @ManyToOne
        @JoinColumn(name = "Customer_ID", referencedColumnName = "ID", insertable = false, updatable = false)
        private CustomerUser customer;

        public enum VaccinationStatus {
            PENDING,
            COMPLETED,
            CANCELLED
        }

}