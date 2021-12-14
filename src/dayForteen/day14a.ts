import {readFileSync} from "fs";

function main() {
    const inputAsArray: Array<string> = readFileSync('input.txt', 'utf-8').trim().split('\n');
    const sequence = inputAsArray[0];
    const mapping = inputAsArray.slice(2);
    console.log(sequence)
    console.log(mapping);
    const map : Map<string, string> = new Map<string, string>()
    mapping.forEach(l => {
        let [from, to] = l.split(' -> ');
        to = from.substring(0, 1) + to;
        map.set(from, to);
    })

    console.log(map);

    let mapped = sequence;
    console.log(mapped);
    for (let i = 0; i < 10; i++) {
        let test = chunkSubstr(mapped)!.map(c => map.get(c))
        mapped = test.join('')+mapped.split('').pop();
        console.log(mapped);
    }

    // https://stackoverflow.com/questions/19480916/count-number-of-occurrences-for-each-char-in-a-string
    const result = [...mapped].reduce((res: any, char: any) => (res[char] = (res[char] || 0) + 1, res), {})
    const max = Math.max(...Object.values(result).map(Number));
    const min = Math.min(...Object.values(result).map(Number))
    console.log(max-min);
}

function chunkSubstr(str: string) {
    const chunks = new Array(str.length-1)

    for (let i = 0; i < str.length-1; i++) {
        chunks[i] = str.substring(i, i+2);
    }

    return chunks
}
main();
