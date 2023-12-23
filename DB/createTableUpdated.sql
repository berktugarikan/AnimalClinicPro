DROP DATABASE IF EXISTS veterinary_clinic;
CREATE DATABASE veterinary_clinic;
USE veterinary_clinic;



CREATE TABLE Permissions(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Permission_Name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Users (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    User_Name VARCHAR(255) NOT NULL,
    Surname VARCHAR(255) NOT NULL,
    Username VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Phone_Number VARCHAR(15) UNIQUE NOT NULL,
    Authorization_ID INT,
    FOREIGN KEY (Authorization_ID) REFERENCES Permissions(ID)
);

CREATE TABLE Clinics (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Clinic_Name VARCHAR(255) NOT NULL,
    City VARCHAR(255) NOT NULL,
    District VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    Authorized_Name VARCHAR(255) NOT NULL,
    Authorized_Surname VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Phone_Number VARCHAR(15),
    Password VARCHAR(255) NOT NULL
);
CREATE TABLE Customer_Users (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    User_ID INT UNIQUE NOT NULL,
    Clinic_ID INT,
    FOREIGN KEY (User_ID) REFERENCES Users(ID),
    FOREIGN KEY (Clinic_ID) REFERENCES Clinics(ID)
);

CREATE TABLE Veterinarian_Users (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    User_ID INT UNIQUE NOT NULL,
    Clinic_ID INT,
    FOREIGN KEY (User_ID) REFERENCES Users(ID),
    FOREIGN KEY (Clinic_ID) REFERENCES Clinics(ID)
);


CREATE TABLE Animal_Types (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Animal_Type VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE Breeds (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Breed_Name VARCHAR(255) UNIQUE NOT NULL,
    Animal_Type_ID INT,
    FOREIGN KEY (Animal_Type_ID) REFERENCES Animal_Types(ID)
);

CREATE TABLE Animals (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Type_ID INT,
    Gender ENUM('Male', 'Female', 'Other') NOT NULL,
    Birth_Date DATE NOT NULL,
    Age INT,
    Weight DECIMAL(5,2),
    Chip_Number VARCHAR(20) UNIQUE NOT NULL,
    Breed_ID INT,
    Color VARCHAR(50),
    Age_Category VARCHAR(20),
    Blood_Type ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Other') NOT NULL,
    Length DECIMAL(5,2),
    Owner_ID INT,
    FOREIGN KEY (Type_ID) REFERENCES Animal_Types(ID),
    FOREIGN KEY (Breed_ID) REFERENCES Breeds(ID),
    FOREIGN KEY (Owner_ID) REFERENCES Customer_Users(ID)
);



CREATE TABLE Appointments (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Customer_ID INT,
    Veterinarian_ID INT,
    Animal_ID INT,
    Appointment_Date DATE NOT NULL,
    Appointment_Time TIME NOT NULL,
    Appointment_Type ENUM('Checkup', 'Vaccination', 'Surgery', 'Consultation', 'Emergency') NOT NULL,
    Appointment_Description TEXT,
    Status ENUM('Pending', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Pending',
    FOREIGN KEY (Customer_ID) REFERENCES Customer_Users(ID),
    FOREIGN KEY (Veterinarian_ID) REFERENCES Veterinarian_Users(ID),
    FOREIGN KEY (Animal_ID) REFERENCES Animals(ID)
);

CREATE TABLE Vaccination_Types (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Type_Name VARCHAR(255) UNIQUE NOT NULL,
    Animal_Type_ID INT,
    Frequency INT NOT NULL,
    FOREIGN KEY (Animal_Type_ID) REFERENCES Animal_Types(ID)
);

CREATE TABLE Vaccinations (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Animal_ID INT,
    Vaccination_Type_ID INT,
    Vaccination_Date DATE NOT NULL,
    Vaccination_Status ENUM('Pending', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Pending',
    Vaccination_Description TEXT,
    Veterinarian_ID INT,
    Customer_ID INT,
    FOREIGN KEY (Animal_ID) REFERENCES Animals(ID),
    FOREIGN KEY (Vaccination_Type_ID) REFERENCES Vaccination_Types(ID),
    FOREIGN KEY (Veterinarian_ID) REFERENCES Veterinarian_Users(ID),
    FOREIGN KEY (Customer_ID) REFERENCES Customer_Users(ID)
);


CREATE TABLE Lab_Test_Types (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Test_Type_Name VARCHAR(255) UNIQUE NOT NULL,
    Animal_Type_ID INT,
    FOREIGN KEY (Animal_Type_ID) REFERENCES Animal_Types(ID)
);


CREATE TABLE Lab_Tests (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Animal_ID INT,
    Test_Type_ID INT,
    Test_Date DATE NOT NULL,
    Test_Status ENUM('Pending', 'Completed', 'Cancelled') NOT NULL,
    Test_Description TEXT,
    Veterinarian_ID INT,
    Customer_ID INT,
    FOREIGN KEY (Animal_ID) REFERENCES Animals(ID),
    FOREIGN KEY (Test_Type_ID) REFERENCES Lab_Test_Types(ID),
    FOREIGN KEY (Veterinarian_ID) REFERENCES Veterinarian_Users(ID),
    FOREIGN KEY (Customer_ID) REFERENCES Customer_Users(ID)
);


CREATE TABLE Clinic_Products (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Product_Name VARCHAR(255) NOT NULL,
    Price DECIMAL(8,2) NOT NULL,
    Stock_Quantity INT NOT NULL,
    Clinic_ID INT,
    FOREIGN KEY (Clinic_ID) REFERENCES Clinics(ID)
);

CREATE TABLE Customer_Purchases (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Customer_ID INT,
    Clinic_Product_ID INT,
    Purchase_Date DATE NOT NULL,
    Quantity INT NOT NULL,
    Total_Price DECIMAL(8,2) NOT NULL,
    Payment_Date DATE NOT NULL,
    Payment_Amount DECIMAL(8,2) NOT NULL,
    Payment_Method VARCHAR(50) NOT NULL,
    FOREIGN KEY (Customer_ID) REFERENCES Customer_Users(ID),
    FOREIGN KEY (Clinic_Product_ID) REFERENCES Clinic_Products(ID)
);

CREATE TABLE Educational_Resources (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Animal_Type_ID INT,
    Title VARCHAR(255) NOT NULL,
    Content TEXT NOT NULL,
    FOREIGN KEY (Animal_Type_ID) REFERENCES Animal_Types(ID)
);
