package day03

String[] strings = new File("input").collect()

int[] forwards = strings.findAll {it.contains('forward')}.collect {it.split(' ')[1] as int}
int[] down = strings.findAll {it.contains('down')}.collect {it.split(' ')[1] as int}
int[] up = strings.findAll {it.contains('up')}.collect {it.split(' ')[1] as int}


int result = forwards.sum() * (down.sum()-up.sum())
print result


