import {readFileSync} from "fs";

main();

const formatInput = (inputAsArray: string[]) => inputAsArray.map(s => s.replace(' -> ', ',').split(',').map(Number));

function findOrAddToArray(vector: Array<number>, arrayOfAllPoints: Array<Array<number>>): number {
    const [x1, y1, x2, y2] = vector;
    let sum = 0;
    if(x1 == x2) {
        let yDiff = y2-y1;
        let yAbsDiff = Math.abs(yDiff);
        const step = yDiff / yAbsDiff;
        for (let i = 0; i <= yAbsDiff; i++) {
            sum += arrayOfAllPoints[x1][y1+step*i] == 1 ? 1 : 0;
            arrayOfAllPoints[x1][y1+step*i]++;
        }
    }
    if(y1 == y2) {
        const xDiff = x2-x1;
        const xAbsDiff = Math.abs(xDiff);
        const step = xDiff / xAbsDiff;
        for (let i = 0; i <= xAbsDiff; i++) {
            sum += arrayOfAllPoints[x1+step*i][y1] == 1 ? 1 : 0;
            arrayOfAllPoints[x1+step*i][y1]++;
        }
    }
    return sum;
}

function calculateOverlappingPoints(inputAsArray: Array<string>) {
    const arraySize = 1000;
    const formattedInput: Array<Array<number>> = formatInput(inputAsArray);
    const arrayOfAllPoints: number[][] = new Array(arraySize)
        .fill(0)
        .map(() =>
            new Array(arraySize).fill(0)
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
