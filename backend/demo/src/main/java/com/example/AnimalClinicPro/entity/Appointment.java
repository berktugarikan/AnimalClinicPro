package com.example.AnimalClinicPro.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Time;
import java.sql.Date;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Appointment")
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Animal_ID", referencedColumnName = "ID")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Animal animal;

    @Column(name = "Appointment_Date", nullable = false)
    @Temporal(TemporalType.DATE)
    private java.sql.Date appointmentDate;

    @Column(name = "Appointment_Time", nullable = false)
    @Temporal(TemporalType.TIME)
    private java.sql.Time appointmentTime;

    @Column(name = "Appointment_Type", nullable = false)
    @Enumerated(EnumType.STRING)
    private AppointmentType appointmentType;

    @Column(name = "Appointment_Description", columnDefinition = "TEXT")
    private String appointmentDescription;

    @Column(name = "Status", nullable = false)
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;
    @Column(name = "Customer_ID", nullable = false)
    private Long customerId;
    @Column(name = "Veterinarian_ID", nullable = false)
    private Long veterinarianId;

    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + id +
                ", appointmentDate=" + appointmentDate +
                ", appointmentTime=" + appointmentTime +
                ", appointmentType=" + appointmentType +
                ", appointmentDescription='" + appointmentDescription + '\'' +
                ", status=" + status +
                ", customerId=" + customerId +
                ", veterinarianId=" + veterinarianId +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Appointment that = (Appointment) o;
        return Objects.equals(id, that.id) && Objects.equals(appointmentDate, that.appointmentDate) && Objects.equals(appointmentTime, that.appointmentTime) && appointmentType == that.appointmentType && Objects.equals(appointmentDescription, that.appointmentDescription) && status == that.status && Objects.equals(customerId, that.customerId) && Objects.equals(veterinarianId, that.veterinarianId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, appointmentDate, appointmentTime, appointmentType, appointmentDescription, status, customerId, veterinarianId);
    }

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