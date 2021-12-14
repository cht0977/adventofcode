import {readFileSync} from "fs";

interface Cave {
    start: string;
    neighbors: Cave[];
    visited: boolean;
    large: boolean;
    amtVisited: number;
}

function dfs(caves: Cave[], nodeName: string, end: string, pathStack: string[]): number {
    let deepCopiedCaves = caves.map(c =>  ({start: c.start, neighbors: c.neighbors.slice(), visited: c.visited, large: c.large, amtVisited: c.amtVisited}));
    const node = deepCopiedCaves.find(c => c.start == nodeName)!;
    node.neighbors = node.neighbors.map(n => deepCopiedCaves.find(c => c.start == n.start)!)
    pathStack.push(node.start);
    if (node.start == end) {
        console.log(pathStack.join('->'))
        return 1;
    }

    node.visited = true;
    node.amtVisited++;
    if(node.amtVisited == 2 && !node.large) {
        deepCopiedCaves = deepCopiedCaves.map(c => {
            c.amtVisited++;
            return c;
        });
    }
    const stack = node.neighbors.filter(nc => !(nc.visited && !nc.large && nc.amtVisited >=2));
    let res = 0;
    while (stack.length > 0) {
        const nnode = stack.pop()!;
        res += dfs(deepCopiedCaves, nnode.start, end, [...pathStack]);
    }
    return res;
}

function initNode(goal: string) {
    const large = goal.charAt(0).toUpperCase() == goal.charAt(0);
    return {start: goal, neighbors: [], visited: false, large: large, amtVisited: 0}
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
    caves.find(c => c.start == 'start')!.amtVisited = 2;

    console.log(dfs(caves, 'start', 'end', []));
}

main()
