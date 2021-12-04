import {readFileSync} from "fs";

main()

function getWinningIndexForArrayOfFife(bingoNumbers: Array<number>, arrayOfFife: Array<number>) {
    let i = 0;
    let clonedLine = [...arrayOfFife];
    for(let n of bingoNumbers){
        clonedLine = clonedLine.filter(el => el !== n);
        if(clonedLine.length == 0) {
            break;
        }
        i++;
    }
    return i;
}

function findBoardForWinningIndex(horizontalLines: Array<Array<number>>, index: number) {
    let lowerIndex = Math.floor(index/5)*5;
    return horizontalLines.splice(lowerIndex, 5);
}

function removeUsedNumbersFromBoardUpToWinningIndex(winningBoard: Array<number>[], winningIndex: number, bingoNumbers: number[]) {
    let flatBoard = winningBoard.flat();
    for (let i = 0; i <= winningIndex; i++) {
        flatBoard = flatBoard.filter(n => n !== bingoNumbers[i]);
    }
    console.log(flatBoard);
    return flatBoard;
}

function main() {
    const inputAsArray: Array<string> =  readFileSync('input.txt', 'utf-8').trim().split('\n').filter(String);
    const bingoNumbers = inputAsArray.shift()!.split(',').map(n => +n);
    const horizontalLines: Array<Array<number>> = inputAsArray.map(line => line.match(/.{1,3}/g)!.map(l => +l))
    const verticalLines: Array<Array<number>> = []
    const fst: Array<number>= [];
    const snd: Array<number> = [];
    const thr: Array<number> = [];
    const fth: Array<number> = [];
    const fifth: Array<number> = [];
    horizontalLines.forEach(l => {
        fst.push(l[0]);
        snd.push(l[1]);
        thr.push(l[2]);
        fth.push(l[3]);
        fifth.push(l[4]);
    })
    while (fst.length > 0) {
        verticalLines.push(fst.splice(0,5))
        verticalLines.push(snd.splice(0,5))
        verticalLines.push(thr.splice(0,5))
        verticalLines.push(fth.splice(0,5))
        verticalLines.push(fifth.splice(0,5))
    }

    const horizontalLinesWithEachWinningIndex = horizontalLines.map((n, index) => [index, getWinningIndexForArrayOfFife(bingoNumbers, n)])
    const verticalLinesWithEachWinningIndex = verticalLines.map((n, index) => [index, getWinningIndexForArrayOfFife(bingoNumbers, n)])
    let minVertical = verticalLinesWithEachWinningIndex.reduce((a,b) => a[1] < b[1] ? a : b);
    let minHorizontal = horizontalLinesWithEachWinningIndex.reduce((a,b) => a[1] < b[1] ? a : b);
    let betterLines = [];
    let winningIndexOfBingoNumber;
    let indexOfWinningLine;
    if(minHorizontal[1] < minVertical[1]) {
        betterLines = horizontalLines;
        winningIndexOfBingoNumber = minHorizontal[1];
        indexOfWinningLine = minHorizontal[0];
    } else {
        betterLines = verticalLines;
        winningIndexOfBingoNumber = minVertical[1];
        indexOfWinningLine = minVertical[0];
    }
    const winningBingoNumber = bingoNumbers[winningIndexOfBingoNumber];

    const winningBoard = findBoardForWinningIndex(betterLines, indexOfWinningLine);
    console.log('winningBoard', winningBoard)
    const unmarkedNumbers = removeUsedNumbersFromBoardUpToWinningIndex(winningBoard, winningIndexOfBingoNumber, bingoNumbers);
    console.log('unmarkedNumbers', unmarkedNumbers);
    const sumOfUnmarkedNumbers = unmarkedNumbers.reduce((a,b) => a + b);
    console.log('winningBingoNumber', winningBingoNumber);
    const result = sumOfUnmarkedNumbers * winningBingoNumber;
    console.log('res', result);


}

main();
