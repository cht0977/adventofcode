package day02

String[] strings = new File("input").collect()
def moveInt = { it->
    it.split(' ')[1] as int
}
int[] forwards = strings.findAll {it.contains('forward')}.collect {moveInt(it)}

int aim = 0
int depths = 0
strings.each {
    if(it.contains('forward')) {
        depths += aim * moveInt(it)
    } else {
        int move = moveInt(it)
        aim += it.contains('up') ? -move : move
    }
}


int result = forwards.sum() * depths
print result


