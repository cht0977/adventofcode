package day01

import day2.oo.Match

int[] strings = new File("input").collect {it as int}

int larger = 0
strings.eachWithIndex { int entry, int i ->
    if(i+3 < strings.length && entry < strings[i+3]) {
        larger++
    }
}

println(larger)
