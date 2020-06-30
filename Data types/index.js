// 1. Write a function that converts the argument values. If it will be a string, 
// convert it to number and wise versa. It should return an array of converted values. 
// convert('1', 2, 3, '4') // [1, '2', '3', 4]

function convert(...args) {
  for (let i = 0; i < args.length; i++) {
    args[i] = typeof args[i] === 'string' ? Number(args[i]) : String(args[i]);
  }
  return args;
}

// 2. Write function, which iterates over array and executes function on each element.
// executeforEach([1,2,3], function(el) {console.log(el * 2)}) // 2 4 6

function executeforEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}

// 3. Write function, which returns transformed array based on function, 
// which passed as a second parameter (callback). 
// If array contains a number as string, it should convert it and return as number. 
// You’re allowed to change a body of that callback function if you need. Reuse function from task 2.
// mapArray([2, '5', 8], function(el) {return el + 3}) // returns [5, 8, 11]

function mapArray(arr, callback) {
  let arrConvert = [];
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'string') {
      arr[i] = parseInt(arr[i]);
    }
    arrConvert.push(arr[i]);
  }
  let arrMap = [];
  executeforEach(arrConvert, function (el) {
    arrMap.push(callback(el));
  });
  return arrMap;
}

// 4. Write function, which returns filtered array based on function, which passed as a parameter. 
// Reuse function from task 2.
// filterArray([2, 5, 8], function(el) { return el % 2 === 0 }) 
// // returns [2, 8]

function filterArray(arr, callback) {
  let arrFiltered = [];
  executeforEach(arr, function (el) {
    if (callback(el)) {
      arrFiltered.push(el);
    }
  });
  return arrFiltered;
}

// 5. Write a function that checks is array contains a passed as 
// a parameter value and return true in this case. Reuse function from task 2. 
// containsValue([2, 5, 8], 2)  // returns true
// containsValue([12, 4, 6], 5)  // returns false

function containsValue(arr, valueLookingFor) {
  let flag = false;
  executeforEach(arr, function (el) {
    if (el === valueLookingFor) {
      flag = true;
    }
  });
  return flag;
}

// 6. Write a function that reverses the string value passed into it
// flipOver('hey world') // 'dlrow yeh'

function flipOver(str) {
  let strReversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    strReversed += str[i];
  }
  return strReversed;
}

// 7. Write a function which creates an array from the given range of numbers
// makeListFromRange([2, 7]) // [2, 3, 4, 5, 6, 7]

function makeListFromRange(arr) {
  let arrFull = [];
  if (arr[0] > arr[1]) {
    arr = [arr[1], arr[0]];
  }
  for (let i = arr[0]; i <= arr[1]; i++) {
    arrFull.push(i);
  }
  return arrFull;
}

// 8. Write a function that accepts an array of object and returns new array of values by passed key name.
// That function should not change the original array. Reuse function from task 2. 
// const fruits = [
//   { name: ‘apple’, weight: 0.5 },
//   { name: ‘pineapple’, weight: 2 }
// ];
// getArrayOfKeys(fruits, ‘name’); 
// // returns [‘apple’, ‘pineapple’]

function getArrayOfKeys(arr, key) {
  let arrOfKeys = [];
  executeforEach(arr, function (el) {
    arrOfKeys.push(el[key]);
  });
  return arrOfKeys;
}

// 9. Write function substitute() that accepts an array of numbers and 
// manages to replace all numbers lower than 20 and greater than 10 with '*'. 
// It should return a new array with numbers and '*' instead of these numbers. Reuse function from task 3.
// substitute([58, 14, 48, 12, 31, 19, 10]); 
// // returns [58, '*', 48, '*', 31, '*', 10]

function substitute(arr) {
  const MAX_CHECK = 20,
    MIN_CHECK = 10;
  let arrSubstituted = [];
  mapArray(arr, function (el) {
    if (el < MAX_CHECK && el > MIN_CHECK) {
      el = '*';
    }
    arrSubstituted.push(el);
  })
  return arrSubstituted;
}

// 10. Write a function which returns a day number that was some amount of days ago from the passed date.
// It should not change the given source date.
// const date = new Date(2020, 0, 2);
// getPastDay(date, 1); // 1, (1 Jan 2020)
// getPastDay(date, 2); // 31, (31 Dec 2019)
// getPastDay(date, 365); // 2, (2 Jan 2019)

function getPastDay(date, daysAgo) {
  const MS_IN_SEC = 1000,
    SEC_IN_MIN = 60,
    MIN_IN_HOUR = SEC_IN_MIN,
    HOURS_IN_DAY = 24;
  let daysAgoMS = daysAgo * MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR * HOURS_IN_DAY;
  return new Date(date - daysAgoMS).getDate();
}

// 11. Write a function that formats a date in such format "YYYY/MM/DD HH:mm".
// formatDate(new Date('6/15/2019 09:15:00')) // "2018/06/15 09:15"
// formatDate(new Date()) // "2020/04/07 12:56" // gets current local time

function formatDate(date) {
  let year = date.getFullYear(),
    month = checkData(date.getMonth() + 1),
    day = checkData(date.getDate()),
    hours = checkData(date.getHours()),
    minutes = checkData(date.getMinutes());

  function checkData(data) {
    const CHECK = 10;
    if (data < CHECK) {
      data = `0${data}`;
    }
    return data;
  }
  return `${year}/${month}/${day} ${hours}:${minutes}`;
}