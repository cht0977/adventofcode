import {readFileSync} from "fs";

const increaseDumbiEnergyLevelByOne = (dumbi: number[][]) => dumbi.map(l => l.map(n => n + 1));
const isInRangeOfArray = (width: number, height: number) => (n: number[]) => 0 <= n[0] && n[0] < width && 0 <= n[1] && n[1] < height;


const resetEnergyLevelOfFlashedDumbi = (dumbi: number[][]) => {
    return dumbi.map(l => l.map(d => {
        if (d >= 10)
            return 0;
        else return d;
    }));
};

function increaseDumbiEnergyLevelAtAdjastentPositions(dumbi: number[][], x: number, y: number) {
    [[0, 1],[0, -1],[1, 1],[1, -1],[-1, 1],[-1, -1],[1, 0],[-1, 0]]
        .map(n => [n[1] + y,n[0] + x]).filter(isInRangeOfArray(dumbi.length, dumbi.length)).forEach(pos => {
            if(dumbi[pos[0]][pos[1]] < 10)
                dumbi[pos[0]][pos[1]]++
        })
}

function boom(dumbi: number[][]) {
    const toChange = dumbi.map((l, y) => l.map((d,x) => [d, y, x]).filter(r => r[0] == 10));
    toChange.forEach(l => l.forEach(r => {
        dumbi[r[1]][r[2]]++;
        increaseDumbiEnergyLevelAtAdjastentPositions(dumbi, r[2], r[1]);
    }));
}

function makeThemBlowUp(dumbi: number[][], flashes: number): number {
    const amountOfDumbiAboutToExplode = dumbi.map((l) => l.filter(d => d == 10))
        .map(l => l.length).reduce((a,b) => a + b);
    if(amountOfDumbiAboutToExplode === 0) return flashes;

    flashes += amountOfDumbiAboutToExplode;
    boom(dumbi);
    return makeThemBlowUp(dumbi, flashes);
}

function countAmountOfFlashes(dumbi: number[][], steps: number) {
    let flashes: number = 0;
    for (let i = 0; i < steps; i++) {
        dumbi = increaseDumbiEnergyLevelByOne(dumbi);
        flashes += makeThemBlowUp(dumbi, 0);
    }
    return flashes;
}

function b(dumbi: number[][]) {
    for (let i = 0; i < Infinity; i++) {
        dumbi = increaseDumbiEnergyLevelByOne(dumbi);
        makeThemBlowUp(dumbi, 0);
        const amountOfDumbiAboutToExplode = dumbi.map((l) => l.filter(d => d >= 10))
            .map(l => l.length).reduce((a,c) => a + c);

        if(amountOfDumbiAboutToExplode == 100) {
            return i;
        }

        dumbi = resetEnergyLevelOfFlashedDumbi(dumbi);
    }
}

function main() {
    const inputAsMatrix: string[] = readFileSync('input.txt', 'utf-8').trim().split('\n');

    const dumbi: number[][] = inputAsMatrix.map(l => l.split('').map(Number));

    const amountOfFlashes= countAmountOfFlashes(dumbi, 100);
    console.log(amountOfFlashes)

    const syncIndex = b(dumbi);
    console.log(syncIndex!+1);
}

main()
