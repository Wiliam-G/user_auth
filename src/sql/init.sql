CREATE DATABASE IF NOT EXISTS auth;
CREATE TABLE IF NOT EXISTS application_user(
    uuid VARCHAR(36) DEFAULT(uuid()) NOT NULL PRIMARY KEY,
    username VARCHAR(16) NOT NULL,
    password VARBINARY(255) NOT NULL;
)

INSERT INTO application_user (username, password) values ("admin", AES_ENCRYPT("admin", "secret"));