package com.example.AnimalClinicPro.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Table(name = "Customer_Purchases")
@Data
public class CustomerPurchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Customer_ID")
    private Long customerId;

    @ManyToOne
    @JoinColumn(name = "Customer_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private CustomerUser customer;

    @Column(name = "Clinic_Product_ID")
    private Long clinicProductId;

    @ManyToOne
    @JoinColumn(name = "Clinic_Product_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private ClinicProduct clinicProduct;

    @Column(name = "Purchase_Date", nullable = false)
    private Date purchaseDate;

    @Column(name = "Quantity", nullable = false)
    private Integer quantity;

    @Column(name = "Total_Price", nullable = false)
    private Double totalPrice;

    @Column(name = "Payment_Date", nullable = false)
    private Date paymentDate;

    @Column(name = "Payment_Amount", nullable = false)
    private Double paymentAmount;

    @Column(name = "Payment_Method", nullable = false)
    private String paymentMethod;

}