CREATE DATABASE potensi

CREATE TABLE participant (
  p_id BIGSERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  password TEXT
);

CREATE TABLE questions (
  q_id BIGSERIAL NOT NULL PRIMARY KEY,
  question TEXT NOT NULL,
  question_type TEXT NOT NULL
);

CREATE TABLE choices (
  c_id BIGSERIAL NOT NULL PRIMARY KEY,
  choice TEXT NOT NULL, 
  is_correct BOOL,
  question_id BIGINT REFERENCES questions (q_id)
);

CREATE TABLE participant_answer (
  pa_id BIGSERIAL NOT NULL PRIMARY KEY,
  participant_id BIGINT REFERENCES participant (p_id),
  question_id BIGINT REFERENCES questions (q_id),
  answer BOOL
);





