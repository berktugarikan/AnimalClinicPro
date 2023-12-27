package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  UserRepository extends JpaRepository<User,Long> {

    User findByid(Long id);
    User findByfirstname(String firstname);
    User findByemail(String email);
    User findByphoneNumber(String phoneNumber);
}
