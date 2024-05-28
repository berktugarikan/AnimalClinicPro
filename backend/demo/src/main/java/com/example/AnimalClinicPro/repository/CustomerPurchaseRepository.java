package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.Animal;
import com.example.AnimalClinicPro.entity.CustomerPurchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CustomerPurchaseRepository extends JpaRepository<CustomerPurchase, Long> {
    Optional<CustomerPurchase> findById(Long userId);

    List<CustomerPurchase> findByCustomerId(Long customerId);
}
