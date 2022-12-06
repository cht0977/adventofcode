package day6

def input = new File("input").text

println searchForDistinctLettersWithLength(input, 4)
println searchForDistinctLettersWithLength(input, 14)

def searchForDistinctLettersWithLength(String input, int length) {
    for (i in length-1..<input.length()) {
        String lastCharacters = ''
        for (j in 0..<length) {
            String current = input[i - j]
            if (!lastCharacters.contains(current)) {
                lastCharacters += current
            }
        }
        if (lastCharacters.length() == length) {
            return i + 1
        }
    }
}
