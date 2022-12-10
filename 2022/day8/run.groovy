package day8

class Tree {
    int height
    boolean visibleHorizontally
    boolean visibleVertically
    int scenicScore
    Tree(int height) {
        this.height = height
        this.visibleHorizontally = false
        this.visibleVertically = false
        scenicScore = 0
    }

    boolean isVisible() {
        return this.visibleVertically || this.visibleHorizontally
    }

    @Override
    String toString() {
        return this.height
    }
}

def input = new File('input').collect {it as String }.collect {it.split('').collect {height -> new Tree(height as int)}}
println input

for (i in 0..<input.size()) {
    int max = 0
    for (j in 0..<input[0].size()) {
        Tree current = input[i][j]
        if(j == 0) {
            max = current.height
            current.visibleHorizontally = true
        } else if(current.height > max) {
            current.visibleHorizontally = true
            max = current.height
        }
    }
}

for (i in 0..<input.size()) {
    int jStart = input[0].size()-1
    int max = 0
    for (j in jStart..0) {
        Tree current = input[i][j]
        if(j == jStart) {
            max = current.height
            current.visibleHorizontally = true
        } else if(current.height > max) {
            current.visibleHorizontally = true
            max = current.height
        }
    }
}

for (j in 0..<input[0].size()) {
    int max = 0
    for (i in 0..<input.size()) {
        Tree current = input[i][j]
        if(i == 0) {
            max = current.height
            current.visibleVertically = true
        } else if(current.height > max) {
            current.visibleVertically = true
            max = current.height
        }
    }
}
println input*.visibleVertically


for (j in 0..<input[0].size()) {
    int max = 0
    for (i in (input.size()-1)..0) {
        Tree current = input[i][j]
        if(i == input.size()-1) {
            max = current.height
            current.visibleVertically = true
        } else if(current.height > max) {
            current.visibleVertically = true
            max = current.height
        }
    }
}

println input*.visible

def allVisibleTrees = input.collect {  trees -> trees.count { tree -> tree.isVisible()}}.sum()
println  allVisibleTrees

for (i in 0..<input.size()) {
    for (j in 0..<input[0].size()) {
        Tree current = input[i][j]
        if(j == 0 || j == input[0].size()-1 || i == input.size()-1 || i == 0) {
            current.scenicScore = 0
            continue
        }
        //goLeft
        def dj = 1
        while(j - dj > 0 && current.height > input[i][j-dj].height) {
            dj++
        }
        current.scenicScore = dj

        dj=1
        while(j + dj < input[0].size()-1 && current.height > input[i][j+dj].height) {
            dj++
        }
        current.scenicScore *= dj


        def di = 1
        while(i - di > 0 && current.height > input[i-di][j].height) {
            di++
        }
        current.scenicScore *= di


        di = 1
        while(i + di < input[0].size()-1 && current.height > input[i+di][j].height) {
            di++
        }
        current.scenicScore *= di
    }
}



println input*.scenicScore
println input*.scenicScore.collect {it.max()}.max()

