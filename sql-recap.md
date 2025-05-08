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

* INSERT INTO questions (id, content) VALUES (1, 'abc?');

* INSERT INTO answers (id, content, correct, questions_id) VALUES (1, 'abc!', true, 1);

* INSERT INTO answers (id, content, correct, questions_id) VALUES (2, 'def!', false, 1);

* SELECT * FROM questions;

* SELECT * FROM answers;

* SELECT id, content FROM questions WHERE id = 1;

* SELECT id, content, correct, questions_id FROM answers WHERE id = 1;

* SELECT * FROM answers WHERE questions_id = 1;

* UPDATE answers SET content = 'def!' WHERE id = 1;

* DELETE FROM questions WHERE id = 1;

## Reflexion

### **Warum ist die Speicherung von Anwendungsdaten in einer strukturierten Datenbank (mit Tabellen, Spalten, Datentypen, Schlüsseln) besser als die einfache Speicherung in einer JSON-Datei auf dem Dateisystem, wie wir sie in der vorherigen Aufgabe umgesetzt haben? Nenne mindestens drei Vorteile.**

> Datenbanken ermöglichen eine effizientere Datenverwaltung, verbesserte Skalierbarkeit und größere Flexibilität beim Abfragen und Modifizieren von Daten.

>* 1. Effizientere Datenverwaltung

>* 2. Verbesserte Skalierbarkeit

>* 3. Flexibilität beim Abfragen und Modifizieren

### **Was ist der Hauptzweck eines Primärschlüssels in einer Tabelle, und wie hast du dieses Konzept in deinem Entwurf umgesetzt?**

> Primäschlüssel identifizieren jede Zeile einer Tabelle eindeutig. In meinen Tabellen habe ich dem Primärschlüssel eine Spalte (id) gegeben und in vorm von einer ganzen Zahl (INTEGER) dargestellt.

### **(Falls du einen Fremdschlüssel entworfen hast): Was ist der Zweck eines Fremdschlüssels und welche Beziehung modelliert dein Fremdschlüssel?**



### **Wie würden die API-Endpunkte deiner Backend-Anwendung (GET /items, GET /items/:id, POST /items, DELETE /items/:id) theoretisch auf die von dir formulierten SQL-Abfragen abgebildet werden? Welche Art von Abfrage (SELECT, INSERT, UPDATE, DELETE) würde jeder Endpunkt typischerweise ausführen?**

### **Warum ist die Nutzung einer Datenbank für persistente Daten wichtig im Kontext von containerisierten Anwendungen und DevOps?**