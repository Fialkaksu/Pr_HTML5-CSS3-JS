// Task #5
// Write a function - positiveSum
// It should accept an array of numbers and return a result of their addition. 
// But you must calculate only positive numbers and omit negative if any presents.

function positiveSum(arrNums) {
	return arrNums.filter(el => el > 0).reduce(((sum, currNum) => sum + currNum), 0);
}
positiveSum([2, 4, 6, 8]);
positiveSum([0, -3, 5, 7]);