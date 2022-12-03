package day3

import groovy.transform.Memoized

String[] input = new File("input").collect()

def resultSets = input.collect { line ->
    def (firsthalf, secondhalf) = line.toList().collate((line.length()/2) as int)*.join()
    def resultset = createSetWithAllPriorities(firsthalf).intersect(createSetWithAllPriorities(secondhalf))
    resultset
}

println resultSets.sum {it[0]}


Set createSetWithAllPriorities (line) {
    Set<Integer> set = []
    line.each {it -> set.add(getIndexForCharacter(it))}
    set
}

@Memoized
int getIndexForCharacter(stringCharacter)  {
    char c = stringCharacter as char
    return c.lowerCase ? (c as int) - 96 : (c as int) - 38
}


