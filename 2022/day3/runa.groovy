package day3

def getIndexForCharacter = {it ->
    char c = it as char
    return  c.lowerCase ? (c as int) - 96 : (c as int) - 38
}

String[] input = new File("input").collect()

def resultArrays = input.collect { line ->
    int[] letters = [0]*53
    def (firsthalf, secondhalf) = line.toList().collate((line.length()/2) as int)*.join()
    firsthalf.each {it -> letters[getIndexForCharacter(it)] = 1}
    secondhalf.each {it ->
        int idx = getIndexForCharacter(it)
        if(letters[idx] > 0) {
            letters[idx] = 2
        }
    }
    letters
}
def arrayWithSummedPriorities = resultArrays.collect { arr ->
    int priority = 0
    arr.eachWithIndex { int entry, int i -> priority += entry > 1 ? (entry - 1) * i : 0 }
    priority
}
println arrayWithSummedPriorities.sum()




