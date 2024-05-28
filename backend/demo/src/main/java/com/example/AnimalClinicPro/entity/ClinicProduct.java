package com.example.AnimalClinicPro.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Clinic_Product")
@Data
public class ClinicProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Product_Name", nullable = false)
    private String productName;

    @Column(name = "Price", nullable = false)
    private Float price;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Clinic_ID", referencedColumnName = "ID")
    private Clinic clinic;

    @Override
    public String toString() {
        return "ClinicProduct{" +
                "id=" + id +
                ", productName='" + productName + '\'' +
                ", price=" + price +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClinicProduct that = (ClinicProduct) o;
        return Objects.equals(id, that.id) && Objects.equals(productName, that.productName) && Objects.equals(price, that.price);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, productName, price);
    }
}