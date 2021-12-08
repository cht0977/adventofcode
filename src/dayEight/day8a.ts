import {readFileSync} from "fs";

const sum = (a: number, b: number) => a + b;

function main() {
    const inputAsArray: Array<string> = readFileSync('input.txt', 'utf-8').trim().split('\n')

    const res = inputAsArray.map(l => l.split(' | ')[1])
        .map(l => l.split(' ')
            .map(s => s.length)
            .filter(n => n == 2 || n == 4 || n == 3 || n == 7))
        .map(n => n.length)
        .reduce(sum)

    console.log(res);
}


main();
