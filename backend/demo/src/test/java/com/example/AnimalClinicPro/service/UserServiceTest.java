package com.example.AnimalClinicPro.service;

import com.example.AnimalClinicPro.dto.CreateUserRequest;
import com.example.AnimalClinicPro.dto.CreateVeterinarianRequest;
import com.example.AnimalClinicPro.dto.UpdateUserRequest;
import com.example.AnimalClinicPro.dto.UserDto;
import com.example.AnimalClinicPro.entity.User;
import com.example.AnimalClinicPro.exception.UserNotFoundException;
import com.example.AnimalClinicPro.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest extends TestSupport {

    private UserService userService;
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        userRepository = mock(UserRepository.class);
        userService = mock(UserService.class);
    }

    @Test
    public void testGetUserByGivenId_whenIdExists_shouldReturnUser() {
        User user = generateCustomer();

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        when(userService.getUserById(1L)).thenReturn(user);

        User actual = userService.getUserById(1L);

        assertEquals(user, actual);
    }

    @Test
    public void testGetUserByGivenId_whenIdDoesNotExist_shouldThrowUserNotFoundException() {

        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        when(userService.getUserById(1L)).thenThrow(UserNotFoundException.class);

        assertThrows(UserNotFoundException.class, () -> userService.getUserById(1L));
    }

    @Test
    public void testFindUserByGivenId_whenIdExists_shouldReturnUserDto() {
        User user = generateCustomer();
        UserDto userDto = UserDto.convert(user);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        when(userService.findUserById(1L)).thenReturn(userDto);

        UserDto actual = userService.findUserById(1L);

        assertEquals(userDto, actual);
    }

    @Test
    public void testFindUserByGivenId_whenIdDoesNotExist_shouldThrowUserNotFoundException() {

        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        when(userService.findUserById(1L)).thenThrow(UserNotFoundException.class);

        assertThrows(UserNotFoundException.class, () -> userService.findUserById(1L));
    }

    @Test
    public void testDeleteUserByGivenId_whenIdExists_shouldDeleteUser() {

        User user = generateCustomer();

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        doNothing().when(userRepository).deleteById(1L);

        assertAll(() -> userService.deleteUser(1L));
    }

    @Test
    public void testDeleteUserByGivenId_whenIdDoesNotExist_shouldThrowUserNotFoundException() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        when(userService.findUserById(1L)).thenThrow(UserNotFoundException.class);

        assertThrows(UserNotFoundException.class, () -> userService.findUserById(1L));
    }

    @Test
    public void testGetUserByGivenUsername_whenUsernameExists_shouldReturnUserDto() {
        User user = generateCustomer();
        UserDto userDto = UserDto.convert(user);

        when(userRepository.findByUsername("username")).thenReturn(Optional.of(user));

        when(userService.getUserByUsername("username")).thenReturn(userDto);

        UserDto actual = userService.getUserByUsername("username");

        assertEquals(userDto, actual);
    }

    @Test
    public void testGetUserByGivenUsername_whenUsernameDoesNotExist_shouldThrowUserNotFoundException() {

        when(userRepository.findByUsername("username")).thenReturn(Optional.empty());

        when(userService.getUserByUsername("username")).thenThrow(UserNotFoundException.class);

        assertThrows(UserNotFoundException.class, () -> userService.getUserByUsername("username"));
    }

    @Test
    public void testGetUserByGivenPhoneNumber_whenPhoneNumberExists_shouldReturnUserDto() {
        User user = generateCustomer();
        UserDto userDto = UserDto.convert(user);

        when(userRepository.findByPhoneNumber("phoneNumber")).thenReturn(Optional.of(user));

        when(userService.getUserByPhoneNumber("phoneNumber")).thenReturn(userDto);

        UserDto actual = userService.getUserByPhoneNumber("phoneNumber");

        assertEquals(userDto, actual);
    }

    @Test
    public void testGetUserByGivenPhoneNumber_whenPhoneNumberDoesNotExist_shouldThrowUserNotFoundException() {

        when(userRepository.findByPhoneNumber("phoneNumber")).thenReturn(Optional.empty());

        when(userService.getUserByPhoneNumber("phoneNumber")).thenThrow(UserNotFoundException.class);

        assertThrows(UserNotFoundException.class, () -> userService.getUserByPhoneNumber("phoneNumber"));
    }

    @Test
    public void testCreateUser_whenRequestIsValid_shouldReturnUserDto() {
        CreateUserRequest request = generateCreateUserRequest();

        when(userRepository.save(Mockito.any(User.class))).thenReturn(generateCustomer());

        UserDto userDto = UserDto.convert(generateCustomer());

        when(userService.createUser(request)).thenReturn(userDto);

        UserDto actual = userService.createUser(request);

        org.assertj.core.api.Assertions.assertThat(actual).isNotNull();

        assertEquals(userDto, actual);
    }

    @Test
    public void testUpdateUser_whenRequestIsValidAndIdExists_shouldReturnUserDto() {
        UpdateUserRequest request = generateUpdateUserRequest();

        when(userRepository.findById(1L)).thenReturn(Optional.of(generateCustomer()));

        when(userService.updateUser(1L, request)).thenReturn(UserDto.convert(generateCustomer()));

        UserDto userDto = userService.updateUser(1L, request);

        org.assertj.core.api.Assertions.assertThat(userDto).isNotNull();
    }

    @Test
    public void testUpdateUser_whenRequestIsValidAndIdDoesNotExist_shouldThrowUserNotFoundException() {

        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        when(userService.updateUser(1L, generateUpdateUserRequest())).thenThrow(UserNotFoundException.class);

        assertThrows(UserNotFoundException.class, () -> userService.updateUser(1L, generateUpdateUserRequest()));
    }

    @Test
    public void testCreateVeterinarian_whenRequestIsValid_shouldReturnUserDto() {
        CreateVeterinarianRequest request = generateCreateVeterinarianRequest();

        when(userRepository.save(Mockito.any(User.class))).thenReturn(generateVeterinarian());

        UserDto userDto = UserDto.convert(generateVeterinarian());

        when(userService.createVeterinarian(request)).thenReturn(userDto);

        UserDto actual = userService.createVeterinarian(request);

        org.assertj.core.api.Assertions.assertThat(actual).isNotNull();

        assertEquals(userDto, actual);
    }

}