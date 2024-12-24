CREATE DATABASE healthcareDB;

USE healthcareDB;

-- PATIENT TABLE FOR STORING ALL THE PATIENT RECORDS
CREATE TABLE PATIENTS (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
	surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    age INT NOT NULL,
    address TEXT NOT NULL,
    gender ENUM('male', 'female', 'other', 'prefer not to say') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NOT SURE IF I SHOULD KEEP IT FOR USER LOGIN?
-- STORES THE USER CREDENTIALS
CREATE TABLE USERS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,  -- Unique username for login
    email VARCHAR(255) NOT NULL UNIQUE,     -- Unique email for login
    password VARCHAR(255) NOT NULL,         -- Hashed password
    role ENUM('admin', 'doctor', 'patient') DEFAULT 'patient', -- Role of the user
	is_active BOOLEAN DEFAULT TRUE,        -- To activate/deactivate users
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Record creation time
);

-- APPOINTMENTS TABLE FOR BOOKING APPOINTMENTS
CREATE TABLE APPOINTMENTS (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL, -- Foreign key to patients table
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) 
);

-- MEDICAL_RECORDS TABLE FOR STORING AND RETRIEVING MEDICAL RECORDS
CREATE TABLE MEDICAL_RECORDS (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL, -- Foreign key to patients table
    diagnosis TEXT NOT NULL,
    prescription TEXT NOT NULL,
    visit_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) 
);




