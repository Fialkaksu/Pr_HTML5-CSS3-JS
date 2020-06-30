// Task #2. Guessing game
// Your task is to write a simple simulator of casino roulette. 

// Requirements:
// Step 1:
//     • Create a prompt window (use confirm()). 
//     Show the message inside the window ‘Do you want to play a game?’.
//     • In case the user clicks the 'Cancel' button, 
//     the message 'You did not become a billionaire, but can.' should be shown (use alert).
// Step 2:
//     • If user clicked ‘Ok’ – start a game: randomly (use Math.random()) choose an integer number 
//     in range [0; 5] (including 0 and 5) and ask user to enter a number of pocket on which 
//     the ball could land (use prompt()).
//     • User has 3 attempts to guess a number.
//     • If user guessed the number on which ball landed, on 1-st attempt prize is 100$ 
//     (maximum prize for current numbers range), 2-nd attempt – 50$, 3-rd attempt – 25$. 
//     • If user did not guess a number show the message ‘Thank you for your participation. 
//     Your prize is: … $’ (Use alert) and ask if he wants to play again (use confirm).
// Step 3:
//     • If user did guess - Show the message ‘Congratulation, you won!   Your prize is: … $. 
//     Do you want to continue?’.
//     • If user does not want to continue – show the message ‘Thank you for your participation. 
//     Your prize is: … $’ (Use alert) and ask if he wants to play again (use confirm).
//     • If user does want to continue, make number range bigger at 5 as the previous one 
//     (for example [0; 5] -> [0; 10]), and two times bigger maximum prize 
//     (for example on 1-st attempt prize will be 200$, 2-nd attempt – 100$, 3-rd attempt – 50$). 
//     Prize must be added to the previous one and number of attempts should be set to 3 
//     (user should have 3 attempts to guess a number for each numbers range)
//     • Each time you ask user to enter a number you should show him a range of cells, 
//     how much attempts he has left, his total prize and possible prize on current attempt.
//     • All these stuffs should be repeated until user lose or decide to quit

let game = true,
    randomNum,
    userNum,
    max = 5,
    attempts = 3,
    prize = 100,
    totalPrize = 0,
    again;
const attemptsDefault = 3,
    prizeChange = 2,
    randomNumChange = 5;
while (game) {
    game = confirm('Do you want to play a game?');
    if (game === false) {
        alert('You did not become a billionaire, but can.');
        break;
    } else {
        randomNum = Math.floor(Math.random() * (max + 1));
        while (attempts > 0) {
            userNum = Number(prompt(`Choose a roulette pocket number from 0 to ${max} 
Attempts left: ${attempts}
Total prize: ${totalPrize}$ 
Possible prize on current attempt ${prize}$`, ''));
            if (userNum !== randomNum) {
                alert(`Thank you for your participation. Your prize is: ${totalPrize} $`);
                again = confirm('Do you want to play again?');
                if (again) {
                    attempts--;
                    prize /= prizeChange;
                    if (attempts === 0) {
                        alert('Sorry, you have no more attempts. You did not become a billionaire, but can.');
                        game = false;
                        break;
                    }
                } else {
                    game = false;
                    break;
                }
            } else {
                totalPrize += prize;
                again = confirm(`Congratulation, you won!   Your prize is: ${totalPrize} $. Do you want to continue?`);
                if (again) {
                    max += randomNumChange;
                    randomNum = Math.floor(Math.random() * (max + 1));
                    prize *= prizeChange;
                    attempts = attemptsDefault;
                    game = true;
                } else {
                    alert(`Thank you for your participation. Your prize is: ${totalPrize} $`);
                    again = confirm('Do you want to play again?');
                    if (again) {
                        max += randomNumChange;
                        randomNum = Math.floor(Math.random() * (max + 1));
                        prize *= prizeChange;
                        attempts = attemptsDefault;
                        game = true;
                    } else {
                        game = false;
                        break;
                    }
                }
            }
        }
    }
}