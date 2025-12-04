'use strict';

// let books = ['MAT','MRK','LUK','JHN'];

function numberOfNonNull( row, books ) {
    let ct = 0;
    books.forEach( book => {
        if( row[book] !== null ) ct++;
    } );
    return ct;
}

function edge( row, books ) {
    let arr = new Array();
    books.forEach( book => {
        if( row[book] !== null ) {
            arr.push( book + row[book] );
        };
    } );
    return arr.join(" -> ");
}

const fs = require('fs');

let rawSectionData = fs.readFileSync('json/sections.json');
let sections = JSON.parse(rawSectionData);

let rawCanonData = fs.readFileSync('json/canons.json');
let canons = JSON.parse(rawCanonData);

function getGraph(books) {
    let outputData = "digraph G {\r\n";

    /// nodes
    books.forEach( book => {
        outputData += "\tsubgraph " + book + " {\r\n";

        let nodes = Array();
        sections[book].forEach( (section,index) => {
            let nodeLabel = book + (index+1);
            outputData += "\t\t" + nodeLabel + " [label=\"" + book + " " + section + "\"]\r\n";
            // nodes.push( nodeLabel );
        } );

        for(let i=0; i < sections[book].length - 1; i++) {
            let firstNodeLabel = book + (i+1);
            let secondNodeLabel = book + (i+2);
            outputData += "\t\t" + firstNodeLabel + " -> " + secondNodeLabel + "\r\n";        
        }

        // ordering edges
        // outputData += "\t\t" + nodes.join(" -> ") + "\r\n";

        outputData += "\t}\r\n";
    } );

    /// edges
    canons.forEach( row => {
        let n = numberOfNonNull(row, books);
        if( n > 1 ) {
            outputData += "\t" + edge(row, books) + "\r\n";
        }
    } );

    outputData += "}\r\n";

    return outputData;
}

let outputData = getGraph(['MAT','MRK']);

fs.writeFileSync('graphviz/graph.dot', outputData);