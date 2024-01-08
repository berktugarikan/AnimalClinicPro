package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  UserRepository extends JpaRepository<User,Long> {
    User findByUsername(String username);
    User findByPhoneNumber(String phoneNumber);

    User findByemail(String email);
}
