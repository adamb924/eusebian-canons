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



let canonJson = fs.readFileSync('json/canons.json');
let canonTable = JSON.parse(canonJson);
const gospels = ['MAT', 'MRK', 'LUK', 'JHN'];

function byGospel(gospel) {
    return canonTable
        .filter(entry => entry[gospel] !== null)
        .sort((a, b) => a[gospel] - b[gospel]);
}

let canonsByGospel = new Object();
gospels.forEach((g) => canonsByGospel[g] = byGospel(g));
let canonsByGospelOutput = JSON.stringify(canonsByGospel, null, 2);
fs.writeFileSync('json/canonsByGospel.json', canonsByGospelOutput);
