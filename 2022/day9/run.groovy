package day9

final Map<String, Position> movements = [
        'R': new Position(1, 0),
        'L': new Position(-1, 0),
        'U': new Position(0, 1),
        'D': new Position(0, -1)
]

Set<Position> visitedCoordinates = [new Position(0, 0)]
Position relativePosition = new Position(0, 0)
def headsLastCoordinates = new Position(0, 0)

new File("input").collect {it as String}.each { it->
    String[] allMovesFromLine = [it[0]]*(it.split(' ')[1] as int)
    allMovesFromLine.each {moveInput ->
        relativePosition = calculatePositionAfterMove(relativePosition, moveInput, movements)
        def headsNewCoordinates = calculatePositionAfterMove(headsLastCoordinates, moveInput, movements)
        if(tailHasToMove(relativePosition)) {
            visitedCoordinates.add(headsLastCoordinates)
            relativePosition = calculateNewRelativePositionAfterMoving(relativePosition)
        }
        headsLastCoordinates = headsNewCoordinates
    }
}

println visitedCoordinates
println visitedCoordinates.size()


Position calculatePositionAfterMove(relativePosition, moveInput, movements) {
    movements[moveInput].add(relativePosition)
}

Position calculateNewRelativePositionAfterMoving(Position relativePosition) {
    if(Math.abs(relativePosition.x()) == 2) {
        return relativePosition.x() > 0 ? new Position(1, 0) : new Position(-1, 0)
    }
    return relativePosition.y() > 0 ? new Position(0, 1) : new Position(0, -1)
}

boolean tailHasToMove(Position relativePosition) {
    return Math.abs(relativePosition.x()) == 2 || Math.abs(relativePosition.y()) == 2
}


