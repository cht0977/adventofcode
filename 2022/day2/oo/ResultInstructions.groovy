package day2.oo

class ResultInstructions {
    RPS enemyMove
    RESULT expectedResult
    def charToRPS = [
            'A': RPS.ROCK,
            'B': RPS.PAPER,
            'C': RPS.SCISSORS,
            'X': RPS.ROCK,
            'Y': RPS.PAPER,
            'Z': RPS.SCISSORS,
    ]
    ResultInstructions(String instructions) {
        enemyMove = charToRPS[instructions[0]]
        expectedResult = RESULT.get(instructions[2])
    }
}
