package com.example.AnimalClinicPro.entity;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ROLE_CUSTOMER, ROLE_VETERINARIAN;


    @Override
    public String getAuthority() {
        return name();
    }
}
