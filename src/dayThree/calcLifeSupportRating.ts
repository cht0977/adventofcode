import {readFileSync} from "fs";

main()


function removeByBitCriteria(inputAsArray: Array<string>, mostCommonBit: string, index: number, oxygen: boolean) {
    let bitToKeep: string;
    if(oxygen && mostCommonBit === 'equal')
        bitToKeep = '1';
    else if (mostCommonBit == 'equal')
        bitToKeep = '0';
    else if(oxygen)
        bitToKeep = mostCommonBit
    else if(!oxygen)
        bitToKeep = mostCommonBit == '1' ? '0' : '1';

    inputAsArray = inputAsArray.filter(n => n.charAt(12-index) == bitToKeep);
    return inputAsArray;
}

function getMostCommonBit(inputAsArray: Array<string>, index: number) {
    let zeros = 0;
    let ones = 0;
    inputAsArray.forEach(n => {
        if (n.charAt(12-index) == '1') {
            ones++;
        } else {
            zeros++;
        }
    })
    if(ones > zeros) {
        return '1';
    } else if( zeros > ones) {
        return '0';
    }
    return 'equal';
}

function calc(inputAsArray: Array<string>, index: number, oxygen: boolean): string {
    if (inputAsArray.length == 1) {
        return inputAsArray[0];
    } else {
        let mostCommonBit = getMostCommonBit(inputAsArray, index);
        inputAsArray = removeByBitCriteria(inputAsArray, mostCommonBit, index, oxygen);
        index--;
        return calc(inputAsArray, index, oxygen);
    }
}


function calcLifeSupportRating(inputAsArray: Array<string>) {
    let oxygen = calc(inputAsArray, 12, true);
    let nonOxygen = calc(inputAsArray, 12, false);
    return parseInt(oxygen, 2) * parseInt(nonOxygen, 2);
}

function main() {
    const inputAsArray: Array<string> =  readFileSync('input.txt', 'utf-8').trim().split('\n');
    const lifeSupportRating = calcLifeSupportRating(inputAsArray);

    console.log(lifeSupportRating);
}

main();
