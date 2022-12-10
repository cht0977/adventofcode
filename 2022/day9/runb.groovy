package day9

run(1)
run(9)

void run(int length) {

    Set<Position> visitedCoordinates = [new Position(0, 0)]
    Position[] distancesBetweenKnots = [new Position(0, 0)] * length
    def currentTailPosition = new Position(0,0)

    new File("input")
            .collect {it as String}
            .collect {[it[0]]*(it.split(' ')[1] as int)}
            .each { allMovesFromLine ->
                allMovesFromLine.collect { instruction -> getMoveForInstruction(instruction) }.each {nextMove ->
                    currentTailPosition = doMoveForInput(nextMove, distancesBetweenKnots, currentTailPosition, visitedCoordinates, length)
                }
            }

    println visitedCoordinates.size()
    println distancesBetweenKnots
    drawResult(visitedCoordinates)

}


Position doMoveForInput(Position moveInput, Position[] distances, Position currentTailPosition, visitedCoordinates, length) {
    Position moveFromPreviousKnot = moveInput
    for (i in 0..length-1) {
        def newDistance = calculateDistanceToPreviousKnot(distances[i], moveFromPreviousKnot)
        if(!currentKnotHasToMove(newDistance)) {
            distances[i] = newDistance
            return currentTailPosition
        }
        def newDistanceToPreviousKnot = calculateNewRelativePositionAfterMoving(newDistance)
        def moveFromCurrentKnot = newDistance.diff(newDistanceToPreviousKnot)
        distances[i] = newDistanceToPreviousKnot
        if(i == length-1) {
            currentTailPosition = calculateDistanceToPreviousKnot(currentTailPosition, moveFromCurrentKnot)
            visitedCoordinates.add(currentTailPosition)
            return currentTailPosition
        }
        moveFromPreviousKnot = moveFromCurrentKnot
    }
}

Position calculateDistanceToPreviousKnot(Position relativePosition, Position move) {
    move.add(relativePosition)
}

Position calculateNewRelativePositionAfterMoving(Position relativePosition) {
    def newX = relativePosition.x() == 0 ? 0 : relativePosition.x() > 0 ? --relativePosition.x() : ++relativePosition.x()
    def newY = relativePosition.y() == 0 ? 0 : relativePosition.y() > 0 ? --relativePosition.y() : ++relativePosition.y()
    new Position(newX, newY)
}

boolean currentKnotHasToMove(Position relativePosition) {
    return Math.abs(relativePosition.x()) == 2 || Math.abs(relativePosition.y()) == 2
}

Position getMoveForInstruction(String instruction) {
    final Map<String, Position> movements = [
            'R': new Position(1, 0),
            'L': new Position(-1, 0),
            'U': new Position(0, 1),
            'D': new Position(0, -1)
    ]
    return movements.get(instruction)
}

void drawResult(Set visitedCoordinates) {
    int minX = visitedCoordinates*.x().min()
    int minY = visitedCoordinates*.y().min()
    int maxX = visitedCoordinates*.x().max()
    int maxY = visitedCoordinates*.y().max()

    for(y in maxY+2..minY-2) {
        for (x in minX-2..maxX+2) {
            if(x == 0 && y ==0) {
                print "s"
            }
            else if(visitedCoordinates.contains(new Position(x, y))) {
                print "#"
            } else {
                print "."
            }
        }
        println()
    }
}
