def inputAsList = new File("input").collect()

def pointsForEachBattleA = calculateA(inputAsList)
def pointsForEachBattleB = calculateB(inputAsList)

println(pointsForEachBattleA.sum())
println(pointsForEachBattleB.sum())


def calculateB(inputAsList) {
    inputAsList.collect { list ->
        switch(list) {
            case 'A X': return 0 + 3
            case 'B X': return 0 + 1
            case 'C X': return 0 + 2
            case 'A Y': return 3 + 1
            case 'B Y': return 3 + 2
            case 'C Y': return 3 + 3
            case 'A Z': return 6 + 2
            case 'B Z': return 6 + 3
            case 'C Z': return 6 + 1
        }
    }
}


def calculateA(inputAsList) {
    inputAsList.collect { list ->
        switch(list) {
            case 'A X': return 1 + 3
            case 'B X': return 1 + 0
            case 'C X': return 1 + 6
            case 'A Y': return 2 + 6
            case 'B Y': return 2 + 3
            case 'C Y': return 2 + 0
            case 'A Z': return 3 + 0
            case 'B Z': return 3 + 6
            case 'C Z': return 3 + 3
        }
    }
}




