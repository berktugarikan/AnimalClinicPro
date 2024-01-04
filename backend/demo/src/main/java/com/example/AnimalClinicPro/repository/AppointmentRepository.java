package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.Appointment;
import com.example.AnimalClinicPro.entity.CustomerUser;
import com.example.AnimalClinicPro.entity.VeterinarianUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    List<Appointment> findAllAppointmentByCustomer(CustomerUser customer);//Müşteriye ait bütün randevuları getirir.
    List<Appointment> findAppointmentsByVeterinarian(VeterinarianUser veterinarian);//Veterinere ait bütün randevuları getirir.
    List<Appointment> findAllAppointmentByAppointmentType(Appointment.AppointmentType appointmentType);//Belirli bir randevu türüne göre o randevuları getirir.
    List<Appointment> findAppointmentsByCustomerAndStatus(CustomerUser customer, Appointment.AppointmentStatus status);//Belli müşterinin belli status durumuna göre olan randevularını getirir.
    List<Appointment> findAppointmentsByVeterinarianAndStatus(VeterinarianUser veterinarian, Appointment.AppointmentStatus status);//Belli veterinerin belli status durumuna göre olan randevularını getirir.
    List<Appointment> findAllAppointmentByStatus(Appointment.AppointmentStatus status);//Belirli bir durumdaki randevuları getirir.

    //Veterinerin belli bir tarihte hangi saatlerde boş randevusu olduğunu getirir.
    @Query("SELECT DISTINCT a.appointmentTime FROM Appointment a " +
            "WHERE a.veterinarian = :veterinarian " +
            "AND a.appointmentDate = :appointmentDate " +
            "AND a.status = 'PENDING'")
    List<Time> findAvailableAppointmentTimes(@Param("veterinarian") VeterinarianUser veterinarian,@Param("appointmentDate") Date appointmentDate);
    List<Appointment> findAll();
}
