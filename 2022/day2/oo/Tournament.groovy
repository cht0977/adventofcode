package day2.oo

class Tournament {
    PointCalculator pointCalculator
    GameCalculator gameCalculator
    Match[] matches

    Tournament(matches) {
        pointCalculator = new PointCalculator()
        gameCalculator = new GameCalculator()
        this.matches = matches
    }

    Tournament(ResultInstructions[] instructions) {
        pointCalculator = new PointCalculator()
        gameCalculator = new GameCalculator()
        matches = instructions.collect {
            def myMove = gameCalculator.calculateRPSForExpectedResult(it)
            new Match(myMove, it.enemyMove)
        }
    }


    int calculateOverallPoints() {
        def points = matches.collect {match ->
//            print "${match.myself.id} vs ${match.enemy.id}"
            def result = gameCalculator.calculateGameResult(match)

            pointCalculator.calculatePoints(match.myself, result)
        }
        points.sum()
    }
}
