package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.entity.VeterinarianUser;
import com.example.AnimalClinicPro.repository.VeterinarianUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VeterinarianUserService {

    private final VeterinarianUserRepository veterinarianUserRepository;

    @Autowired
    public VeterinarianUserService(VeterinarianUserRepository veterinarianUserRepository) {
        this.veterinarianUserRepository = veterinarianUserRepository;
    }

    public List<VeterinarianUser> getAllVeterinarianUsers() {
        return veterinarianUserRepository.findAll();
    }

    public VeterinarianUser getVeterinarianUserById(Long id) {
        return veterinarianUserRepository.findById(id).orElse(null);
    }

    public VeterinarianUser getVeterinarianUserByPhoneNumber(String phoneNumber) {
        return veterinarianUserRepository.findByUser_phoneNumber(phoneNumber);
    }

    public List<VeterinarianUser> getVeterinariansByClinicId(Long clinicId) {
        return veterinarianUserRepository.findByClinicId(clinicId);
    }

    public VeterinarianUser createVeterinarianUser(VeterinarianUser veterinarianUser) {
        return veterinarianUserRepository.save(veterinarianUser);
    }

    public void deleteVeterinarianUser(Long id) {
        veterinarianUserRepository.deleteById(id);
    }
}
