package day9;

record Position(int x, int y) {
	Position add(Position p) {
		return new Position(this.x() + p.x(), this.y() + p.y())
	}

	Position diff(Position p) {
		return new Position(this.x() - p.x(), this.y() - p.y())
	}
}
