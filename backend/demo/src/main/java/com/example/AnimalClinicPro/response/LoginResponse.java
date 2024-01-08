package com.example.AnimalClinicPro.response;

import com.example.AnimalClinicPro.entity.User;
import lombok.Data;

@Data
public class LoginResponse {
    private int status;
    private String message;
    private long dateTimeObject;
    private String path;
    private User user;

    public LoginResponse(int status, User user, String message){
        this.status = status;
        this.user = user;
        this.message = message;
    }

    public LoginResponse(int status, String message){
        this.status = status;
        this.message = message;
    }
}
