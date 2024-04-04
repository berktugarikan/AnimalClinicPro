package com.example.AnimalClinicPro.dto;

import com.example.AnimalClinicPro.entity.Role;
import com.example.AnimalClinicPro.entity.User;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public record UserDto(
    Long id,
    String firstname,
    String surname,
    String email,
    String phoneNumber,
    String username,
    Role role

) {

    public static UserDto convert(User from) {
        return new UserDto(
            from.getId(),
            from.getFirstname(),
            from.getSurname(),
            from.getEmail(),
            from.getPhoneNumber(),
            from.getUsername(),
            from.getRole());
    }

    public static Set<UserDto> convert(Set<User> users) {
        return users.stream().map(UserDto::convert).collect(Collectors.toSet());
    }
}
