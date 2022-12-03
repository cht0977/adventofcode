package day2.oo

class PointCalculator {
    int calculatePoints(RPS rps, result) {
        def points = rps.points
        switch(result) {
            case RESULT.WIN: return points + 6
            case RESULT.DRAW: return points + 3
            case RESULT.LOSE: return points
        }

    }
}