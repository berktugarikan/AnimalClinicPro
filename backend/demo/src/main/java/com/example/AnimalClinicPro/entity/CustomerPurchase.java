package com.example.AnimalClinicPro.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Customer_Purchase")
@Data
public class CustomerPurchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Clinic_Product_ID", referencedColumnName = "ID")
    private ClinicProduct clinicProduct;

    @Column(name = "Payment_Date", nullable = false)
    @Temporal(TemporalType.DATE)
    private java.sql.Date paymentDate;

    @Column(name = "Payment_Amount", nullable = false)
    private Float paymentAmount;

    @Column(name = "Payment_Method", nullable = false)
    private String paymentMethod;

    private Long veterinaryId;
    private Long customerId;

    @Override
    public String toString() {
        return "CustomerPurchase{" +
                "id=" + id +
                ", paymentDate=" + paymentDate +
                ", paymentAmount=" + paymentAmount +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", veterinaryId=" + veterinaryId +
                ", customerId=" + customerId +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CustomerPurchase that = (CustomerPurchase) o;
        return Objects.equals(id, that.id) &&  Objects.equals(paymentDate, that.paymentDate) && Objects.equals(paymentAmount, that.paymentAmount) && Objects.equals(paymentMethod, that.paymentMethod) && Objects.equals(veterinaryId, that.veterinaryId) && Objects.equals(customerId, that.customerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, paymentDate, paymentAmount, paymentMethod, veterinaryId, customerId);
    }
}