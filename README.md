# eusebian-canons

*(Substantial updates on December 4, 2005, including revisions to the data and alignment with the SBLGNT text.)*

**NB: If you just want to look at the canons, you can view them in your browser at [https://eusebian-canons.adambaker.org/](https://eusebian-canons.adambaker.org/). If you're interested in the data, then this is the page for you.**

This is an electronic version ([SQLite](https://www.sqlite.org/), JSON) of the [Eusebian canons](https://en.wikipedia.org/wiki/Eusebian_Canons). 
The ‘original’ data is in the `data` folder in plaintext format. The files in the `json` and `sql` folders are generated with `import.sql`, e.g.,

```
sqlite3 sql/eusebian-canons.db ".read import.sql"
```

The JSON is generated with SQL exports, and then revised with this script to make it less SQL-y:

```
node redo-json.js
```

I originally got the data from [this web page](https://www.tertullian.org/fathers/eusebius_canon_tables_01.htm). The bottom of the page states, “This text was created by Kevin P. Edgecomb.  All material on this page is in the public domain - copy freely.” As noted below, I have also corrected some errors. This entire repository is in the public domain.

## Aligning to sblgnt-to-sqlite
The original data source  contains only verse references. To make the resource more useful, the canon sections are aligned to the [sblgnt-to-sqlite](https://github.com/adamb924/sblgnt-to-sqlite) database, which is a SQLite database that contains the [MorphGNT](https://github.com/morphgnt/sblgnt) data.

In the `data` folder there are files like `data/MAT-sections.txt`, which contain the verse references in the original data. In order to align these to the actual Greek text, the Qt command line program in the `references` folder is run, which produces files like `data/MAT-sections-automatic.txt`. This program parses the references as well as it can, and fills in the word indices from the `sblgnt-to-sqlite` database. Some references have a non-standard form, and others refer to fragments of verses (e.g., Matthew 37 is 5.27-39A, and Matthew 38 is 5.39B-40). In these cases, it's necessary to enter the section boundaries manually. 

I did this, using my NA28. In places where the NA28 includes an asterisk, the boundary was clear. It seems that they do not include the asterisk when there is a clause break (or major punctuation). I did not encounter any instances where the section break felt ambiguous, aside from Mark-76 and John-198. (I have left the spreadsheet at `data/Sections.xslx`, to make it easier for errors to be corrected in the future.)

Aligning the canons to the SBLGNT text gave me occasion to fix errors in the original data; these are listed in `Errors.md`.

The manually corrected files are `data/MAT-sections-aligned.txt`, etc. These are the files that are imported into Sqlite and JSON format.

## SQL Tables

 * `sections`
   definition of the sections; for each book, there is a section number with the corresponding verse reference. Note that the columns `from_reference` and `to_reference` are approximate references. The proper scope of a section is given in `from_sblgnt` and `to_sblgnt`. `greek` of course contains the Greek text.
 * `canon1`, `canon2`, ... `canon13`
   each canon is given; different canons have different columns
 * `canons`
   this has the same data as the canon tables, except that all four columns are present, and the null value is used where the gospel is not referenced in that canon
