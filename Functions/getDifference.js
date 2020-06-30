// Task #4	
// Write a function - getDifference
// It should accept two arguments as numbers and return their difference. 
// But the function never returns a negative value. 
// If second parameter is greater than  first one, function will change their order.

// Tip: consider reusing isBigger function 

function isBigger(firstNum, secondNum) {
	return firstNum > secondNum;
}
function getDifference(firstNum, secondNum) {
	if (isBigger(firstNum, secondNum)) {
		return firstNum - secondNum;
	} else {
		return secondNum - firstNum;
	}
}
getDifference(5, 3);
getDifference(5, 8);
getDifference(13, -27);