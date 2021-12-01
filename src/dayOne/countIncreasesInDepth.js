"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
main();
function readInputFromFile(inputFilePath) {
    return fs.readFileSync(inputFilePath, 'utf8');
}
function countIncreasesInDepth(depths) {
    var increases = 0;
    depths
        .map(function (d) { return +d; })
        .reduce(function (a, b) {
        if (b > a) {
            increases++;
        }
        return b;
    });
    return increases;
}
function main() {
    var input = readInputFromFile('src/dayOne/inputDayOne.txt');
    var inputAsArray = input.split('\n');
    var increasesInDepth = countIncreasesInDepth(inputAsArray);
    console.log(increasesInDepth);
}
