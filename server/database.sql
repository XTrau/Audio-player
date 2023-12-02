create TABLE artist
(
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

create TABLE album
(
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

create TABLE track
(
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    audio_url VARCHAR(255) NOT NULL,
    album_id  INTEGER      NOT NULL,
    FOREIGN KEY (album_id) REFERENCES album (id)
);

create TABLE artist_album
(
    artist_id INTEGER NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artist (id),
    album_id  INTEGER NOT NULL,
    FOREIGN KEY (album_id) REFERENCES album (id)
);

create TABLE artist_track
(
    artist_id INTEGER NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artist (id),
    track_id  INTEGER NOT NULL,
    FOREIGN KEY (track_id) REFERENCES track (id)
);


