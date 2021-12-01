"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
main();
function readInputFromFile(inputFilePath) {
    return fs.readFileSync(inputFilePath, 'utf8');
}
function countIncreasesInChunksOfDepth(depths) {
    var depthsSummedChunksOfThree = [];
    for (var i = 0; i < depths.length; i++) {
        depthsSummedChunksOfThree.push(depths.slice(i, i + 3).map(function (n) { return +n; }).reduce(function (a, b) { return a + b; }));
    }
    return countIncreasesInDepth(depthsSummedChunksOfThree);
}
function countIncreasesInDepth(depths) {
    var increases = 0;
    depths
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
    var increasesInChunksOfDepth = countIncreasesInChunksOfDepth(inputAsArray);
    console.log(increasesInChunksOfDepth);
}
