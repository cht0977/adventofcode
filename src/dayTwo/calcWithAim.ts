import {readFileSync} from "fs";

function calcProductOfDepthAndAim(inputAsArray: Array<string>): number {
    let aim: number = 0;
    let depth: number = 0;
    let forwardX: number = 0;

    inputAsArray.forEach(input => {
        const [command, units] = input.split(' ');
        if (command == 'forward') {
            forwardX += Number(units);
            depth += Number(units) * aim;
        } else {
            aim += command == 'down' ? Number(units) : -Number(units);
        }
    });
    return depth * forwardX;
}

function main() {
    const inputAsArray: Array<string> =  readFileSync('input.txt', 'utf-8').trim().split('\n');
    const productOfDepthAndAim = calcProductOfDepthAndAim(inputAsArray);

    console.log(productOfDepthAndAim);
}

main();
