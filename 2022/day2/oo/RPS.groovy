package day2.oo

enum RPS {
    ROCK("rock", 1),
    PAPER("paper", 2),
    SCISSORS("scissors", 3)

    final String id;
    final int points;
    RPS(String id, int points) {
        this.id = id
        this.points = points
    }
}