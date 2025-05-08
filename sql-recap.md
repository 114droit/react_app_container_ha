# Datenbank-Schema

## 1. Tabelle (questions)

| id (INTEGER) | content (VARCHAR) |
| ------------ | ----------------- |
| 1 | abc? |
| 2 | def? |

id = PK

## 2. Tabelle (answers)

| id (INTEGER) | content (VARCHAR) | correct (BOOLEAN) | questions_id (INTEGER) |
| ------------ | ----------------- | ----------------- | ---------------------- |
| 1 | abc! | true | 1 |
| 2 | def! | false | 1 |
| 3 | ghi! | false | 1 |
| 4 | jkl! | false | 1 |

id = PK, questions_id = FK

## Grundlegende SQL-Abfragen

INSERT INTO questions (id, content) VALUES (1, 'abc?');

INSERT INTO answers (id, content, correct, questions_id) VALUES (1, 'abc!', true, 1);

INSERT INTO answers (id, content, correct, questions_id) VALUES (2, 'def!', false, 1);

SELECT * FROM questions;

SELECT * FROM answers;

SELECT id, content FROM questions WHERE id = 1;

SELECT id, content, correct, questions_id FROM answers WHERE id = 1;

SELECT * FROM answers WHERE questions_id = 1;

UPDATE answers SET content = 'def!' WHERE id = 1;

DELETE FROM questions WHERE id = 1;

## Reflexion