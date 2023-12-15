CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

/* CREATE TABLE users */
CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(120) NOT NULL,
    name VARCHAR(60) DEFAULT NULL,
    last_name VARCHAR(60) DEFAULT NULL,
    role CHAR(3) NOT NULL,
    mobile VARCHAR(10) NOT NULL,
    phone VARCHAR(7) NULL,
    date_birth DATE NULL,
    genre CHAR(1) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);

/* INSERT USER ADMIN */
-- User : admin@admin.com -- Password : admin
INSERT INTO users (email, password, name, last_name, role, mobile, date_birth, genre)
VALUES('admin@admin.com', '$2a$10$57Be70qa6l9P7183MY0SbuOZBinWXb4gHKIpcOJT/sVQtpX.22Qbe', 'ADMIN', 'ADMIN', 'ADM', '3013686789', '1994-01-13', 'M');