import {readFileSync} from "fs";

const sum = (a: number, b: number): number => a + b;

function addToDepthOrX(input: string, depthInputs: number[], xInputs: number[]) {
    const inputArray = input.split(' ');
    const command = inputArray[0];
    const units = Number(inputArray[1]);
    if (command == 'forward') {
        xInputs.push(units);
    } else {
        command == 'down' ? depthInputs.push(units) : depthInputs.push(-units);
    }
}

function calcProductOfDepthAndX(inputAsArray: Array<string>): number {
    let depthInputs: Array<number> = [];
    let xInputs: Array<number> = [];

    inputAsArray.forEach(input => addToDepthOrX(input, depthInputs, xInputs));

    return depthInputs.reduce(sum) * xInputs.reduce(sum);
}

function main() {
    const inputAsArray: Array<string> =  readFileSync('input.txt', 'utf-8').trim().split('\n');
    const productOfDepthAndX = calcProductOfDepthAndX(inputAsArray);

    console.log(productOfDepthAndX);
}

main();
