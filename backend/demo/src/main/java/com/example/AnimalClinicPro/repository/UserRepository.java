package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.Role;
import com.example.AnimalClinicPro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface  UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByPhoneNumber(String phoneNumber);
    Optional<User> findByEmail(String email);

    List<User> findByRole(Role role);

    List<User> findByClinic_Id(Long clinicId);


    List<User> findByRoleAndClinic_Id(Role role, Long clinicId);
}
