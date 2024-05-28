package com.example.AnimalClinicPro;

import com.example.AnimalClinicPro.dto.AnimalDto;
import com.example.AnimalClinicPro.dto.CreateAnimalRequest;
import com.example.AnimalClinicPro.entity.Animal;
import com.example.AnimalClinicPro.entity.User;
import com.example.AnimalClinicPro.exception.AnimalNotFoundException;
import com.example.AnimalClinicPro.repository.AnimalRepository;
import com.example.AnimalClinicPro.service.AnimalService;
import com.example.AnimalClinicPro.service.UserService;
import com.example.AnimalClinicPro.utils.SqlDateConverter;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.sql.Date;
import java.util.List;
import java.util.Optional;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class AnimalServiceTest {

    @Mock
    private AnimalRepository animalRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private AnimalService animalService;

    @BeforeEach
    void setUp() {
        // Her testten önce yapılması gerekenler burada gerçekleştirilebilir
    }

    @Test
    void testCreateAnimal() {
        // Hayvan oluşturma işlemini test et
        CreateAnimalRequest request = new CreateAnimalRequest(
                "Buddy",  // Name
                Animal.Gender.Male,  // Gender
                "Dog",  // Type
                "2024-05-16",  // BirthDate
                3,  // Age
                "123456789",  // ChipNumber
                "Labrador",  // Breed
                "Brown",  // Color
                "Young",  // AgeCategory
                "Type A",  // BloodType
                1.2f,  // Length
                15.5f,  // Weight
                1L,  // UserId
                1L// ClinicId
        );

        // Mock kullanıcı ve kayıt
        User mockUser = mock(User.class);
        when(userService.getUserById(Long.valueOf(1L))).thenReturn(mockUser);

        // Kaydedilen hayvan
        Animal savedAnimal = new Animal();
        savedAnimal.setId(Long.valueOf(1L)); // Varsayılan olarak bir ID atayalım
        when(animalRepository.save(any(Animal.class))).thenReturn(savedAnimal);

        // Metodu çağır
        AnimalDto animalDto = animalService.createAnimal(request);

        // Doğrulamaları yap
        assertNotNull(animalDto); // Dönüş değerinin null olmadığını kontrol et
        assertEquals(1L, animalDto.id()); // Oluşturulan hayvanın ID'sini kontrol et
        verify(userService).getUserById(Long.valueOf(1L)); // userService.getUserById() metodunun çağrıldığını doğrula
        verify(animalRepository).save(any(Animal.class)); // animalRepository.save() metodunun çağrıldığını doğrula
    }
    @Test
    void testFindAnimalById() {
        // ID'ye göre hayvan bulma işlemini test et
        when(animalRepository.findById(Long.valueOf(anyLong()))).thenReturn(Optional.of(mock(Animal.class)));

        AnimalDto animalDto = animalService.findAnimalById(Long.valueOf(1L));

        verify(animalRepository).findById(Long.valueOf(1L));
        assertNotNull(animalDto); // İstenirse daha fazla doğrulama yapılabilir
    }

    @Test
    void testGetAllAnimals() {
        // Tüm hayvanları alma işlemini test et
        when(animalRepository.findAll()).thenReturn(List.of(mock(Animal.class), mock(Animal.class)));

        List<AnimalDto> animals = animalService.getAllAnimals();

        verify(animalRepository).findAll();
        assertNotNull(animals); // İstenirse daha fazla doğrulama yapılabilir
        assertEquals(2, animals.size());
    }



    @Test
    void testDeleteAnimalById() {
        // ID'ye göre hayvan silme işlemini test et
        doNothing().when(animalRepository).deleteById(Long.valueOf(anyLong()));

        assertDoesNotThrow(() -> animalService.deleteAnimalById(Long.valueOf(1L)));
        verify(animalRepository).deleteById(Long.valueOf(1L));
    }

    @Test
    void testGetAnimalByChipNumber() {
        // Çip numarasına göre hayvanı alma işlemini test et
        when(animalRepository.findAnimalByChipNumber(anyString())).thenReturn(mock(Animal.class));

        AnimalDto animalDto = animalService.getAnimalByChipNumber("123456789");

        verify(animalRepository).findAnimalByChipNumber("123456789");
        assertNotNull(animalDto); // İstenirse daha fazla doğrulama yapılabilir
    }

    @Test
    void testGetAnimalsByUserId() {
        // Kullanıcı kimliğine göre hayvanları alma işlemini test et
        when(animalRepository.findAnimalByUserId(Long.valueOf(anyLong()))).thenReturn(List.of(mock(Animal.class), mock(Animal.class)));

        List<AnimalDto> animals = animalService.getAnimalsByUserId(Long.valueOf(1L));

        verify(animalRepository).findAnimalByUserId(Long.valueOf(1L));
        assertNotNull(animals); // İstenirse daha fazla doğrulama yapılabilir
        assertEquals(2, animals.size());
    }



}
