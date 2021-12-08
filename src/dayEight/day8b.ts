import {readFileSync} from "fs";

const matchSegments = (elements: string[], element: string) => elements.filter(n => number2IncludesNumber1(element, n)).pop()!;

const contains = (element: string, elements: string[]) => elements.filter(n => number2IncludesNumber1(n, element)).pop()!;

function mapOutputToNumber(numbers: string[], output: string) {
    for (let i = 0; i < numbers.length; i++) {
        if (containEqualCharacters(numbers[i], output)) return i;
    }
}


const number2IncludesNumber1 = (number1: string, number2: string) => number1.split('').map(n => number2.includes(n)).reduce((a, b) => a && b);

function containEqualCharacters(number1: string, number2: string) {
    if(number1.length != number2.length) return false;
    return number2IncludesNumber1(number1, number2);
}

const mapOutputsToNumbers = (numbers: string[], output: string[]): number[] => output.map(o => mapOutputToNumber(numbers, o)!);

function getElementWithLength(input: string[], length: number) {
    return input.filter(s => s.length === length);
}

function deductSingalsFromInput(input: string[]) {
    const numbers: string[] = new Array(9);
    numbers[1] = getElementWithLength(input, 2)[0];
    numbers[4] = getElementWithLength(input, 4)[0];
    numbers[8] = getElementWithLength(input, 7)[0];
    numbers[7] = getElementWithLength(input, 3)[0];

    const elementsWithLength6 = getElementWithLength(input, 6);
    numbers[9] = matchSegments(elementsWithLength6, numbers[4])!;
    const e6Without9 = elementsWithLength6.filter(s => s != numbers[9]);
    numbers[0] = matchSegments(e6Without9, numbers[7])!;
    numbers[6] = e6Without9.filter(s => s != numbers[0])[0];

    const elementsWithLength5 = getElementWithLength(input, 5);
    numbers[3] = matchSegments(elementsWithLength5, numbers[7])!;
    const e5Without3 = elementsWithLength5.filter(s => s != numbers[3]);
    numbers[5] = contains(numbers[9], e5Without3)!;
    numbers[2] = e5Without3.filter(s => s != numbers[5])[0];
    return numbers;
}

function mapInputLineToResultNumber(input: string[], output: string[]) {
    const signals = deductSingalsFromInput(input);

    return mapOutputsToNumbers(signals, output).map(String).reduce((a, b) => a + b);
}

function main() {
    const inputAsArray: Array<string> = readFileSync('input.txt', 'utf-8').trim().split('\n')

    const res = inputAsArray
        .map(inputsWithOutputs => inputsWithOutputs.split(' | ').reduce((a, b) => mapInputLineToResultNumber(a.split(' '), b.split(' '))))
        .map(Number)
        .reduce((a, b) => a + b);

    console.log(res);
}


main();
