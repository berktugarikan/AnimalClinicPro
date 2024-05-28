package com.example.AnimalClinicPro.config;

import com.example.AnimalClinicPro.security.JwtAuthFilter;
import com.example.AnimalClinicPro.service.UserDetailServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailServiceImpl userDetailsService;
    private final PasswordEncoder passwordEncoder;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter, UserDetailServiceImpl userDetailsService, PasswordEncoder passwordEncoder) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/users/**").hasAnyRole("VETERINARIAN", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/users/**").hasAnyRole("VETERINARIAN", "ADMIN","CUSTOMER")
                        /*
                        .requestMatchers(HttpMethod.GET, "/api/users/**").hasAnyRole("VETERINARIAN", "CUSTOMER")
                        .requestMatchers(HttpMethod.PUT, "/api/users/**").hasAnyRole("CUSTOMER")
                        .requestMatchers(HttpMethod.DELETE, "/api/users/**").hasAnyRole("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/clinic-products/**").hasAnyRole("VETERINARIAN")
                        .requestMatchers(HttpMethod.POST, "/api/clinic-products/**").hasAnyRole("VETERINARIAN")
                        .requestMatchers(HttpMethod.PUT, "/api/clinic-products/**").hasAnyRole("VETERINARIAN")
                        .requestMatchers(HttpMethod.DELETE, "/api/clinic-products/**").hasAnyRole("VETERINARIAN")
                        .requestMatchers(HttpMethod.GET, "/api/lab-tests/**").hasAnyRole("VETERINARIAN", "CUSTOMER")
                        .requestMatchers(HttpMethod.POST, "/api/lab-tests/**").hasAnyRole("VETERINARIAN")
                        .requestMatchers(HttpMethod.PUT, "/api/lab-tests/**").hasAnyRole("VETERINARIAN")
                        .requestMatchers(HttpMethod.DELETE, "/api/lab-tests/**").hasAnyRole("VETERINARIAN")
                        .requestMatchers(HttpMethod.GET, "/api/animals/**").hasAnyRole("CUSTOMER", "VETERINARIAN")
                        .requestMatchers(HttpMethod.POST, "/api/animals/**").hasAnyRole("CUSTOMER")
                        .requestMatchers(HttpMethod.PUT, "/api/animals/**").hasAnyRole("CUSTOMER")
                        .requestMatchers(HttpMethod.DELETE, "/api/animals/**").hasAnyRole("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/clinics/**").hasAnyRole("VETERINARIAN")
                        .requestMatchers(HttpMethod.POST, "/api/clinics/**").hasAnyRole("VETERINARIAN")
                        .requestMatchers(HttpMethod.PUT, "/api/clinics/**").hasAnyRole("VETERINARIAN")
                        .requestMatchers(HttpMethod.DELETE, "/api/clinics/**").hasAnyRole("VETERINARIAN")
                        .requestMatchers(HttpMethod.GET, "/api/vaccinations/**").hasAnyRole("VETERINARIAN", "CUSTOMER")
                        .requestMatchers(HttpMethod.POST, "/api/vaccinations/**").hasAnyRole("VETERINARIAN")
                        .requestMatchers(HttpMethod.PUT, "/api/vaccinations/**").hasAnyRole("VETERINARIAN")
                        .requestMatchers(HttpMethod.DELETE, "/api/vaccinations/**").hasAnyRole("VETERINARIAN")
                        .requestMatchers(HttpMethod.GET, "/api/appointments/**").hasAnyRole("VETERINARIAN", "CUSTOMER")
                        .requestMatchers(HttpMethod.POST, "/api/appointments/**").hasAnyRole("VETERINARIAN", "CUSTOMER")
                        .requestMatchers(HttpMethod.PUT, "/api/appointments/**").hasAnyRole("VETERINARIAN")
                        .requestMatchers(HttpMethod.DELETE, "/api/appointments/**").hasAnyRole("VETERINARIAN", "CUSTOMER")

                         */
                        .anyRequest().permitAll())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
