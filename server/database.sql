create TABLE author
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

create TABLE author_album
(
    author_id INTEGER NOT NULL,
    FOREIGN KEY (author_id) REFERENCES author (id),
    album_id  INTEGER NOT NULL,
    FOREIGN KEY (album_id) REFERENCES album (id)
);

create TABLE author_track
(
    author_id INTEGER NOT NULL,
    FOREIGN KEY (author_id) REFERENCES author (id),
    track_id  INTEGER NOT NULL,
    FOREIGN KEY (track_id) REFERENCES track (id)
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



