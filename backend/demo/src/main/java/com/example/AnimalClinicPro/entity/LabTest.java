package com.example.AnimalClinicPro.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Lab_Tests")
@Data
public class LabTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Animal_ID")
    private Long animalId;

    @ManyToOne
    @JoinColumn(name = "Animal_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private Animal animal;

    @Column(name = "Test_Type_ID")
    private Long testTypeId;

    @ManyToOne
    @JoinColumn(name = "Test_Type_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private LabTestType labTestType;

    @Column(name = "Test_Date", nullable = false)
    private Date testDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "Test_Status", nullable = false, columnDefinition = "VARCHAR(20) DEFAULT 'PENDING'")
    private TestStatus testStatus;

    @Column(name = "Test_Description", columnDefinition = "TEXT")
    private String testDescription;

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

    public enum TestStatus {
        PENDING,
        COMPLETED,
        CANCELLED
    }
}