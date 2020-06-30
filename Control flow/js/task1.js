// Task #1. Check the user
// Write the code which verify user rights.

// Step 1. Check login
//     • Ask user for a login // use prompt()
//     • If the input is an empty line or Esc – show “Canceled.” // for showing - use alert()
//     • If the input length less than 4 symbols - show “I don't know any users having name length less than 4 symbols”. 
//     • If it’s another string – then show “I don’t know you”.
//     • If the visitor enters "User" or "Admin", then prompt for a password.

// Step 2. Check password:
//     • For an empty string or cancelled input, show “Canceled.”
//     • For login “User” correct password is “UserPass”, for “Admin” correct password is  “RootPass”. In other case, show “Wrong password”.

// Step 3. Greets the user appropriately:
//     • If the current time in hours is less than 20: // current hours – new Date().getHours()
//         ◦ For “User” show “Good day, dear User!”
//         ◦ For “Admin” show “Good day, dear Admin!”
//     • If the current time in hours is more or equals 20
//         ◦ For “User” show “Good evening, dear User!”
//         ◦ For “Admin” show “Good evening, dear Admin!”

let login = prompt('Enter your login', ''),
    pass,
    currentHours;
const minSymb = 4,
    hoursEight = 8,
    hoursTwenty = 20;
if (login === '' || login === null) {
    alert('Canceled');
} else if (login.length < minSymb) {
    alert('I don’t know any users having name length less than 4 symbols');
} else if (login === 'User' || login === 'Admin') {
    pass = prompt('Enter your password', '');
    if (pass === '' || pass === null) {
        alert('Canceled');
    } else if (login === 'User' && pass === 'UserPass' ||
        login === 'Admin' && pass === 'RootPass') {
        currentHours = new Date().getHours();
        if (currentHours >= hoursEight && currentHours < hoursTwenty) {
            alert(`Good day, dear ${login}!`);
        } else {
            alert(`Good evening, dear ${login}!`);
        }
    } else {
        alert('Wrong password');
    }
} else {
    alert('I don’t know you');
}