import {readFileSync} from "fs";

main()

function calculateNumberOfFish(inputAsArray: Array<number>) {
    const N = 8100;
    const arr: number[] = new Array(9).fill(0);
    for (const number of inputAsArray) {
        arr[number]++;
    }

    for (let i = 1; i <= N; i++) {
        const oldEights: number  = arr[8];
        arr.forEach((n, i) => arr[mod(i-1, 9)] = n)
        arr[6] += arr[8];
        arr[7] = oldEights;
    }

    return arr.reduce((a,b) => a + b);
}

//https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

function main() {
    const inputAsArray: Array<number> = readFileSync('input.txt', 'utf-8').trim().split(',').map(Number);
    const res  = calculateNumberOfFish(inputAsArray);
    console.log(res);
}
