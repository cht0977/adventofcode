import {readFileSync} from "fs";

interface Node {
    distance: number,
    previous?: Node,
    posX: number,
    posY: number,
    weight: number,
}
const isInRangeOfArray = (width: number, height: number) => (n: number[]) => 0 <= n[0] && n[0] < width && 0 <= n[1] && n[1] < height;



function initGraph(inputAsArray: number[][]) {
    const H = inputAsArray.length;
    const W = inputAsArray[0].length;

    const graph: Node[] = new Array(H * W);
    for (let y = 0; y < W; y++) {
        for (let x = 0; x < H; x++) {
            graph[(y*W)+x] = ({posY: y, posX: x, weight: inputAsArray[y][x], distance: Infinity})
        }
    }
    graph[0].distance = 0;
    const q = [...graph];

    return [q, graph];
}

function getShortestDistance(graph: Node[]) {
    const goal = graph[graph.length-1]
    const way = [goal];
    let u = goal;
    while(u.previous) {
        u = u.previous;
        way.push(u);
    }
    return way;
}

function main() {
    const inputAsArray: Array<Array<number>> = readFileSync('input.txt', 'utf-8').trim().split('\n').map(l => l.split('').map(Number));
    const W = inputAsArray[0].length;
    const H = inputAsArray.length;

    const[q, graph] = initGraph(inputAsArray);
    let u: Node;
    while(q.length > 0) {
        q.sort((a, b) => b.distance - a.distance);
        u = q.pop()!;
        [[0,1],[0,-1],[-1,0],[1,0]].map(r => [r[0]+u.posX, r[1]+u.posY]).filter(isInRangeOfArray(W, H)).map(pos => graph[pos[1]*W + pos[0]])
            .filter(neighbor => q.findIndex(n => n.posY == neighbor.posY && n.posX == neighbor.posX) >= 0)
            .map(v => {
                let alt = u.distance + v.weight;
                if (alt < v.distance) {
                    v.distance = alt;
                    v.previous = u;
                }
                return v;
            })
            .forEach(v => graph[v.posY*W + v.posX] = v);
    }

    const res = getShortestDistance(graph);
    console.log(res[0].distance);
}

main()
