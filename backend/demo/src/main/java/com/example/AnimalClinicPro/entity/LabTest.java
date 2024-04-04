package com.example.AnimalClinicPro.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Date;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Lab_Test")
@Data
public class LabTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Animal_ID", referencedColumnName = "ID")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Animal animal;

    @Column(name = "Test_Date", nullable = false)
    @Temporal(TemporalType.DATE)
    private java.sql.Date testDate;

    @Column(name = "Test_Status", nullable = false)
    @Enumerated(EnumType.STRING)
    private TestStatus testStatus;

    @Column(name = "Test_Description", columnDefinition = "TEXT")
    private String testDescription;

    @Column(name = "Veterinarian_ID", nullable = false)
    private Long veterinarianId;


    @Override
    public String toString() {
        return "LabTest{" +
                "id=" + id +
                ", testDate=" + testDate +
                ", testStatus=" + testStatus +
                ", testDescription='" + testDescription + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LabTest labTest = (LabTest) o;
        return Objects.equals(id, labTest.id) && Objects.equals(testDate, labTest.testDate) && testStatus == labTest.testStatus && Objects.equals(testDescription, labTest.testDescription);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, testDate, testStatus, testDescription);
    }

    public enum TestStatus {
        PENDING,
        COMPLETED,
        CANCELLED
    }
}