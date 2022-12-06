package day5


def input = new File("input")
def stacks = readStacks(input)
List<List<Integer>> moves = readMoves(input)

doWhatKranfuehrerUsuallyDo(stacks, moves)
doWhatKranfuehrerUsuallyDoB(stacks, moves)
//Not yet finished, but no energy left
stacks.each {it-> if(!it.isBlank()) {
    print it[0]
}}

String[] readStacks(input) {
    String[] stacks = [""]*10
    input.eachLine {line ->
        line.eachWithIndex { String entry, int i ->
            if (entry == '[') {
                stacks[((i+1)/4) as int] += line[i+1]
            }
        }
    }
    stacks
}

int[][] readMoves(input) {
    (Integer[][]) input.findAll {it.contains("move")}.collect {it-> it.findAll( /\d+/ )*.toInteger()}
}

String[] doWhatKranfuehrerUsuallyDo(String[] stacksOriginal, moves) {
    def stacks = stacksOriginal
    moves.forEach(it -> moveSingle(stacks, it[0], it[1], it[2]))
    stacks
}

String[] doWhatKranfuehrerUsuallyDoB(String[] stacksOriginal, moves) {
    def stacks = stacksOriginal
    moves.forEach(it -> moveMultiple(stacks, it[0], it[1], it[2]))
    stacks
}

String[] moveMultiple (String[] stacks, int amount, int from, int to) {
    def toMove = stacks[from-1].substring(0, amount)
    stacks[from-1] = stacks[from-1].substring(amount)
    stacks[to-1] = toMove + stacks[to-1]
    stacks
}

String[] moveSingle(String[] stacks, int amount, int from, int to) {
    for (i in 0..<amount) {
        def toMove = stacks[from-1][0]
        stacks[from-1] = stacks[from-1].substring(1)
        stacks[to-1] = toMove + stacks[to-1]
    }
    stacks
}
