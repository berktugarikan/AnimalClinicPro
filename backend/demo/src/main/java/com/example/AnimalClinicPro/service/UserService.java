package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.config.PasswordConfig;
import com.example.AnimalClinicPro.dto.CreateUserRequest;
import com.example.AnimalClinicPro.dto.CreateVeterinarianRequest;
import com.example.AnimalClinicPro.dto.UpdateUserRequest;
import com.example.AnimalClinicPro.dto.UserDto;
import com.example.AnimalClinicPro.entity.Clinic;
import com.example.AnimalClinicPro.entity.Role;
import com.example.AnimalClinicPro.entity.User;
//import com.example.AnimalClinicPro.exceptions.UsedEmailException;
import com.example.AnimalClinicPro.exception.UserNotFoundException;
import com.example.AnimalClinicPro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordConfig passwordConfig;
    private final ClinicService clinicService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordConfig passwordConfig, ClinicService clinicService) {
        this.userRepository = userRepository;
        this.passwordConfig = passwordConfig;
        this.clinicService = clinicService;
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserDto::convert)
                .collect(Collectors.toList());
    }

    protected User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found by id : " + id));
    }

    public UserDto findUserById(Long id) {
        User user = getUserById(id);
        return UserDto.convert(user);
    }

    public UserDto getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(UserDto::convert)
                .orElseThrow(() -> new UserNotFoundException("User not found by username : " + username));
    }


    public UserDto getUserByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber)
                .map(UserDto::convert)
                .orElseThrow(() -> new UserNotFoundException("User not found by phone number : " + phoneNumber));
    }


    public UserDto createUser(CreateUserRequest request) {
        User user = new User();

        user.setFirstname(request.firstname());
        user.setSurname(request.surname());
        user.setUsername(request.username());
        user.setPassword(passwordConfig.passwordEncoder().encode(request.password()));
        user.setEmail(request.email());
        user.setPhoneNumber(request.phoneNumber());
        user.setRole(request.role());

        return UserDto.convert(userRepository.save(user));
    }

    public UserDto createVeterinarian(CreateVeterinarianRequest request) {
        Clinic clinic = clinicService.findClinicById(request.clinicId());

        User user = new User();
        user.setEmail(request.email());
        user.setFirstname(request.firstname());
        user.setSurname(request.surname());
        user.setUsername(request.username());
        user.setPassword(passwordConfig.passwordEncoder().encode(request.password()));
        user.setPhoneNumber(request.phoneNumber());
        user.setRole(Role.ROLE_VETERINARIAN);
        user.setClinic(clinic);

        return UserDto.convert(userRepository.save(user));
    }

    public UserDto updateUser(Long id, UpdateUserRequest request) {
        User updatedUser = getUserById(id);

        updatedUser.setFirstname(request.firstname());
        updatedUser.setSurname(request.surname());
        updatedUser.setUsername(request.username());
        updatedUser.setEmail(request.email());
        updatedUser.setPhoneNumber(request.phoneNumber());
        updatedUser.setRole(request.role());

        User savedUser = userRepository.save(updatedUser);
        return UserDto.convert(savedUser);
    }

    public List<UserDto> findUsersByCustomer() {
        return userRepository.findByRole(Role.ROLE_CUSTOMER)
                .stream()
                .map(UserDto::convert)
                .collect(Collectors.toList());
    }

    public List<UserDto> findUsersByVeterinarian() {
        return userRepository.findByRole(Role.ROLE_VETERINARIAN)
                .stream()
                .map(UserDto::convert)
                .collect(Collectors.toList());
    }
/*
    @Transactional
    public void userRegisteration(User newUser) throws UsedEmailException {
        Iterator<User> getAllUsers = getAllUsers().iterator();
        List<String> emails = new ArrayList<>();

        while (getAllUsers.hasNext()){
            emails.add(getAllUsers.next().getEmail());
        }
        if (emails.contains(newUser.getEmail())){
            throw new UsedEmailException("Email already in use!!");
        }else {

            userRepository.save(newUser);
        }
    }
*/
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found by email : " + email));
    }


}
