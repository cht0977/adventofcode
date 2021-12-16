import {readFileSync} from "fs";
const { performance } = require('perf_hooks');
// Runtime ~700 ms
interface Node {
    distance: number,
    previous?: Node,
    posX: number,
    posY: number,
    weight: number,
    hit: boolean
}

const isInRangeOfArray = (width: number, height: number) => (n: number[]) => 0 <= n[0] && n[0] < width && 0 <= n[1] && n[1] < height;
const insertNeighborIntoNodesToVisit = (nodesToVisit: Node[]) => (neighbor: Node) => insertSorted(nodesToVisit, neighbor);
const increaseBy = (a: Array<number> , i: number) => a.map(n => (n + i) >= 10 ? (((n + i) % 10) + 1) : (n + i));

function main() {
    const startTime = performance.now()
    const singleInputArray: Array<Array<number>> = readFileSync('input.txt', 'utf-8').trim().split('\n').map(l => l.split('').map(Number));
    const fiveInAline = singleInputArray.map(l => l.concat(increaseBy(l, 1)).concat(increaseBy(l, 2)).concat(increaseBy(l, 3)).concat(increaseBy(l, 4)));
    let extendedInput: number[][] = [...fiveInAline];
    for (let i = 1; i < 5; i++) {
        fiveInAline.forEach(l => extendedInput.push(increaseBy(l, i)));
    }
    const W = extendedInput[0].length;
    const H = extendedInput.length;

    const graph = initGraph(extendedInput);
    const nodesToVisit = [graph[0]]
    let currentNode: Node;
    while(nodesToVisit.length > 0) {
        currentNode = nodesToVisit.pop()!;
        while(currentNode == nodesToVisit[nodesToVisit.length-1]) {
            //Performance boost: Remove following nodes if the are the same as the current node. Might have happened, because of the following algorithm.
            nodesToVisit.pop()
        }

        currentNode.hit = true;
        [[0,1],[0,-1],[-1,0],[1,0]]
            .map(deltaPosition => [deltaPosition[0]+currentNode.posX, deltaPosition[1]+currentNode.posY])
            .filter(isInRangeOfArray(W, H))
            .map(neighborPosition => graph[neighborPosition[1]*W + neighborPosition[0]])
            .filter(neighbor => !neighbor.hit)
            .map(updateDistanceOfNeighbor(currentNode))
            .forEach(insertNeighborIntoNodesToVisit(nodesToVisit));
    }

    const shortestDistance = getShortestDistance(graph);
    console.log(shortestDistance);
    const endTime = performance.now()
    console.log(`Main runtime: ${endTime - startTime} milliseconds`);
}


function initGraph(inputAsArray: number[][]) {
    const H = inputAsArray.length;
    const W = inputAsArray[0].length;

    const graph: Node[] = new Array(H * W);
    for (let y = 0; y < W; y++) {
        for (let x = 0; x < H; x++) {
            graph[(y*W)+x] = ({posY: y, posX: x, weight: inputAsArray[y][x], distance: Infinity, hit: false})
        }
    }
    graph[0].distance = 0;

    return graph;
}

function getShortestDistance(graph: Node[]): number {
    const goal = graph[graph.length-1]
    const way = [goal];
    let u = goal;
    while(u.previous) {
        u = u.previous;
        way.push(u);
    }
    return way[0].distance;
}


function updateDistanceOfNeighbor(currentNode: Node) {
    return function (neighbor: Node) {
        let alt = currentNode.distance + neighbor.weight;
        if (alt < neighbor.distance) {
            neighbor.distance = alt;
            neighbor.previous = currentNode;
        }
        return neighbor;
    };
}

// With the help from https://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers
function insertSorted(arr: Array<Node>, item: Node) {
    // get the index we need to insert the item at
    let min = 0;
    let max = arr.length;
    let index = Math.floor((min + max) / 2);
    while (max > min) {
        if (item.distance > arr[index].distance) {
            max = index;
        } else if (item.distance == arr[index].distance) {
            if(item.posX > arr[index].posX) {
                max = index;
            } else if(item.posX == arr[index].posX) {
                if(item.posY > arr[index].posY) {
                    max = index;
                } else {
                    min = index + 1;
                }
            } else {
                min = index + 1;
            }

        } else {
            min = index + 1;
        }
        index = Math.floor((min + max) / 2);
    }

    // insert the item
    arr.splice(index, 0, item);
};




main()
