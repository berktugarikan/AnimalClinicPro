package com.example.AnimalClinicPro.exception;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException e, HttpServletResponse response) {
        ErrorResponse errorResponse = ErrorResponse
                .builder()
                .message(e.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AppointmentNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleAppointmentNotFoundException(AppointmentNotFoundException e, HttpServletResponse response) {
        ErrorResponse errorResponse = ErrorResponse
                .builder()
                .message(e.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AnimalNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleAnimalNotFoundException(AnimalNotFoundException e, HttpServletResponse response) {
        ErrorResponse errorResponse = ErrorResponse
                .builder()
                .message(e.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ClinicNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleClinicNotFoundException(ClinicNotFoundException e, HttpServletResponse response) {
        ErrorResponse errorResponse = ErrorResponse
                .builder()
                .message(e.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(LabTestNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleLabTestNotFoundException(LabTestNotFoundException e, HttpServletResponse response) {
        ErrorResponse errorResponse = ErrorResponse
                .builder()
                .message(e.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(VaccinationNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleVaccinationNotFoundException(VaccinationNotFoundException e, HttpServletResponse response) {
        ErrorResponse errorResponse = ErrorResponse
                .builder()
                .message(e.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
