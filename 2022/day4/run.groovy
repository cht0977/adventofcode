package day4

int calculateAmountOfMatchingPairs(List<List<ArrayList<Integer>>> cleaningSections, Closure<Boolean> matchClosure) {
    int pairs = 0
    cleaningSections.each { it ->
        def (elfrange1, elfrange2) = it[0,1]
        if (matchClosure(elfrange1, elfrange2) || matchClosure(elfrange2, elfrange1)) {
            pairs++
        }
    }
    pairs
}


def completeleySwallows =  { ArrayList range1, ArrayList range2 ->
    (range1[0] <= range2[0] && range1[1] >= range2[1])
}

def partlySwallows =  { ArrayList range1, ArrayList range2 ->
    (range1[0] < range2[0] && range1[1] >= range2[0]) || (range1[0] == range2[0])
}


List<List<ArrayList<Integer>>> cleaningSections = new File("input").collect {it.split(',').collect{ s -> s.split('-')*.toInteger()}}

int pairsA = calculateAmountOfMatchingPairs(cleaningSections, completeleySwallows)
int pairsB = calculateAmountOfMatchingPairs(cleaningSections, partlySwallows)
print "$pairsA, $pairsB"