def input = new File("input").text
def arraywitharrays = input.split("\n\n").collect( {it.split('\n') as List<Integer>} )

def summedArray = arraywitharrays.collect { it.sum { a -> a as int } }
println taskA(summedArray)
println taskB(summedArray)

int taskA(List<Integer> arraywitharrays) {
    return arraywitharrays.max()
}

int taskB(List<Integer> arraywitharrays) {
    def result = arraywitharrays.sort().reverse()
    return result[0..2].sum()
}
