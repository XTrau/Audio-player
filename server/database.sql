create TABLE IF NOT EXISTS artist
(
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

create TABLE IF NOT EXISTS album
(
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

create TABLE IF NOT EXISTS track
(
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    audio_url VARCHAR(255) NOT NULL,
    album_id  INTEGER      NOT NULL,
    FOREIGN KEY (album_id) REFERENCES album (id)
);

create TABLE IF NOT EXISTS artist_album
(
    artist_id INTEGER NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artist (id),
    album_id  INTEGER NOT NULL,
    FOREIGN KEY (album_id) REFERENCES album (id)
);

create TABLE IF NOT EXISTS artist_track
(
    artist_id INTEGER NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artist (id),
    track_id  INTEGER NOT NULL,
    FOREIGN KEY (track_id) REFERENCES track (id)
);

create TABLE IF NOT EXISTS users
(
    id        SERIAL PRIMARY KEY,
    email     VARCHAR(255) NOT NULL UNIQUE,
    password  VARCHAR(255) NOT NULL,
    username  VARCHAR(255) NOT NULL UNIQUE,
    activated BOOLEAN DEFAULT FALSE,
    artist_id INTEGER UNIQUE,
    FOREIGN KEY (artist_id) REFERENCES artist (id)
);

