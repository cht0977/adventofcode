import {readFileSync} from "fs";

interface Cave {
    start: string;
    neighbors: Cave[];
    visited: boolean;
    large: boolean;
}

function dfs(caves: Cave[], nodeName: string, end: string, pathStack: string[]): number {
    const deepCopiedCaves = caves.map(c =>  ({start: c.start, neighbors: c.neighbors.slice(), visited: c.visited, large: c.large}));
    const node = deepCopiedCaves.find(c => c.start == nodeName)!;

    if (node.visited && !node.large) return 0;

    pathStack.push(node.start);
    if (node.start == end) {
        console.log(pathStack.join('->'))
        return 1;
    }

    node.visited = true;
    const stack = [...node.neighbors];
    let res = 0;
    while (stack.length > 0) {
        const nnode = stack.pop()!;
        res += dfs(deepCopiedCaves, nnode.start, end, [...pathStack]);
    }
    return res;
}

function initNode(goal: string) {
    const large = goal.charAt(0).toUpperCase() == goal.charAt(0);
    return {start: goal, neighbors: [], visited: false, large: large}
}

function main() {
    const caves: Cave[] = []
    readFileSync('input.txt', 'utf-8').trim().split('\n')
        .forEach(l => {
            const [start, goal] = l.split('-');
            let cave = caves.find(c => c.start == start)
            let neighbor = caves.find(c => c.start == goal);
            if (!cave) {
                cave = initNode(start);
                caves.push(cave);
            }
            if (!neighbor) {
                neighbor = initNode(goal);
                caves.push(neighbor);
            }
            neighbor.neighbors.push(cave);
            cave.neighbors.push(neighbor);
        });


    caves.find(c => c.start == 'end')!.large = true;
    console.log(dfs(caves, 'start', 'end', []));
}

main()
