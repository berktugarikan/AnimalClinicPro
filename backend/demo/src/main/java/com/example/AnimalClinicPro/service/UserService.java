package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.entity.User;
import com.example.AnimalClinicPro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.orElse(null);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User getUserByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User newUser) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            // Update fields as needed
            existingUser.setFirstname(newUser.getFirstname());
            existingUser.setSurname(newUser.getSurname());
            existingUser.setUsername(newUser.getUsername());
            existingUser.setPassword(newUser.getPassword());
            existingUser.setEmail(newUser.getEmail());
            existingUser.setPhoneNumber(newUser.getPhoneNumber());
            existingUser.setAuthorization(newUser.getAuthorization());

            return userRepository.save(existingUser);
        }

        return null;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}