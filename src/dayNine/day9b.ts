import {readFileSync} from "fs";


const onlyUnique = (a: number[][], v: any[], i: number) => !a.slice(0, i).some(aElement => aElement[0] === v[0] && aElement[1] === v[1]);
const isInRangeOfArray = (width: number, height: number) => (n: number[]) => 0 <= n[0] && n[0] < width && 0 <= n[1] && n[1] < height;
const findBasinsForLowPoints = (lowPoints: number[][], inputAsMatrix: number[][]): number[][][] => lowPoints.map(lp => findBasin(lp[1], lp[0], inputAsMatrix[lp[0]][lp[1]], inputAsMatrix));

function getPointsToCheck(x: number, y: number, width: number, height: number) {
    return [[1, 0], [-1, 0], [0, 1], [0, -1]]
        .map(n => [n[0] + x, n[1] + y])
        .filter(isInRangeOfArray(width, height));
}

function findBasin(x: number, y: number, threshold: number, inputAsMatrix: number[][]): number[][] {
    if (inputAsMatrix[y][x] == 9) return []
    const height = inputAsMatrix.length;
    const width = inputAsMatrix[0].length;
    const res: number[][] =
        getPointsToCheck(x, y, width, height)
            .filter(n => inputAsMatrix[n[1]][n[0]] > threshold)
            .map(n => findBasin(n[0], n[1], inputAsMatrix[n[1]][n[0]], inputAsMatrix)).flat();

    res.push([y, x]);
    return res;
}


function main() {
    const inputAsMatrix: number[][] = readFileSync('input.txt', 'utf-8').trim().split('\n')
        .map(l => l.split('').map(Number));


    const lowPoints: number[][] = [];
    const height = inputAsMatrix.length;
    const width = inputAsMatrix[0].length;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const isLowPoint = getPointsToCheck(x, y, width, height)
                    .every(n => inputAsMatrix[y][x] < inputAsMatrix[n[0]][n[1]]);
            if (isLowPoint) lowPoints.push([y, x]);
        }
    }

    const basins = findBasinsForLowPoints(lowPoints, inputAsMatrix);
    let sizeOfBasins = basins.map(s => s.filter((v, i, a) => onlyUnique(a, v, i))).map(a => a.length);
    const res = sizeOfBasins.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b);
    console.log(res);
}

main()
