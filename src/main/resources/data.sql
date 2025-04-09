CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imie VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS scores (
    id_score INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    game VARCHAR(255),
    score INT,
    score_date DATE,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);
INSERT INTO users (imie, email)
SELECT 'Sebastian', 'sebastian@example.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE imie = 'Sebastian' AND email = 'sebastian@example.com');

INSERT INTO users (imie, email)
SELECT 'Anna', 'anna@example.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE imie = 'Anna' AND email = 'anna@example.com');

INSERT INTO users (imie, email)
SELECT 'Tomasz', 'tomasz@example.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE imie = 'Tomasz' AND email = 'tomasz@example.com');
