import {readFileSync} from "fs";

const myMap = new Map<string, string>([
    ["]", "["],
    ["}", "{"],
    [">", "<"],
    [")", "("],
]);

const scoreMap = new Map<string, number>([
    ["]", 57],
    ["}", 1197],
    [">", 25137],
    [")", 3],
]);

function isClosingCharacter(lElement: string) {
    return lElement === ']' || lElement === '}' || lElement === '>' || lElement === ')';
}

function areMatchingBrackets(opening: string, closing: string) {
    return myMap.get(closing) == opening;
}

function findFirstError(l: string) {
    const stack: string[] = [];
    for (const lElement of l) {
        if(isClosingCharacter(lElement)) {
            const toCompare = stack.pop();
            if(!areMatchingBrackets(toCompare!, lElement)) {
                return lElement;
            }
        } else {
            stack.push(lElement);
        }
    }
}

function getScore(n: string) {
    return scoreMap.get(n);
}

function main() {
    const inputAsMatrix: string[] = readFileSync('input.txt', 'utf-8').trim().split('\n');

    const res = inputAsMatrix.map(l => findFirstError(l))
        .filter(n => n)
        .map(n => getScore(n!)!)
        .reduce((a, b) => a + b);
    console.log(res);
}

main()
