import {readFileSync} from "fs";


function chunkSubstr(str: string) {
    const chunks = new Array(str.length-1)

    for (let i = 0; i < str.length-1; i++) {
        chunks[i] = str.substring(i, i+2);
    }

    return chunks
}


function main() {
    const inputAsArray: Array<string> = readFileSync('input.txt', 'utf-8').trim().split('\n');
    const sequence = inputAsArray[0];

    const sequenceMapping: Map<string, string> = new Map<string, string>()
    let countOfSequences: Map<string, number> = new Map<string, number>()
    inputAsArray.slice(2).forEach(l => {
        let [from, to] = l.split(' -> ');
        countOfSequences.set(from, 0);
        sequenceMapping.set(from, to);
    })
    chunkSubstr(sequence).forEach(chunk => {
        countOfSequences.set(chunk, countOfSequences.get(chunk)! + 1);
    });


    let countEachCharacter: Map<string, number> = new Map<string, number>();
    sequence.split('').forEach(c => {
            countEachCharacter.set(c, (countEachCharacter.get(c) ?? 0) + 1);
    })
    
    for (let i = 0; i < 40; i++) {
        let countOfNextSequences : Map<string, number> = new Map<string, number>()
        for (let [key, value] of countOfSequences.entries()) {
            if(value == 0) continue;
            const [left, right] = key;
            const mid = sequenceMapping.get(key)!;

            countOfNextSequences.set(left+mid, (countOfNextSequences.get(left+mid) || 0) + value);
            countOfNextSequences.set(mid+right, (countOfNextSequences.get(mid+right) || 0) + value);

            countEachCharacter.set(mid, (countEachCharacter.get(mid) ?? 0) + value);
        }
    countOfSequences = countOfNextSequences;
    }

    const max = Math.max(...Array.from(countEachCharacter.values()))
    const min = Math.min(...Array.from(countEachCharacter.values()))

  console.log(max-min);
}

main();
