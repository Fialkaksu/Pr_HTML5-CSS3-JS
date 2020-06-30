// Task 1. You need to calculate amount of tip to give in a restaurant/cafe.
// 	Workflow:
//     1. User inputs check number. (Use “prompt” function).
//     2. User inputs tip percentage. (Use “prompt” function)
//     3. You need to validate the input data: both values should be numbers, 
//     total sum can’t be a negative number, percentage can’t be negative and bigger than 100. 
//     4. If input data isn’t valid, you should show message “Invalid input data”. (Use “alert” function).
//     5. You need to calculate tip amount and total sum to pay.
//     6. Show message: (example). Use ”alert” function
// Check number: 200
// Tip: 15%
// Tip amount: 30
// Total sum to pay:  230

// You should show only 2 numbers after comma (if needed).

let check,
    tip,
    tipAmount,
    total = 0,
    numHundred = 100,
    numTwo = 2;
check = prompt('Enter your check number', '');
tip = prompt('Enter the tip percentage', '');
let checkInt = Number(parseFloat(check).toFixed(numTwo)),
    tipInt = Number(parseFloat(tip).toFixed(numTwo));
if (check === '' || tip === '' ||
    check === null || tip === null ||
    checkInt < 0 || tipInt < 0 || tipInt > numHundred ||
    isNaN(checkInt) || isNaN(tipInt)) {
    alert('Invalid input data');
} else {
    tipAmount = Number((checkInt * tipInt / numHundred).toFixed(numTwo));
    total = checkInt + tipAmount;
    alert(`Check number: ${checkInt}
Tip: ${tipInt}%
Tip amount: ${tipAmount}
Total sum to pay:  ${total}`);
}