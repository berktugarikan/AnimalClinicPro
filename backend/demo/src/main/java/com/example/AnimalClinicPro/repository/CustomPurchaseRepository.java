package com.example.AnimalClinicPro.repository;

import com.example.AnimalClinicPro.entity.CustomerPurchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomPurchaseRepository extends JpaRepository<CustomerPurchase,Long> {


}
