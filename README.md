Table USERS will be used for clientAdmin app. This table will contain informations about admins and will hold one field which will indicate if user is "ussual" admin or "super" admin

# init server before build
* git clone https://github.com/MojaCZ/Vyznamne-stromy.git
* add local .env file with all configurations(see example in .env-example file)
* install packages `npm install`
* run `npm start`

### USERS TABLE
<table style="text-align:center;"> 
    <tr><th colspan=3> USERS </th></tr>
    <tr>
        <td>id</td>
        <td>INT(10) UNSIGNED NOT NULL AUTO_INCREMENT</td>
    </tr>
    <tr>
        <td>name</td>
        <td>VARCHAR NOT NULL UNIQUE</td>
    </tr>
    <tr>
        <td>email</td>
        <td>VARCHAR UNIQUE</td>
    </tr>
    <tr>
        <td>tel</td>
        <td>VARCHAR</td>
    </tr>
    <tr>
        <td>admin</td>
        <td>BIT</td>
    </tr>
    <!-- <tr>
        <td>JWT</td>
        <td>TEXT CHARACTER SET ascii COLLATE ascii_bin</td>
    </tr> -->
</table>

### IDENT
<table style="text-align:center"> 
    <tr><th colspan=3> IDENT </th></tr>
    <tr>
        <td>ID_DOC</td>
        <td>INT(10)</td>
    </tr>
    <tr>
        <td>ID_STROM</td>
        <td>INT(10)</td>
    </tr>
    <tr>
        <td>URL</td>
        <td>VARCHAR</td>
    </tr>
</table>

### KATEG
<table style="text-align:center"> 
    <tr><th colspan=3> KATEG </th></tr>
    <tr>
        <td>ID_DOC</td>
        <td>INT(10)</td>
    </tr>
    <tr>
        <td>ID_STROM</td>
        <td>INT(10)</td>
    </tr>
    <tr>
        <td>URL</td>
        <td>VARCHAR</td>
    </tr>
</table>

### OHRO
<table style="text-align:center"> 
    <tr><th colspan=3> OHRO </th></tr>
    <tr>
        <td>ID_DOC</td>
        <td>INT(10)</td>
    </tr>
    <tr>
        <td>ID_STROM</td>
        <td>INT(10)</td>
    </tr>
    <tr>
        <td>URL</td>
        <td>VARCHAR</td>
    </tr>
</table>

### LOCAL
<table style="text-align:center"> 
    <tr><th colspan=3> LOKAL </th></tr>
    <tr>
        <td>id</td>
        <td>INT(10) UNSIGNED NOT NULL AUTO_INCREMENT</td>
    </tr>
    <tr>
        <td>lon</td>
        <td>INT(10)</td>
    </tr>
    <tr>
        <td>lat</td>
        <td>INT(10)</td>
    </tr>
</table>

### PISEMNE_D
<table style="text-align:center"> 
    <tr><th colspan=3> PISEMNE_D </th></tr>
    <tr>
        <td>strom_id</td>
        <td>INT(10)</td>
    </tr>
    <tr>
        <td>URL</td>
        <td>VARCHAR(255)</td>
    </tr>
</table>

```sql
DROP TABLE IF EXISTS pisemne_d;

CREATE TABLE IF NOT EXISTS pisemne_d (
  strom_id INT(10),
  URL VARCHAR(255) NOT NULL,
  FOREIGN KEY (strom_id)
    REFERENCES strom(id)
    ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACRET SET = utf8;
```
---

<table style="text-align:center"> 
    <tr><th colspan=3> OBRAZOVE_D </th></tr>
    <tr>
        <td>strom_id</td>
        <td>INT(10)</td>
    </tr>
    <tr>
        <td>URL</td>
        <td>VARCHAR(255)</td>
    </tr>
</table>


### OBRAZOVE_D
<table style="text-align:center"> 
    <tr><th colspan=3> KATEG </th></tr>
    <tr>
        <td>KAT1</td>
        <td>VARCHAR(50)</td>
    </tr>
    <tr>
        <td>KAT2</td>
        <td>VARCHAR(50)</td>
    </tr>
    <tr>
        <td>KAT3</td>
        <td>VARCHAR(50)</td>
    </tr>
    <tr>
        <td>KAT4</td>
        <td>VARCHAR(50)</td>
    </tr>
    <tr>
        <td>KAT5</td>
        <td>VARCHAR(50)</td>
    </tr>
</table>

```sql
DROP TABLE IF EXISTS kateg;

CREATE TABLE IF NOT EXISTS kateg (
  strom_id INT(10),
  KATEG1 VARCHAR(50),
  KATEG2 VARCHAR(50),
  KATEG3 VARCHAR(50),
  KATEG4 VARCHAR(50),
  KATEG5 VARCHAR(50),
  FOREIGN KEY (strom_id)
    REFERENCES strom(id)
    ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACRET SET = utf8;
```
---

Example of OHRO1 - 'A,C'
<table style="text-align:center"> 
    <tr><th colspan=3> OHRO </th></tr>
    <tr>
        <td>OHRO1</td>
        <td>VARCHAR(50)</td>
    </tr>
    <tr>
        <td>OHRO2</td>
        <td>VARCHAR(50)</td>
    </tr>
    <tr>
        <td>OHRO3</td>
        <td>VARCHAR(50)</td>
    </tr>
    <tr>
        <td>OHRO4</td>
        <td>VARCHAR(50)</td>
    </tr>
    <tr>
        <td>OHRO5</td>
        <td>VARCHAR(50)</td>
    </tr>
</table>

```sql
DROP TABLE IF EXISTS ohro;

CREATE TABLE IF NOT EXISTS ohro (
  strom_id INT(10),
  OHRO1 VARCHAR(50),
  OHRO2 VARCHAR(50),
  OHRO3 VARCHAR(50),
  OHRO4 VARCHAR(50),
  OHRO5 VARCHAR(50),
  FOREIGN KEY (strom_id)
    REFERENCES strom(id)
    ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACRET SET = utf8;
```
---

<table style="text-align:center"> 
    <tr><th colspan=3> COMMENT </th></tr>
    <tr>
        <td>COM_U</td>
        <td>TEXT</td>
    </tr>
    <tr>
        <td>COM_A</td>
        <td>TEXT</td>
    </tr>
</table>

```sql
DROP TABLE IF EXISTS comment;

CREATE TABLE IF NOT EXISTS comment (
  strom_id INT(10),
  COM_U TEXT NOT NULL,
  COM_A TEXT NOT NULL,
  FOREIGN KEY (strom_id)
    REFERENCES strom(id)
    ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACRET SET = utf8;
```
---
