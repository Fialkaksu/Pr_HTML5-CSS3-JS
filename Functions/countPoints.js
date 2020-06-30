// Task #7
// Our football team completed the championship. The result of each match look like "x:y". 
// Results of all matches are recorded in the collection like this: ["3:1", "2:2", "0:1", ...]

// Write a function – countPoints
// It should accept a collection of football games scores and count the points of our team in the championship. 
// Rules for counting points for each match:
//     • if x > y   - 3 points
//     • if x < y   - 0 point
//     • if x = y   - 1 point

// Tip: there are 10 matches in the championship
//     • 0 <= x <= 4
//     • 0 <= y <= 4
//     • Consider reusing of isBigger function

function isBigger(firstNum, secondNum) {
	return firstNum > secondNum;
}
function countPoints(collectionScores) {
	let points = 0;
	collectionScores.forEach(el => {
		let x = el.charAt(0);
		let y = el.charAt(el.length - 1);
		if (x === y) {
			points += 1;
		} else if (isBigger(x, y)) {
			points += 3;
		} else {
			points += 0;
		}
	});
	return points;
}
countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0']);
countPoints(['1:1', '1:2', '2:0', '4:2', '0:1', '2:3', '1:1', '0:1', '1:1', '3:0']);