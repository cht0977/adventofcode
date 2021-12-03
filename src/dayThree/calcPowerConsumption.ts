import {readFileSync} from "fs";

main()


function calcPowerConsumption(inputAsArray: Array<string>) {
    let gammarate = '';
    let epsilonrate = '';
    for (let i = 12; i > 0; i--) {
        let zeros = 0;
        let ones = 0;
        inputAsArray.forEach(n => {
            if (parseInt(n, 2) >= (1<<(i-1))) {
                ones++;
            } else {
                zeros++;
            }
        })
        inputAsArray = inputAsArray.map(n => n.substring(1));
        gammarate += ones > zeros ? '1' : '0';
        epsilonrate += ones > zeros ? '0' : '1';
    }
    return parseInt(gammarate, 2) * parseInt(epsilonrate, 2);
}

function main() {
    const inputAsArray: Array<string> =  readFileSync('input.txt', 'utf-8').trim().split('\n');
    const powerConsumption = calcPowerConsumption(inputAsArray);

    console.log(powerConsumption);
}

main();
