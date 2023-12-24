package com.example.AnimalClinicPro.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Clinic_Products")
@Data
public class ClinicProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Product_Name", nullable = false)
    private String productName;

    @Column(name = "Price", nullable = false)
    private Double price;

    @Column(name = "Stock_Quantity", nullable = false)
    private Integer stockQuantity;

    @Column(name = "Clinic_ID")
    private Long clinicId;

    @ManyToOne
    @JoinColumn(name = "Clinic_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private Clinic clinic;

}