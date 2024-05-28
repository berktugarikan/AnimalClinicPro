package com.example.AnimalClinicPro.controller;

import com.example.AnimalClinicPro.dto.MailCheckRequest;
import com.example.AnimalClinicPro.service.MailCheckService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/mail-check")
public class MailCheckController {

    private final MailCheckService mailCheckService;

    public MailCheckController(MailCheckService mailCheckService) {
        this.mailCheckService = mailCheckService;
    }

    @PostMapping
    public ResponseEntity<Boolean> checkCode(@RequestBody MailCheckRequest request) {
        return ResponseEntity.ok(mailCheckService.checkCode(request.userId(), request.code()));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteMail(@PathVariable Long userId) {
        mailCheckService.deleteMail(userId);
        return ResponseEntity.noContent().build();
    }
}
