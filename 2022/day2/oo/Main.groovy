package day2.oo

Match[] matches = new File("input").collect( it -> new Match(it))
def result = new Tournament(matches).calculateOverallPoints()
println result

ResultInstructions[] instructions = new File("input").collect( it -> new ResultInstructions(it))
result = new Tournament(matches).calculateOverallPoints()
println result


