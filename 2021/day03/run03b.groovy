package day03
//UNFINISHED cause binary is not so cool
import org.codehaus.groovy.util.StringUtil

String[] strings = new File("input").collect()
def gamma = '0'
for (i in 0..<strings[0].length()) {
    int amountOfOnes = 0

    strings.each {it ->
        if(it[i] == '1')
            amountOfOnes++
    }

    if(amountOfOnes > strings.length/2) {
        gamma += 1
    } else {
        gamma += 0
    }
}


println Integer.parseInt(gamma, 2)



println gamma