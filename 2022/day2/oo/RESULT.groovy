package day2.oo

enum RESULT {
    WIN('Z'), LOSE('X'), DRAW('Y')

    def describingChar
    RESULT(describingChar) {
        this.describingChar = describingChar
    }

    static RESULT get(describingChar) {
        return this(describingChar)
    }

}