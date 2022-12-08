package day7

def input = new File('input').collect {it as String}

def workdir = ''
record Search(BigInteger size, boolean searched) {}
Map<String, Search> allFoldersWithSizes = [:]
input.eachWithIndex { line, idx ->
    switch (line) {
        case {it.contains(' cd ')} -> {
            def dir = line.split(' ')[-1]
            if (dir == '..') {
                def array = workdir.split('/').toList()
                array.removeLast()
                workdir = array.join("/") + '/'
            } else {
                workdir += dir + '/'
            }
        }
        case {it.startsWith('\$ ls')}-> {
            def sizeOfAllFiles = 0
            idx++
            while(idx < input.size() && !input [idx].startsWith("\$")) {
                if(!input [idx].startsWith("dir")) {
                    def fileSize = input[idx].split(' ')[0] as BigInteger
                    sizeOfAllFiles += fileSize
                }
                idx++
            }
            allFoldersWithSizes.put(workdir.substring(1), new Search(sizeOfAllFiles, false))
        }
    }
}


calculateSizes(allFoldersWithSizes, '/')

println getSumOfSizeOfSmallFolders(allFoldersWithSizes)

BigInteger spaceToDelete = 30000000 - (70000000 - allFoldersWithSizes.get('/').size)
println "spaceToDelete $spaceToDelete"
println allFoldersWithSizes.values().findAll {it -> it.size >= spaceToDelete}.sort()[0]



BigInteger getSumOfSizeOfSmallFolders(allFoldersWithSizes) {
    allFoldersWithSizes.values().findAll {it -> it.size <= 100000 }.inject(0, {a, b -> a+b.size})
}



BigInteger calculateSizes(Map<String, Search> allFoldersWithSize, String current) {
    allFoldersWithSize[current] = new Search(allFoldersWithSize[current].size, true)
    BigInteger sumOfSubPathSizes = 0G
    int currentDepth = current == '/' ? 1 : (current.split('/').size())
    allFoldersWithSize.keySet().findAll{it.startsWith(current) && it.split('/').size() == currentDepth+1 && !allFoldersWithSize[it].searched()}.each{it -> {
        sumOfSubPathSizes += calculateSizes(allFoldersWithSize, it)
    }}
    def size = allFoldersWithSize[current].size + sumOfSubPathSizes
    allFoldersWithSize[current] = new Search(size, true)
    return size
}

