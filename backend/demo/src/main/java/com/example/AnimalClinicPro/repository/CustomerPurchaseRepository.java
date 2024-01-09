package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.CustomerPurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerPurchaseRepository extends JpaRepository<CustomerPurchase,Long> {
    List<CustomerPurchase> findByCustomerId(Long customerId);

}
