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
    sections[row.book].push({
        sectionNumber: row.sectionNumber,
        reference: row.reference,
        from_reference: row.from_reference,
        to_reference: row.to_reference,
        from_sblgnt: row.from_sblgnt,
        to_sblgnt: row.to_sblgnt,
        greek: row.greek
    });
});


let outputData = JSON.stringify(sections);
fs.writeFileSync('json/sections.json', outputData);