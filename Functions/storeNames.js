// Task #3
// Write a function - storeNames
// It should accept an arbitrary number of strings and return an array of that strings

function storeNames() {
	let arrNames = [];
	for (let i = 0; i < arguments.length; i++) {
		arrNames.push(arguments[i]);
	}
	return arrNames;
}
storeNames('Nick Fury', 'Iron Man', 'Doctor Strange');