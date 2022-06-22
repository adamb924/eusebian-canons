'use strict';

const fs = require('fs');

let rawData = fs.readFileSync('json/sections-sql.json');
let sqlSections = JSON.parse(rawData);

let sections = new Object;
sections.MAT = new Array();
sections.MRK = new Array();
sections.LUK = new Array();
sections.JHN = new Array();

sqlSections.forEach(row => {
    sections[ row.book ].push( row.reference );
});


let outputData = JSON.stringify(sections);
fs.writeFileSync('json/sections.json', outputData);