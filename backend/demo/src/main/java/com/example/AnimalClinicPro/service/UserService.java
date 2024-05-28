package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.config.PasswordConfig;
import com.example.AnimalClinicPro.dto.*;
import com.example.AnimalClinicPro.entity.Clinic;
import com.example.AnimalClinicPro.entity.Role;
import com.example.AnimalClinicPro.entity.User;
//import com.example.AnimalClinicPro.exceptions.UsedEmailException;
import com.example.AnimalClinicPro.exception.UserNotFoundException;
import com.example.AnimalClinicPro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordConfig passwordConfig;
    private final ClinicService clinicService;
    private final MailService mailService;
    private final MailCheckService mailCheckService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordConfig passwordConfig, ClinicService clinicService, MailService mailService, MailCheckService mailCheckService) {
        this.userRepository = userRepository;
        this.passwordConfig = passwordConfig;
        this.clinicService = clinicService;
        this.mailService = mailService;
        this.mailCheckService = mailCheckService;
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserDto::convert)
                .collect(Collectors.toList());
    }

    public User getUserById(Long id) {
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
        user.setIsEnabled(false);

        // Clinic ID'yi de ayarlayalım
        Clinic clinic = clinicService.findClinicById(request.clinicId());
        user.setClinic(clinic);

        User savedUser = userRepository.save(user);



        return UserDto.convert(savedUser);
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

    protected List<User> findUsersBySameClinic(Long id) {
        return userRepository.findByClinic_Id(id);
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


    public UserDto updateUserRole(String username, Role newRole) {
        // Belirtilen kullanıcıyı username ile bul.
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found by username: " + username));

        // Kullanıcının rolünü güncelle.
        user.setRole(newRole);

        // Güncellenen kullanıcıyı kaydet.
        User updatedUser = userRepository.save(user);

        // Güncellenen kullanıcıyı UserDto'ya dönüştürerek döndür.
        return UserDto.convert(updatedUser);
    }

    public List<UserDto> findCustomersByClinicId(Long clinicId) {
        return userRepository.findByRoleAndClinic_Id(Role.ROLE_CUSTOMER, clinicId)
                .stream()
                .map(UserDto::convert)
                .collect(Collectors.toList());
    }
    public List<UserDto> findVetsByClinicId(Long clinicId) {
        return userRepository.findByRoleAndClinic_Id(Role.ROLE_VETERINARIAN, clinicId)
                .stream()
                .map(UserDto::convert)
                .collect(Collectors.toList());
    }
    public UserDto updatePassword(Long id, UpdatePasswordRequest request) {
        User user = getUserById(id);
        if (passwordConfig.passwordEncoder().matches(request.oldPassword(), user.getPassword())) {
            user.setPassword(passwordConfig.passwordEncoder().encode(request.newPassword()));
            return UserDto.convert(userRepository.save(user));
        }
        throw new UserNotFoundException("Old password is not correct");
    }
    public List<UserDto> findCustomersAndVetsByClinicId(Long clinicId) {
        List<User> customersAndVets = new ArrayList<>();
        customersAndVets.addAll(userRepository.findByRoleAndClinic_Id(Role.ROLE_CUSTOMER, clinicId));
        customersAndVets.addAll(userRepository.findByRoleAndClinic_Id(Role.ROLE_VETERINARIAN, clinicId));

        return customersAndVets.stream()
                .map(UserDto::convert)
                .collect(Collectors.toList());
    }


}
