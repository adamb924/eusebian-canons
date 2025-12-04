# eusebian-canons

This is an electronic version (SQL, JSON) of the [Eusebian canons](https://en.wikipedia.org/wiki/Eusebian_Canons).

The ‘original’ data is in the data folder in text format. The files in the json and sql folders are generated with import.sql, e.g.,

```
sqlite3 sql/eusebian-canons.db ".read import.sql"
```

The JSON is generated with SQL exports, and then revised with this script to make it less SQL-y:

```
node redo-json.js
```

## SQL Tables

 * `sections`
   definition of the sections; for each book, there is a section number with the corresponding verse reference
 * `canon1`, `canon2`, ... `canon13`
   each canon is given; different canons have different columns
 * `canons`
   this has the same data as the canon tables, except that all four columns are present, and the null value is used where the gospel is not referenced in that canon

## External links

I got the data from [this web page](https://www.tertullian.org/fathers/eusebius_canon_tables_01.htm). The bottom of the page states, “This text was created by Kevin P. Edgecomb.  All material on this page is in the public domain - copy freely.”

sqlite3 is [here](https://www.sqlite.org/).
