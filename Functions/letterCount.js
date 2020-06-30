// Task #6
// Write a function – letterCount
// It accepts two string arguments and returns an integer of the count 
// of occurrences the 2nd argument is found in the first one.
// If no occurrences can be found, a count of 0 should be returned.

function letterCount(str, letter) {
	return str.toLowerCase().split(letter).length - 1;
}
letterCount("Maggy", "g");
letterCount("Barry", "b");
letterCount("", "z");