package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  UserRepository extends JpaRepository<User,Long> {

    User findByUserId(Long id);
    User findByUserName(String username);
    User findByEmail(String email);
    User findByPhoneNumber(String phoneNumber);
}
