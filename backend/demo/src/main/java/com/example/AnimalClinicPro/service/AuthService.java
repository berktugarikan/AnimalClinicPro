package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.config.PasswordConfig;
import com.example.AnimalClinicPro.dto.AuthResponseDto;
import com.example.AnimalClinicPro.dto.LoginRequest;
import com.example.AnimalClinicPro.entity.User;
import com.example.AnimalClinicPro.repository.UserRepository;
import com.example.AnimalClinicPro.security.JwtService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordConfig passwordConfig;
    private final JwtService jwtService;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, PasswordConfig passwordConfig, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordConfig = passwordConfig;
        this.jwtService = jwtService;
    }

    public AuthResponseDto login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(request.username());
            User userByUsername = userRepository.findByUsername(request.username()).get();
            AuthResponseDto authResponseDto = AuthResponseDto
                    .builder()
                    .username(userByUsername.getUsername())
                    .role(userByUsername.getRole().name())
                    .token(token)
                    .userId(userByUsername.getId())
                    .build();
            return authResponseDto;
        }

        throw new EntityNotFoundException("User not found");
    }
}
