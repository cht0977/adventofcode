import {readFileSync} from "fs";

const onlyUnique = (a: number[][], v: any[], i: number) => !a.slice(0, i).some(aElement => aElement[0] === v[0] && aElement[1] === v[1]);

function fold(directionString: string, inputAsArray: number[][], value: number) {
    const direction = directionString == 'x' ? 0 : 1;
    const same = inputAsArray.filter(s => s[direction] < value);
    const xTransform = inputAsArray.filter(s => s[direction] >= value).map(s => {
        s[direction] = 2 * value - s[direction];
        return s;
    });
    return [...same, ...xTransform].filter((v, i, a) => onlyUnique(a, v, i));
}

function main() {
    const [inputs, instructions]: Array<string> = readFileSync('input.txt', 'utf-8').trim().split('LOL');
    const inputAsArray = inputs.split('\n').filter(l => l).map(coord => coord.split(',').map(Number));
    const instructionsAsArray: Array<[string, number]> = instructions.split('\n')
        .filter(l => l)
        .map(i => i.substring(11).split('=')).map(s => [s[0], Number(s[1])]);

    let merged = inputAsArray;
    for (let instruction of instructionsAsArray) {
        const [directionString, value] = instruction;
        merged = fold(directionString, merged, value);
    }

    const res: string[][] = new Array(8).fill('X').map(_ => new Array(50).fill('.'));
    merged.forEach(r => res[r[1]][r[0]] = 'X')
    res.forEach(item => {
        console.log(item.join(' '))
    });

}

main();
