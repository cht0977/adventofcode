import {readFileSync} from "fs";

const onlyUnique = (a: number[][], v: any[], i: number) => !a.slice(0, i).some(aElement => aElement[0] === v[0] && aElement[1] === v[1]);

function main() {
    const [inputs, instructions]: Array<string> = readFileSync('input.txt', 'utf-8').trim().split('LOL');
    const inputAsArray = inputs.split('\n').filter(l => l).map(coord => coord.split(',').map(Number));
    const instructionsAsArray: Array<[string, number]> = instructions.split('\n')
        .filter(l => l)
        .map(i => i.substring(11).split('=')).map(s => [s[0], Number(s[1])]);

    const [directionString, value] = instructionsAsArray[0];
    const direction = directionString == 'x' ? 0 : 1;
    const same = inputAsArray.filter(s => s[direction] < value);
    const xTransform = inputAsArray.filter(s => s[direction] >= value).map(s => {
        s[direction] = 2*value - s[direction];
        return s;
    });
    const merged = [...same, ...xTransform].filter((v, i, a) => onlyUnique(a, v, i));
    console.log(merged.length)
}

main();
