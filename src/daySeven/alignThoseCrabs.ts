import {readFileSync} from "fs";

const diff = (a: number, b: number) => a - b;

const sum = (a: number, b: number) => a + b;

// https://stackoverflow.com/questions/45309447/calculating-median-javascript/53660837
function calcMedian(numbers: Array<number>): number {
    const sorted = numbers.slice().sort(diff);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
}

const calcDistanceArray = (points: Array<number>, point: number) => points.map(n => Math.abs(n - point));
const calcDistanceBetweenPointsAndPoint = (points: Array<number>, point: number) => calcDistanceArray(points, point).reduce(sum);

const calcMean = (numbers: Array<number>) => Math.round(numbers.reduce(sum) / numbers.length);

const calcWeightedDistance = (n: number): number => Array.from(Array(n + 1).keys()).reduce(sum);

function calcWeightedDistanceBetweenPointsAndPoint(points: Array<number>, point: number) {
    return calcDistanceArray(points, point)
        .map(calcWeightedDistance)
        .reduce(sum)
}

function main() {
    const inputAsArray: Array<number> = readFileSync('input.txt', 'utf-8').trim().split(',').map(Number);
    const median  = calcMedian(inputAsArray);
    const resA = calcDistanceBetweenPointsAndPoint(inputAsArray, median);

    const mean = calcMean(inputAsArray);
    const resB = calcWeightedDistanceBetweenPointsAndPoint(inputAsArray, mean);

    console.log(resA);

    //returns wrong result. calculated mean is 488.56 -> round to 489, but result is only correct for 488
    console.log(resB);
}

main()




