import {readFileSync} from "fs";

const hex2bin = (hex: string) => (parseInt(hex, 16).toString(2)).padStart(4, '0');

function main() {
    const singleInputArray: Array<string> = readFileSync('input.txt', 'utf-8').trim().split('');
    const asBinary = singleInputArray.map(s => hex2bin(s)).join('');

    const res = takeItAuseinander(asBinary, 0);
    console.log(res[0]);
}

function getFunction(type: string) {
    switch (type) {
        case '000': return (arr: number[]) => arr.reduce((a, b) => a + b); // sum
        case '001': return (arr: number[]) => arr.reduce((a, b) => a * b); // product
        case '010': return (arr: number[]) => arr.reduce((a, b) => a < b ? a : b); // min
        case '011': return (arr: number[]) => arr.reduce((a, b) => a > b ? a : b); // max
        case '101': return (arr: number[]) => arr[0] > arr[1] ? 1 : 0; // > (ret 1 if first is bigger, else 0)
        case '110': return (arr: number[]) => arr[0] < arr[1] ? 1 : 0; // <
        case '111': return (arr: number[]) => arr[0] == arr[1] ? 1 : 0; // =
        default: return (arr: number[]) => 0
    }
}

function takeItAuseinander(binString: string, index: number): [number, number] {
    if(index > binString.length) {
        return [0, index];
    }
    const type = binString.substring(index+3, index+6);
    index += 6;

    if(type == '100') {
        let values: string[]= [];
        index = getIndexOfEndOfLiteral(binString, index, values);
        let number = parseInt(values.reduce((a, b) => a + b, ''), 2);
        return [number, index];
    } else {
        const fun = getFunction(type);
        const nrOfSubpackets = binString.substring(index, index + 1) == '1' ? 11 : 15;
        const test = parseInt(binString.substring(index+1, index + nrOfSubpackets + 1), 2);
        index = index + nrOfSubpackets + 1;
        if(nrOfSubpackets == 15) {
            const endIndex = index + test;
            let subPacketValues = []
            while(index < endIndex) {
                let [subpacketValue, newIndex] = takeItAuseinander(binString, index);
                subPacketValues.push(subpacketValue);
                index = newIndex;
            }
            return [fun(subPacketValues), index];
        } else {
            let subPacketValues = []
            for (let i = 0; i < test; i++) {
                let [subpacketValue, newIndex] = takeItAuseinander(binString, index);
                subPacketValues.push(subpacketValue);
                index = newIndex;
            }
            return [fun(subPacketValues), index];
        }
    }
}

function getIndexOfEndOfLiteral(binString: string, index: number, values: string[]): number {
    let nr = binString.substring(index, index+5);
    let value = binString.substring(index+1, index+5)
    values.push(value);
    if (parseInt(nr, 2) <= 15) {
        return index + 5;
    }
    return getIndexOfEndOfLiteral(binString, index + 5, values);
}

main();
