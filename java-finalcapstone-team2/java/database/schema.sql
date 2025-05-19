BEGIN TRANSACTION;

DROP TABLE IF EXISTS user_games;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tests CASCADE;
DROP TABLE IF EXISTS wishlist CASCADE;
DROP TABLE IF EXISTS playing CASCADE;
DROP TABLE IF EXISTS finished CASCADE;



CREATE TABLE users (
    user_id SERIAL,
    username varchar(50) NOT NULL UNIQUE,
    password_hash varchar(200) NOT NULL,
    role varchar(50) NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (user_id)
);

CREATE TABLE games (
    game_id SERIAL,
    api_id integer NOT NULL,
    name varchar(200) NOT NULL,
    image_url text NOT NULL,
    avg_rating decimal(3,1),
    CONSTRAINT pk_game PRIMARY KEY (game_id)
);

CREATE TABLE user_games (
    user_game_id SERIAL,
    user_id integer NOT NULL,
    game_id integer NOT NULL,
    star_rating integer NULL CHECK (star_rating BETWEEN 1 AND 5),
    CONSTRAINT pk_user_game PRIMARY KEY (user_game_id),
    CONSTRAINT fk_user_game_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_user_game_game FOREIGN KEY (game_id) REFERENCES games(game_id),
    CONSTRAINT uq_user_game UNIQUE (user_id, game_id)
);
CREATE TABLE user_reviews (
    user_review_id SERIAL,
    user_id integer NOT NULL,
    game_id integer NOT NULL,
    review_text varchar NULL,
    CONSTRAINT pk_user_reviews PRIMARY KEY (user_review_id),
    CONSTRAINT fk_user_reviews_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_user_reviews_game FOREIGN KEY (game_id) REFERENCES games(game_id),
    CONSTRAINT uq_user_review UNIQUE (user_id, game_id)
);

CREATE TABLE IF NOT EXISTS tests (
    test_id SERIAL PRIMARY KEY,
    user_id INT,
    api_id INT NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE wishlist (
    wishlist_id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users (user_id),
	game_id INTEGER REFERENCES games(game_id),
	UNIQUE (user_id, game_id)
);
CREATE TABLE playing (
    playing_id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users (user_id),
	game_id INTEGER REFERENCES games(game_id),
	UNIQUE (user_id, game_id)
);
CREATE TABLE finished (
    finished_id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users (user_id),
	game_id INTEGER REFERENCES games(game_id),
	UNIQUE (user_id, game_id)
);
commit;

