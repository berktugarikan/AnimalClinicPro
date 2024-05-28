package com.example.AnimalClinicPro.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Date;
import java.util.Objects;

@AllArgsConstructor
    @NoArgsConstructor
    @Entity
    @Table(name = "Vaccination")
    @Data
    @Builder
    public class Vaccination {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "Animal_ID", referencedColumnName = "ID")
        @OnDelete(action = OnDeleteAction.CASCADE)
        private Animal animal;

        @Column(name = "Vaccination_Date", nullable = false)
        @Temporal(TemporalType.DATE)
        private java.sql.Date vaccinationDate;

        @Column(name = "Vaccination_Time", nullable = false)
        @Temporal(TemporalType.TIME)
        private java.sql.Time vaccinationTime;

        @Column(name = "Vaccination_Status", nullable = false)
        @Enumerated(EnumType.STRING)
        private VaccinationStatus vaccinationStatus;

        @Column(name = "Vaccination_Description", columnDefinition = "TEXT")
        private String vaccinationDescription;

         @Column(name = "Veterinarian_ID", nullable = false)
        private Long veterinarianId;

        @Override
        public String toString() {
            return "Vaccination{" +
                    "id=" + id +
                    ", animal=" + animal +
                    ", vaccinationDate=" + vaccinationDate +
                    ", vaccinationTime=" + vaccinationTime +
                    ", vaccinationStatus=" + vaccinationStatus +
                    ", vaccinationDescription='" + vaccinationDescription + '\'' +
                    '}';
        }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vaccination that = (Vaccination) o;
        return Objects.equals(id, that.id) && Objects.equals(animal, that.animal) && Objects.equals(vaccinationDate, that.vaccinationDate) && Objects.equals(vaccinationTime, that.vaccinationTime) && vaccinationStatus == that.vaccinationStatus && Objects.equals(vaccinationDescription, that.vaccinationDescription);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, animal, vaccinationDate, vaccinationTime, vaccinationStatus, vaccinationDescription);
    }

    public enum VaccinationStatus {
            PENDING,
            COMPLETED,
            CANCELLED
        }

}