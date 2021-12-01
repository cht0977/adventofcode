import * as fs from 'fs';

main();

function readInputFromFile(inputFilePath: string) {
    return fs.readFileSync(inputFilePath,'utf8');
}

function countIncreasesInDepth(depths: Array<string>) {
    let increases: number = 0;
    depths
        .map((d) => +d)
        .reduce((a, b) => {
            if (b > a) {
                increases++;
            }
            return b;
        });
    return increases;
}

function main() {
    const input: string = readInputFromFile('src/dayOne/inputDayOne.txt');
    const inputAsArray: Array<string> = input.split('\n');
    const increasesInDepth = countIncreasesInDepth(inputAsArray);
    console.log(increasesInDepth);
}
