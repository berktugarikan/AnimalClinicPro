package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.entity.MailCheck;
import com.example.AnimalClinicPro.repository.MailCheckRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MailCheckService {

    private final MailCheckRepository mailCheckRepository;

    public MailCheckService(MailCheckRepository mailCheckRepository) {
        this.mailCheckRepository = mailCheckRepository;
    }

    public void saveMail(Long userId, String code) {
        MailCheck mailCheck = new MailCheck();
        mailCheck.setUserId(userId);
        mailCheck.setCode(code);
        mailCheckRepository.save(mailCheck);
    }

    public Boolean checkCode(Long userId, String code) {
        Optional<MailCheck> byUserId = mailCheckRepository.findByUserId(userId);
        return byUserId.get().getCode().equals(code);
    }

    public void deleteMail(Long userId) {
        Optional<MailCheck> byUserId = mailCheckRepository.findByUserId(userId);
        mailCheckRepository.delete(byUserId.get());
    }
}
