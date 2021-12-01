/*
From Hackerrank, for possible further optimization of reading inputs
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
process.stdin.resume();
process.stdin.setEncoding('utf-8');
var inputString = '';
var inputLines = [];
var currentLine = 0;
process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});
process.stdin.on('end', function () {
    inputLines = inputString.split('\n');
    inputString = '';
    main();
});
function readLine() {
    return inputLines[currentLine++];
}
/*
 * Complete the 'simpleArraySum' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY ar as parameter.
 */
function simpleArraySum(ar) {
    // Write your code here
    return 0;
}
function main() {
    var ws = fs_1.createWriteStream(process.env['OUTPUT_PATH']);
    var arCount = parseInt(readLine().trim(), 10);
    var ar = readLine().replace(/\s+$/g, '').split(' ').map(function (arTemp) { return parseInt(arTemp, 10); });
    var result = simpleArraySum(ar);
    ws.write(result + '\n');
    ws.end();
}
