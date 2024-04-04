package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.ClinicDto;
import com.example.AnimalClinicPro.dto.CreateClinicRequest;
import com.example.AnimalClinicPro.entity.Clinic;
import com.example.AnimalClinicPro.exception.ClinicNotFoundException;
import com.example.AnimalClinicPro.repository.ClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClinicService {

    private final ClinicRepository clinicRepository;

    @Autowired
    public ClinicService(ClinicRepository clinicRepository) {
        this.clinicRepository = clinicRepository;
    }

    public List<ClinicDto> getAllClinics() {
        return clinicRepository.findAll()
                .stream()
                .map(ClinicDto::convert)
                .collect(Collectors.toList());
    }

    public ClinicDto getClinicById(Long id) {
        return ClinicDto.convert(findClinicById(id));
    }

    protected Clinic findClinicById(Long id) {
        return clinicRepository.findById(id)
                .orElseThrow(() -> new ClinicNotFoundException("Clinic not found by id : " + id));
    }

    public ClinicDto getClinicByClinicName(String clinicName) {
        return ClinicDto.convert(clinicRepository.findClinicByClinicName(clinicName));
    }

    public void createClinic(CreateClinicRequest request) {
        Clinic clinic = new Clinic();

        clinic.setClinicName(request.clinicName());
        clinic.setAddress(request.address());
        clinic.setCity(request.city());
        clinic.setDistrict(request.district());
        clinic.setAuthorizedName(request.authorizedName());
        clinic.setAuthorizedSurname(request.authorizedSurname());
        clinic.setPhoneNumber(request.phoneNumber());
        clinic.setPassword(request.password());
        clinic.setEmail(request.email());

        clinicRepository.save(clinic);
    }

    public void deleteClinic(Long id) {
        clinicRepository.deleteById(id);
    }
}
