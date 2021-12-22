import {readFileSync} from "fs";

const hex2bin = (hex: string) => (parseInt(hex, 16).toString(2)).padStart(4, '0');

function main() {
    const singleInputArray: Array<string> = readFileSync('input.txt', 'utf-8').trim().split('');
    const asBinary = singleInputArray.map(s => hex2bin(s)).join('');

    const res = takeItAuseinander(asBinary, 0);
    console.log(res);
}

function takeItAuseinander(binString: string, index: number): number {
    if(index > binString.length) {
        return 0;
    }
    const versionNumber = parseInt(binString.substring(index, index + 3), 2);
    index += 3;
    const type = binString.substring(index, index + 3);
    index += 3;

    if(type == '100') {
        index = getIndexOfEndOfLiteral(binString, index);
    } else {
        const nrOfSubpackets = binString.substring(index, index + 1) == '1' ? 11 : 15;
        index = index + nrOfSubpackets + 1;
    }
    return versionNumber + takeItAuseinander(binString, index);
}

function getIndexOfEndOfLiteral(binString: string, index: number): number {
    let nr = binString.substring(index, index+5);
    if (parseInt(nr, 2) <= 15) {
        return index + 5;
    }
    return getIndexOfEndOfLiteral(binString, index + 5);
}

main();
