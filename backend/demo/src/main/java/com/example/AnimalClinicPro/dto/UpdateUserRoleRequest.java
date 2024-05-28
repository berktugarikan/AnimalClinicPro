package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.Role;

public class UpdateUserRoleRequest {
    private Role role;

    public UpdateUserRoleRequest() {
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
