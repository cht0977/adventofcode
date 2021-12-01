import * as fs from 'fs';

main();

function readInputFromFile(inputFilePath: string) {
    return fs.readFileSync(inputFilePath,'utf8');
}

function countIncreasesInChunksOfDepth(depths: Array<string>) {
    const depthsSummedChunksOfThree: Array<number> = [];
    for (let i = 0; i < depths.length; i++) {
        depthsSummedChunksOfThree.push(depths.slice(i, i+3).map(n => +n).reduce((a,b) => a +b));
    }

    return countIncreasesInDepth(depthsSummedChunksOfThree);
}

function countIncreasesInDepth(depths: Array<number>) {
    let increases: number = 0;
    depths
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
    const increasesInChunksOfDepth = countIncreasesInChunksOfDepth(inputAsArray);
    console.log(increasesInChunksOfDepth);
}


