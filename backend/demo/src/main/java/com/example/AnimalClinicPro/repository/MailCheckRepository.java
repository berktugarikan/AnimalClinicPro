package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.MailCheck;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MailCheckRepository extends JpaRepository<MailCheck, Long> {

    Optional<MailCheck> findByUserId(Long userId);
}
