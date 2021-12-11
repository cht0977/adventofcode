import {readFileSync} from "fs";

const myMap = new Map<string, string>([
    ["]", "["],
    ["}", "{"],
    [">", "<"],
    [")", "("],
]);
const myMap2 = new Map<string, string>([
    ["[", "]"],
    ["{", "}"],
    ["<", ">"],
    ["(", ")"],
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

function mapToPoints(closingBracket: string) {
    const scoreMap = new Map<string, number>([
        ["[", 2],
        ["{", 3],
        ["<", 4],
        ["(", 1],
    ]);
    return scoreMap.get(closingBracket)!;
}

function mapToClosing(openingBrackets: string) {
    return myMap2.get(openingBrackets)!;
}

function findFirstError(l: string) {
    const stack: string[] = [];
    for (const lElement of l) {
        if(isClosingCharacter(lElement)) {
            const toCompare = stack.pop();
            if(!areMatchingBrackets(toCompare!, lElement)) {
                return;
            }
        } else {
            stack.push(lElement);
        }
    }
    return stack.map(openingBrackets => mapToPoints(openingBrackets))
        .reduceRight((a, b) => a * 5 + b, 0)
}

function main() {
    const inputAsMatrix: string[] = readFileSync('input.txt', 'utf-8').trim().split('\n');

    const res = inputAsMatrix.map(l => findFirstError(l))
        .filter(n => n)
        .sort((a, b) => b! - a!)
    console.log(res[Math.ceil(res.length/2)-1]);
}

main()
