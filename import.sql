--usage: sqlite3 sql/eusebian-canons.db ".read import.sql"


-- First get the sections
DROP TABLE IF EXISTS sections;
CREATE TABLE sections ( book TEXT, sectionNumber INTEGER, reference TEXT, from_reference TEXT, to_reference TEXT, from_sblgnt INTEGER, to_sblgnt INTEGER, greek TEXT );

CREATE TEMP TABLE _section_import ( sectionNumber INTEGER, canons TEXT, reference TEXT, from_reference TEXT, to_reference TEXT, from_sblgnt INTEGER, to_sblgnt INTEGER );

.separator "\t"

.import data/MAT-sections-aligned.txt _section_import
INSERT INTO sections ( book, sectionNumber, reference, from_reference, to_reference, from_sblgnt, to_sblgnt ) SELECT 'MAT', sectionNumber, reference, from_reference, to_reference, from_sblgnt, to_sblgnt FROM _section_import;
DELETE FROM _section_import;

.import data/MRK-sections-aligned.txt _section_import
INSERT INTO sections ( book, sectionNumber, reference, from_reference, to_reference, from_sblgnt, to_sblgnt ) SELECT 'MRK', sectionNumber, reference, from_reference, to_reference, from_sblgnt, to_sblgnt FROM _section_import;
DELETE FROM _section_import;

.import data/LUK-sections-aligned.txt _section_import
INSERT INTO sections ( book, sectionNumber, reference, from_reference, to_reference, from_sblgnt, to_sblgnt ) SELECT 'LUK', sectionNumber, reference, from_reference, to_reference, from_sblgnt, to_sblgnt FROM _section_import;
DELETE FROM _section_import;

.import data/JHN-sections-aligned.txt _section_import
INSERT INTO sections ( book, sectionNumber, reference, from_reference, to_reference, from_sblgnt, to_sblgnt ) SELECT 'JHN', sectionNumber, reference, from_reference, to_reference, from_sblgnt, to_sblgnt FROM _section_import;
DELETE FROM _section_import;

-- Add the Greek Text
ATTACH '../sblgnt-to-sqlite/sblgnt.db' AS sblgnt;
UPDATE sections SET greek=(SELECT group_concat(punctuated_text,' ') FROM sblgnt.sblgnt WHERE _id >= from_sblgnt AND _id <= to_sblgnt);
-- ATTACH "C:\Users\Adam\Documents\Computational Bible\sblgnt-to-sqlite\sblgnt.db" AS sblgnt;

-- Next get the canons

DROP TABLE IF EXISTS canon1;
DROP TABLE IF EXISTS canon2;
DROP TABLE IF EXISTS canon3;
DROP TABLE IF EXISTS canon4;
DROP TABLE IF EXISTS canon5;
DROP TABLE IF EXISTS canon6;
DROP TABLE IF EXISTS canon7;
DROP TABLE IF EXISTS canon8;
DROP TABLE IF EXISTS canon9;
DROP TABLE IF EXISTS canon10;
DROP TABLE IF EXISTS canon11;
DROP TABLE IF EXISTS canon12;
DROP TABLE IF EXISTS canon13;

CREATE TABLE canon1 ( MAT INTEGER, MRK INTEGER, LUK INTEGER, JHN INTEGER );
.import --skip 1 data/canon-1.txt canon1

CREATE TABLE canon2 ( MAT INTEGER, MRK INTEGER, LUK INTEGER );
.import --skip 1 data/canon-2.txt canon2

CREATE TABLE canon3 ( MAT INTEGER, LUK INTEGER, JHN INTEGER );
.import --skip 1 data/canon-3.txt canon3

CREATE TABLE canon4 ( MAT INTEGER, MRK INTEGER, JHN INTEGER );
.import --skip 1 data/canon-4.txt canon4

CREATE TABLE canon5 ( MAT INTEGER, LUK INTEGER );
.import --skip 1 data/canon-5.txt canon5

CREATE TABLE canon6 ( MAT INTEGER, MRK INTEGER );
.import --skip 1 data/canon-6.txt canon6

CREATE TABLE canon7 ( MAT INTEGER, JHN INTEGER );
.import --skip 1 data/canon-7.txt canon7

CREATE TABLE canon8 ( LUK INTEGER, MRK INTEGER );
.import --skip 1 data/canon-8.txt canon8

CREATE TABLE canon9 ( LUK INTEGER, JHN INTEGER );
.import --skip 1 data/canon-9.txt canon9

CREATE TABLE canon10 ( MAT INTEGER );
.import --skip 1 data/canon-10.txt canon10

CREATE TABLE canon11 ( MRK INTEGER );
.import --skip 1 data/canon-11.txt canon11

CREATE TABLE canon12 ( LUK INTEGER );
.import --skip 1 data/canon-12.txt canon12

CREATE TABLE canon13 ( JHN INTEGER );
.import --skip 1 data/canon-13.txt canon13

DROP TABLE IF EXISTS canons;
CREATE TABLE canons ( MAT INTEGER, MRK INTEGER, LUK INTEGER, JHN INTEGER, canon INTEGER );
INSERT INTO canons ( MAT, MRK, LUK, JHN, canon ) SELECT MAT, MRK, LUK, JHN,1 FROM canon1;
INSERT INTO canons ( MAT, MRK, LUK, JHN, canon ) SELECT MAT, MRK, LUK, NULL,2 FROM canon2;
INSERT INTO canons ( MAT, MRK, LUK, JHN, canon ) SELECT MAT, NULL, LUK, JHN,3 FROM canon3;
INSERT INTO canons ( MAT, MRK, LUK, JHN, canon ) SELECT MAT, MRK, NULL, JHN,4 FROM canon4;
INSERT INTO canons ( MAT, MRK, LUK, JHN, canon ) SELECT MAT, NULL, LUK, NULL,5 FROM canon5;
INSERT INTO canons ( MAT, MRK, LUK, JHN, canon ) SELECT MAT, MRK, NULL, NULL,6 FROM canon6;
INSERT INTO canons ( MAT, MRK, LUK, JHN, canon ) SELECT MAT, NULL, NULL, JHN,7 FROM canon7;
INSERT INTO canons ( MAT, MRK, LUK, JHN, canon ) SELECT NULL, MRK, LUK, NULL,8 FROM canon8;
INSERT INTO canons ( MAT, MRK, LUK, JHN, canon ) SELECT NULL, NULL, LUK, JHN,9 FROM canon9;
INSERT INTO canons ( MAT, MRK, LUK, JHN, canon ) SELECT MAT, NULL, NULL, NULL,10 FROM canon10;
INSERT INTO canons ( MAT, MRK, LUK, JHN, canon ) SELECT NULL, MRK, NULL, NULL,11 FROM canon11;
INSERT INTO canons ( MAT, MRK, LUK, JHN, canon ) SELECT NULL, NULL, LUK, NULL,12 FROM canon12;
INSERT INTO canons ( MAT, MRK, LUK, JHN, canon ) SELECT NULL, NULL, NULL, JHN,13 FROM canon13;

-- JSON

.mode json

.once json/canon1.json
SELECT * from canon1;

.once json/canon2.json
SELECT * from canon2;

.once json/canon3.json
SELECT * from canon3;

.once json/canon4.json
SELECT * from canon4;

.once json/canon5.json
SELECT * from canon5;

.once json/canon6.json
SELECT * from canon6;

.once json/canon7.json
SELECT * from canon7;

.once json/canon8.json
SELECT * from canon9;

.once json/canon10.json
SELECT * from canon1;

.once json/canon11.json
SELECT * from canon1;

.once json/canon12.json
SELECT * from canon2;

.once json/canon13.json
SELECT * from canon3;

.once json/sections-sql.json
SELECT * from sections;

.once json/canons.json
SELECT * from canons;
