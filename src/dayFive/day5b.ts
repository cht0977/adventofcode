import {readFileSync} from "fs";

main();

const formatInput = (inputAsArray: string[]) => inputAsArray.map(s => s.replace(' -> ', ',').split(',').map(Number));

function findOrAddToArray(vector: Array<number>, arrayOfAllPoints: Array<Array<number>>): number {
    const x1 = vector[0];
    const y1 = vector[1];
    const x2 = vector[2];
    const y2 = vector[3];
    let sum = 0;
    if(x1 == x2) {
        let yDiff = y2-y1;
        let yAbsDiff = Math.abs(yDiff);
        const step = yDiff / yAbsDiff;
        for (let i = 0; i <= yAbsDiff; i++) {
            sum += arrayOfAllPoints[x1][y1+step*i] == 1 ? 1 : 0;
            arrayOfAllPoints[x1][y1+step*i]++;
        }
    } else if(y1 == y2) {
        const xDiff = x2-x1;
        const xAbsDiff = Math.abs(xDiff);
        const step = xDiff / xAbsDiff;
        for (let i = 0; i <= xAbsDiff; i++) {
            sum += arrayOfAllPoints[x1+step*i][y1] == 1 ? 1 : 0;
            arrayOfAllPoints[x1+step*i][y1]++;
        }
    } else {
        const xDiff = x2-x1;
        const absDiff = Math.abs(xDiff);
        const xstep = xDiff / absDiff;
        const yDiff = y2-y1;
        const ystep = yDiff / absDiff;
        for(let i = 0; i <= absDiff; i++) {
            sum += arrayOfAllPoints[x1+xstep*i][y1+ystep*i] == 1 ? 1 : 0;
            arrayOfAllPoints[x1+xstep*i][y1+ystep*i]++;
        }
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
