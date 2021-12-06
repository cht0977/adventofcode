import {readFileSync} from "fs";

main();

function formatInput(inputAsArray: string[]) {
    return inputAsArray.map(s => s.replace(' -> ', ',').split(',').map(Number));
}

function findOrAddToArray(vector: Array<number>, arrayOfAllPoints: Array<Array<number>>): number {
    const [x1, y1, x2, y2] = vector;
    let sum = 0;
    const xDiff = x2 - x1;
    const xstep = xDiff > 0 ? 1 : -1;
    const yDiff = y2 - y1;
    const ystep = yDiff > 0 ? 1 : -1;
    for (let i = 0; i <= Math.abs(xDiff > yDiff ? xDiff : yDiff); i++) {
        sum += arrayOfAllPoints[x1 + xstep * i][y1 + ystep * i] == 1 ? 1 : 0;
        arrayOfAllPoints[x1 + xstep * i][y1 + ystep * i]++;
    }
    return sum;
}


function calculateOverlappingPoints(inputAsArray: Array<string>) {
    const n = 1000;
    const formattedInput: Array<Array<number>> = formatInput(inputAsArray);
    const arrayOfAllPoints: number[][] = new Array(n)
        .fill(0)
        .map(() =>
            new Array(n).fill(0)
        );

    let sum = 0;
    for (const vector of formattedInput) {
        const found: number = findOrAddToArray(vector, arrayOfAllPoints);
        sum += found;
    }
    return sum;
}

function main() {
    const inputAsArray: Array<string> = readFileSync('input.txt', 'utf-8').trim().split('\n');
    const res  = calculateOverlappingPoints(inputAsArray);
    console.log(res);
}
