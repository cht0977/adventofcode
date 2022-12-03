package day3

import groovy.transform.Memoized

String[] input = new File("input").collect()

def resultSets = input.collect { line -> createSetWithAllPriorities(line) }
def intersectLikeAManiac = resultSets.collate(3).collect {it -> it.inject {a, b -> a.intersect(b)}[0]}

println intersectLikeAManiac.sum()


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