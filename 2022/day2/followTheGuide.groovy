import groovy.transform.Memoized

String[] inputAsList = new File("input").collect()

def pointsForEachBattleA = calculateA inputAsList
def pointsForEachBattleB = calculateB inputAsList

println pointsForEachBattleA.sum()
println pointsForEachBattleB.sum()

List<Integer> calculateA(inputAsList) {
    inputAsList.collect { calculateIndividualBattlesB(it) }
}

List<Integer> calculateB(inputAsList) {
    inputAsList.collect { calculateIndividualBattlesA(it) }
}

@Memoized
int calculateIndividualBattlesA(battle) {
    switch (battle) {
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

@Memoized
int calculateIndividualBattlesB(battle) {
    switch (battle) {
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





