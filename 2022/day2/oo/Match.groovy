package day2.oo

class Match {
    RPS myself
    RPS enemy

    def charToRPS = [
            'A': RPS.ROCK,
            'B': RPS.PAPER,
            'C': RPS.SCISSORS,
            'X': RPS.ROCK,
            'Y': RPS.PAPER,
            'Z': RPS.SCISSORS,
    ]
    Match(String match) {
        myself = charToRPS[match[2]]
        enemy = charToRPS[match[0]]
    }

    Match(RPS myself, RPS enemy) {
        this.myself = myself
        this.enemy = enemy
    }
}
