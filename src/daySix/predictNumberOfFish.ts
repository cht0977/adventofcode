import {readFileSync} from "fs";

main()

function calculateNumberOfFish(inputAsArray: Array<number>) {
    const N = 256;

    for (let i = 1; i <= N; i++) {
        inputAsArray = inputAsArray.map(n => mod(n-1, 9));
        inputAsArray
            .filter(n => n === 8)
            .forEach(_ => inputAsArray.push(6))
    }
    return inputAsArray.length;
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
