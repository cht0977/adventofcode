def input = new File("input") as String[]

def arraywitharrays = [][]
def newSmallArray = []
for (final def str in input) {
    if (str.isBlank()) {
        arraywitharrays.add(newSmallArray.clone())
        newSmallArray.clear()
        continue
    }
    newSmallArray.add(str)
}
arraywitharrays.add(newSmallArray.clone())


def summedArray = arraywitharrays.collect { it.sum { a -> a as int } } as List<Integer>
println taskA(summedArray)
println taskB(summedArray)

int taskA(List<Integer> arraywitharrays) {
    return arraywitharrays.max()
}

int taskB(List<Integer> arraywitharrays) {
    def result = arraywitharrays.sort().reverse()
    return result[0..2].sum()
}
