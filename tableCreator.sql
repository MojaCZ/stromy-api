-- *********************** user *********************
DROP TABLE IF EXISTS user;

CREATE TABLE IF NOT EXISTS user (
  id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  tel VARCHAR(50),
  admin BIT,
  PRIMARY KEY(id),
  UNIQUE INDEX email_UNIQUE (email ASC),
  UNIQUE INDEX id_UNIQUE (id ASC),
  UNIQUE INDEX name_UNIQUE (name ASC)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- **************** strom ********************
DROP TABLE IF EXISTS lokal;
DROP TABLE IF EXISTS pisemne_d;
DROP TABLE IF EXISTS obrazove_d;
DROP TABLE IF EXISTS kateg;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS ohro;
DROP TABLE IF EXISTS strom;

CREATE TABLE IF NOT EXISTS strom (
  strom_id INT(10) UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
  IDEX INT(10) UNSIGNED,
  NAME VARCHAR(50) UNIQUE,
  TYP_OBJ VARCHAR(50) NOT NULL,
  DATIN DATETIME NOT NULL,
  DATAK DATETIME,
  DATVY DATETIME,
  VLAST ENUM('RVSCR', 'PAMSTR', 'NPUST', 'PARTN', 'APPVS') NOT NULL,
  EXURL VARCHAR(255),
  IDNAZ VARCHAR(50),
  PRIJEM INT(1) NOT NULL,
  PRIMARY KEY (strom_id)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ************************** lokal *******************
CREATE TABLE IF NOT EXISTS lokal (
  strom_id INT(10) UNSIGNED UNIQUE NOT NULL,
  LON FLOAT UNSIGNED NOT NULL,
  LAT FLOAT UNSIGNED NOT NULL,
  FOREIGN KEY (strom_id) REFERENCES strom (strom_id) ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- *********************** pisemne_d ***********************
CREATE TABLE IF NOT EXISTS pisemne_d (
  strom_id INT(10) UNSIGNED UNIQUE NOT NULL,
  URL VARCHAR(255) NOT NULL,
  FOREIGN KEY (strom_id) REFERENCES strom (strom_id) ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- *********************** obrazove_d *************************
CREATE TABLE IF NOT EXISTS obrazove_d (
  strom_id INT(10) UNSIGNED UNIQUE NOT NULL,
  URL VARCHAR(255) NOT NULL,
  FOREIGN KEY (strom_id) REFERENCES strom (strom_id) ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ************************** kateg ***************************
CREATE TABLE IF NOT EXISTS kateg (
  strom_id INT(10) UNSIGNED UNIQUE NOT NULL,
  KATEG1 VARCHAR(50),
  KATEG2 VARCHAR(50),
  KATEG3 VARCHAR(50),
  KATEG4 VARCHAR(50),
  KATEG5 VARCHAR(50),
  FOREIGN KEY (strom_id) REFERENCES strom (strom_id) ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ***************************** ohro ***********************
CREATE TABLE IF NOT EXISTS ohro (
  strom_id INT(10) UNSIGNED UNIQUE NOT NULL,
  OHRO1 VARCHAR(50),
  OHRO2 VARCHAR(50),
  OHRO3 VARCHAR(50),
  OHRO4 VARCHAR(50),
  OHRO5 VARCHAR(50),
  FOREIGN KEY (strom_id) REFERENCES strom (strom_id) ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ****************************** comment *******************
CREATE TABLE IF NOT EXISTS comment (
  strom_id INT(10) UNSIGNED UNIQUE NOT NULL,
  COM_U TEXT NOT NULL,
  COM_A TEXT NOT NULL,
  FOREIGN KEY (strom_id) REFERENCES strom (strom_id) ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;



-- ****************************** example inserting user **************************
INSERT INTO user (name, email, password, tel, admin) VALUES ('petr', 'petr@seznam.cz', 'somePW', '775486955', b'0');

-- new tree
INSERT INTO 
strom (strom_id, IDEX, NAME, TYP_OBJ, DATIN, DATAK, DATVY, VLAST, EXURL, IDNAZ, PRIJEM) 
VALUES (NULL, NULL, NULL, 'strom', '13.5.2015', NULL, NULL, 'APPVS', NULL, NULL, '0');
SELECT LAST_INSERT_ID();

-- lokal
INSERT INTO lokal (strom_id, LON, LAT) VALUES ('1', 49.951220, 14.538983); 
SELECT * FROM lokal WHERE strom_id=1;

-- pisemne_d
INSERT INTO pisemne_d (strom_id, URL) VALUES ('1', 'http://...');
SELECT * FEOM pisemne_d WHERE strom_id=1;

-- obrazove_d
INSERT INTO obrazove_d (strom_id, URL) VALUES ('1', 'http://...');
SELECT * FROM obrazove_d WHERE strom_id=1;

-- kateg
INSERT INTO kateg (strom_id, KATEG1, KATEG2, KATEG3, KATEG4, KATEG5) VALUES ('1','1, 1, 2, 0, 0, 0, 3', ' 0, 0, 3', ' 0, 3', '2, 0, 0, 0, 3', '1, 1, 2, 0, 0');
SELECT * FROM kateg WHERE strom_id=1;

-- ohro
INSERT INTO ohro (strom_id, OHRO1, OHRO2, OHRO3, OHRO4, OHRO5) VALUES ('1', 'A,C', 'A,C', '', 'B', 'D');
SELECT * FROM ohro WHERE strom_id=1;

-- comment
INSERT INTO comment (strom_id, COM_A, COM_U) VALUES ('1', "toto je nejaký komentář od administrátora", 'toto je nějaký komentář od normálního uživatele');
SELECT * FROM comment WHERE strom_id=1;


INSERT INTO strom (strom_id, TYP_OBJ, DATIN, VLAST, PRIJEM) VALUES (NULL, 'strom', '13.5.2015', 'APVYS', b'1');
INSERT INTO lokal (strom_id, LON, LAT) VALUES (LAST_INSERT_ID(), 49.951220, 14.538983); 
INSERT INTO pisemne_d (strom_id, URL) VALUES (LAST_INSERT_ID(), 'http://...');
INSERT INTO obrazove_d (strom_id, URL) VALUES (LAST_INSERT_ID(), 'http://...');
INSERT INTO kateg (strom_id, KATEG1, KATEG2, KATEG3, KATEG4, KATEG5) VALUES (LAST_INSERT_ID(),'1, 1, 2, 0, 0, 0, 3', ' 0, 0, 3', ' 0, 3', '2, 0, 0, 0, 3', '1, 1, 2, 0, 0');
INSERT INTO ohro (strom_id, OHRO1, OHRO2, OHRO3, OHRO4, OHRO5) VALUES (LAST_INSERT_ID(), 'A,C', 'A,C', '', 'B', 'D');
INSERT INTO comment (strom_id, COM_A, COM_U) VALUES (LAST_INSERT_ID(), "toto je nejaký komentář od administrátora", 'toto je nějaký komentář od normálního uživatele');