// 1. Create a function which finds max element in array
// ◦ Use Math.max() and one of new operators
console.log(`-----task_1-----`);
const maxElement = (arr) => {
  return Math.max.apply(null, arr);
}
const array1 = [1, 4, 7, 35, 456, 85, 567, 2, 3, 50];
console.log(maxElement(array1)); // 567

// 2. Create function which copies array
// ◦ Use one of new operators
console.log(`-----task_2-----`);
const copyArray = (arrToCopy) => {
  return Object.assign([], arrToCopy);
}
const array2 = [1, 2, 3];
const copiedArray = copyArray(array2);
console.log(array2, copiedArray); // [1,2,3] [1,2,3]
console.log(array2 === copiedArray); // false

// 3. Create function to enhance element with unique id. Here is how function should be invoked:
// ◦ Use Symbol() as a unique identifier
// addUniqueId({name: 123})
// ◦ As a result, returned object should have extra property - unique identifier. 
// Returned object should be copy of the passed parameter. 
// Original object should not contain this id.
console.log(`-----task_3-----`);
const addUniqueId=(obj)=> {
  let _id = Symbol('id');
  return {
    id: [_id],
    ...obj
  };
}
console.log(addUniqueId({
  name: 'Kate'
}));

// 4. Write a function which regroups object properties
// ◦ Destruct old object and construct new
console.log(`-----task_4-----`);
const regroupObject = (oldObj) => {
  return {
    university: oldObj.details.university,
    user: {
      age: oldObj.details.age,
      firstName: oldObj.name,
      id: oldObj.details.id
    }
  };
}
const oldObj = {
  name: 'Someone',
  details: {
    id: 1,
    age: 11,
    university: 'UNI'
  }
};
console.log(regroupObject(oldObj));
// {
//   university: 'UNI',
//   user: {
//     age: 11,
//     firstName: 'Someone',
//     id: 1
//   }
// }

// 5. Create a function which finds unique elements in array
// ◦ Use one of the new data types
console.log(`-----task_5-----`);
const findUniqueElements=(array)=>{
  let setArr=new Set();
  array.forEach(element => {
    setArr.add(element);
  });  
  return setArr;
}
const array3 = [1,1,3,54,6,3,7,23,5,5,3,23,2,2,1,5,6];
console.log(findUniqueElements(array3)); // [1,3,54,6,7,23,5]

// 6. Create a function which masks phone number, leaves only last 4 digits
// ◦ Use padStart
console.log(`-----task_6-----`);
const hideNumber=(phoneNumber)=>{
  return phoneNumber.substr(-4).padStart(10,'*');
}
const phoneNumber='0123456789';
console.log(hideNumber(phoneNumber)); // ******6789

// 7. Create function which has all parameters always required. If they are not - throw error.
// ◦ Use default parameters feature and assign a function to it
console.log(`-----task_7-----`);
const add=(a,b)=>{
  if (!a||!b) throw new Error('Missing property');
  return a+b;
}
console.log(add(1,3)); // 4
// console.log(add(1)); // Error: Missing property

// 8. Create a function which calls some API and logs array of ‘name’ fields in alphabetical order. Use promises.
console.log(`-----task_8-----task_9-----`);
const fetchJson=(url)=>{
  return fetch(url)
    .then(request => request.text())
    .then(text => JSON.parse(text))
    .then(data=>{
      let nameArray=[];
      for(item in data){
        nameArray.push(data[item].name);
      }
      return nameArray;
    })
    .catch(error => console.log(`ERROR: ${error.stack}`))
}
const yourUser='Fialkaksu';
fetchJson('https://jsonplaceholder.typicode.com/users').then(res=>console.log(res.sort()));
fetchJson(`https://api.github.com/users/${yourUser}/repos`).then(res=>console.log(res));

// 9. Rewrite previous task using async/await instead of promises.
async function fetchJsonAsync(url) {
  try {
    const request = await fetch(url);
    const text = await request.text();
      return JSON.parse(text);
  }
  catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
}
fetchJsonAsync(`https://api.github.com/users/${yourUser}/repos`).then(data => {
  let nameArray=[];
  for(item in data){
    nameArray.push(data[item].name);
  }
  return nameArray;
}).then(res=>console.log(res));


// Extra information for tasks 8-9:
// • To call API use `fetch`. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// • Run `.json()` on fetched data to be able to work with retrieved information
// • Use these endpoints:
// • https://api.github.com/users/${yourUser}/repos , where yourUser - is your username. 
// (GitHub API, returns your repositories, you can log out names of your repositories)
// or
// • https://jsonplaceholder.typicode.com/users (JSONPlaceholder API, returns random information, log out names of people)