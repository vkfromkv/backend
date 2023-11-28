-- user_credentials table
CREATE TABLE user_credentials (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);

-- user_profile table
CREATE TABLE user_profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    preferred_instrument VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255),
    is_artist BOOLEAN,
    created_on DATE NOT NULL,
    created_by INT NOT NULL,
    modified_by INT,
    modified_on DATE,
    FOREIGN KEY (created_by) REFERENCES user_profile(id),
    FOREIGN KEY (modified_by) REFERENCES user_profile(id)
);

-- instrument_category table
CREATE TABLE instrument_category (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    created_on DATE NOT NULL,
    created_by INT NOT NULL,
    modified_by INT,
    modified_on DATE,
    FOREIGN KEY (created_by) REFERENCES user_profile(id),
    FOREIGN KEY (modified_by) REFERENCES user_profile(id)
);

-- instruments table
CREATE TABLE instruments (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    type VARCHAR(255),
    category INT,
    created_on DATE NOT NULL,
    created_by INT NOT NULL,
    modified_by INT,
    modified_on DATE,
    FOREIGN KEY (category) REFERENCES instrument_category(id),
    FOREIGN KEY (created_by) REFERENCES user_profile(id),
    FOREIGN KEY (modified_by) REFERENCES user_profile(id)
);

-- user_skill_level table
CREATE TABLE user_skill_level (
    user_id INT,
    instrument_id INT,
    skill_level VARCHAR(255),
    created_on DATE NOT NULL,
    created_by INT NOT NULL,
    modified_by INT,
    modified_on DATE,
    PRIMARY KEY (user_id, instrument_id),
    FOREIGN KEY (user_id) REFERENCES user_profile(id),
    FOREIGN KEY (instrument_id) REFERENCES instruments(id),
    FOREIGN KEY (created_by) REFERENCES user_profile(id),
    FOREIGN KEY (modified_by) REFERENCES user_profile(id)
);

-- gear_owned table
CREATE TABLE gear_owned (
    manufacturer VARCHAR(255),
    model VARCHAR(255),
    category INT,
    user_id INT,
    created_on DATE NOT NULL,
    created_by INT NOT NULL,
    modified_by INT,
    modified_on DATE,
    FOREIGN KEY (category) REFERENCES instrument_category(id),
    FOREIGN KEY (user_id) REFERENCES user_profile(id),
    FOREIGN KEY (created_by) REFERENCES user_profile(id),
    FOREIGN KEY (modified_by) REFERENCES user_profile(id)
);

-- lyrics table
CREATE TABLE lyrics (
    id SERIAL PRIMARY KEY,
    lyrics TEXT,
    lyrics_with_chords TEXT,
    created_on DATE NOT NULL,
    created_by INT NOT NULL,
    modified_by INT,
    modified_on DATE,
    FOREIGN KEY (created_by) REFERENCES user_profile(id),
    FOREIGN KEY (modified_by) REFERENCES user_profile(id)
);

-- songs table
CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    artist VARCHAR(255),
    tuning VARCHAR(255),
    song_key VARCHAR(255),
    capo_position INT,
    published_by INT,
    time_signature VARCHAR(255),
    tempo INT,
    preferred_instrument INT,
    created_on DATE NOT NULL,
    created_by INT NOT NULL,
    modified_by INT,
    modified_on DATE,
    FOREIGN KEY (published_by) REFERENCES user_profile(id),
    FOREIGN KEY (preferred_instrument) REFERENCES instrument_category(id),
    FOREIGN KEY (created_by) REFERENCES user_profile(id),
    FOREIGN KEY (modified_by) REFERENCES user_profile(id),
    lyrics_id INT,
    FOREIGN KEY (lyrics_id) REFERENCES lyrics(id)
);
