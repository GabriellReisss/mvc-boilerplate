CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS height (
    height_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    value FLOAT NOT NULL,
    entry_date DATE DEFAULT CURRENT_DATE,
    CONSTRAINT user_height_fk FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS weight (
    weight_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    value FLOAT NOT NULL,
    entry_date DATE DEFAULT CURRENT_DATE,
    CONSTRAINT user_weight_fk FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bmi (
    bmi_id SERIAL PRIMARY KEY,
    height_id INTEGER,
    weight_id INTEGER,
    value FLOAT NOT NULL,
    measure_date DATE DEFAULT CURRENT_DATE,
    CONSTRAINT bmi_height_id_fk FOREIGN KEY (height_id) REFERENCES height (height_id) ON DELETE CASCADE,
    CONSTRAINT bmi_weight_id_fk FOREIGN KEY (weight_id) REFERENCES weight (weight_id) ON DELETE CASCADE
);