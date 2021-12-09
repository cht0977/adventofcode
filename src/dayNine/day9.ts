import {readFileSync} from "fs";

function main() {
    const inputAsMatrix: number[][] = readFileSync('input.txt', 'utf-8').trim().split('\n')
        .map(l => l.split('').map(Number));


    const lowPoints: number[] = [];
    for (let y = 0; y < inputAsMatrix.length; y++) {

        for (let x = 0; x < inputAsMatrix[0].length; x++) {
            const up = y-1 >= 0 ? inputAsMatrix[y-1][x] : 9;
            const down = y+1 < inputAsMatrix.length ? inputAsMatrix[y+1][x] : 9;
            const left = x-1 >= 0 ? inputAsMatrix[y][x-1] : 9;
            const right = x+1 < inputAsMatrix[0].length ? inputAsMatrix[y][x+1] : 9;
            if(inputAsMatrix[y][x] < up && inputAsMatrix[y][x] < down && inputAsMatrix[y][x] < left && inputAsMatrix[y][x] < right) {
                lowPoints.push(inputAsMatrix[y][x]);
            }
        }
    }
    console.log(lowPoints);
    const res = lowPoints.map(n => n+1).reduce((a, b) => a + b);
    console.log(res);

}

main()
