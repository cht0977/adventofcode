package day2.oo

class GameCalculator {
    def winnerMap = [:]
    GameCalculator() {
        winnerMap.put(RPS.ROCK, RPS.SCISSORS)
        winnerMap.put(RPS.PAPER, RPS.ROCK)
        winnerMap.put(RPS.SCISSORS, RPS.PAPER)
    }

    RESULT calculateGameResult(Match match) {
        if(match.myself == match.enemy) return RESULT.DRAW

        if(winnerMap[match.myself] == match.enemy) return RESULT.WIN

        return RESULT.LOSE
    }

    RPS calculateRPSForExpectedResult(ResultInstructions instructions) {
        def calculatedRPS;
        winnerMap.each { entry ->
            if (instructions.expectedResult == calculateGameResult(new Match(entry.key, instructions.enemyMove))) calculatedRPS = entry.key
        }
        return calculatedRPS
    }
}