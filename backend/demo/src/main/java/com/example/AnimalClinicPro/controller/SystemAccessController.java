package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.entity.User;
import com.example.AnimalClinicPro.exceptions.UsedEmailException;
import com.example.AnimalClinicPro.request.LoginRequest;
import com.example.AnimalClinicPro.response.LoginResponse;
import com.example.AnimalClinicPro.response.RegistrationResponse;
import com.example.AnimalClinicPro.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
@RestController
@Data
public class SystemAccessController {
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> registerCustomer(@RequestBody User user){
        /*try {
            userService.userRegisteration(user);
            // response object returns https 2**
            return new ResponseEntity<>(new RegistrationResponse("Successful Registration!"), HttpStatus.OK);
        }
        // If not undestandble error is thrown which is probably server error.
        catch(Exception err){
            return new ResponseEntity<>("Not unique data! mail or sth in SYSTEM!", HttpStatus.BAD_REQUEST);
        }*/

        try {
            userService.userRegisteration(user);
            // response object returns https 2**
            return ResponseEntity.ok(new RegistrationResponse("Successful Registration!"));
        }
        // If not understandable error is thrown which is probably a server error.
        catch (Exception err){
            return ResponseEntity.badRequest().body(new RegistrationResponse("Not unique data! mail or sth in SYSTEM!"));
        }
    }
/*
    @GetMapping("/login")
    // Generic type login function
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
        String controller = "";
        // user type for front-end
        User user = userService.getUserByEmail(loginRequest.getEmail());

        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            controller = "Logged-in";
        }

        if (controller.equals("Logged-in")) {
            // HTTP status 2**
            return new ResponseEntity<>(new LoginResponse(200, user, controller), HttpStatus.OK);
        } else {
            // HTTP status 4**
            return new ResponseEntity<>(new LoginResponse(400, "Invalid Request"), HttpStatus.BAD_REQUEST);
        }
    }
*/
       @GetMapping("/login/{email}/{password}")
    // Generic type login function
    public ResponseEntity<LoginResponse> login(@PathVariable String email, @PathVariable String password){
        String controller = "";
        // user type for front-end
        User user = userService.getUserByEmail(email);

        if (user != null && user.getPassword().equals(password)){
            controller = "Logged-in";
        }

            if ((controller.equals("Logged-in"))){
                // Http status 2**
                return new ResponseEntity<>(new LoginResponse(200,user,controller), HttpStatus.OK);
            }
            else{
                // Https status 4**
                return new ResponseEntity<>(new LoginResponse(400, "Invalid Request"), HttpStatus.BAD_REQUEST);}
    }
}




























