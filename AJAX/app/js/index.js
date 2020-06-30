// Using AJAX, you need to implement simple application to manage users. 
//     1. As a user I want to see a form with ‘name’, ‘username’ inputs and ‘Add New User’ button. 
//     When button is clicked – app sends request to server and tries to create a new user with proper values of inputs as well. 
//     While request is processed button should be disabled. In case of success response update user list.

//     2. After page loading I want to see a list of existing users under this form. 
//     While request for getting users is in process there must be some notification or loader 
//     (‘Loading….’ will be enough) to inform about execution process.


//     3. Each list element must be represented as: ‘UserId’ field, ‘name’ and ‘username’ inputs, ‘Update’ and ‘Delete’ buttons.
// During update/delete requests proper button should be disabled 
// (you can block all UI or just current user element, but it is not necessary). 
// After getting response update user list and enable buttons.
// Server part has been implemented already and provides such API's: 
//     • GET /users – returns list of users
// Request Options: no
// Response:
// 	Code: 200 / Body: JSON – list of users
//     • POST /users – creates new user
// Request Options: 
//             {
//     name: ‘string’,
//     username: ‘string’
// }
// Parameter content type: application/json
// Response:
// 	Code: 201 / Body: empty
//     • PUT /users/:userId – updates existing user
// Request Options: Body: 
// {
//     name: ‘string’,
//     username: ‘string’
// }
// Parameter content type: application/json
// Response:
// 	Code: 204 / Body: empty
//     • DELETE /users/:userId – deletes user
// Request Options: no
// Header:  ‘Authorization’ : ‘admin’
// Response:
// 	Code: 204 / Body: empty
// IMPORTANT! Before you begin working:
//     • install Node.js (https://nodejs.org/ )
//     • go to server folder
//     • open terminal(or cmd)
//     • run npm install command
//     • run npm run server to launch server 
// (there should be message: Server is listening on port: 3000)
//     • to stop running server press Ctrl+C
// Note: after restarting server all data will be reverted to its initial state
// RESTRICTIONS
//     • Do not use fetch for this homework.

const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');

const READY_STATE = 4;
const OK_STATUS = 200;
const OK_STATUS_POST = 201;
const OK_STATUS_PUT_DEL = 204;

const manage = document.createElement('h2');
manage.innerText = 'Manage User App';

const nameInput = document.createElement('input');
nameInput.placeholder = 'Full Name';
nameInput.className = 'add';

const usernameInput = document.createElement('input');
usernameInput.placeholder = 'Name';
usernameInput.className = 'add';

const addNewUserBtn = document.createElement('button');
addNewUserBtn.innerText = 'Add New User';
addNewUserBtn.id = 'add';
addNewUserBtn.disabled = false;

const loader = document.createElement('p');
loader.style.visibility = 'hidden';

const usersBlock = document.createElement('table');
const usersBlockHead = document.createElement('thead');
usersBlockHead.innerHTML = `<tr><th>User Id</th>
                            <th>User Full Name</th>
                            <th>User Name</th>
                            <th>Update</th>
                            <th>Delete</th></tr>`;
const usersBlockBody = document.createElement('tbody');

usersBlock.appendChild(usersBlockHead);
usersBlock.appendChild(usersBlockBody);

appContainer.appendChild(manage);
appContainer.appendChild(usernameInput);
appContainer.appendChild(nameInput);
appContainer.appendChild(addNewUserBtn);
appContainer.appendChild(loader);
appContainer.appendChild(usersBlock);

getUsers();

addNewUserBtn.onclick = function () {
  const data = new FormData();
  data.name = nameInput.value;
  data.username = usernameInput.value;
  const xhrPOST = new XMLHttpRequest();

  xhrPOST.open('POST', baseUrl + '/users');
  xhrPOST.setRequestHeader('Content-Type', 'application/json');
  xhrPOST.send(JSON.stringify(data));

  xhrPOST.onreadystatechange = function () {
    if (xhrPOST.readyState === READY_STATE && xhrPOST.status === OK_STATUS_POST) {
      usersBlockBody.innerHTML = '';
      getUsers();
    }
  }
}

function getUsers() {
  const xhrGET = new XMLHttpRequest();

  xhrGET.open('GET', baseUrl + '/users');
  xhrGET.send();
  xhrGET.onreadystatechange = function () {
    if (xhrGET.readyState === READY_STATE && xhrGET.status === OK_STATUS) {
      hide();
      addNewUserBtn.disabled = false;
      const allUsers = JSON.parse(xhrGET.response);

      for (let i = 0; i < allUsers.length; i++) {
        drawUser(allUsers[i]);
      }
    }
  }
  show();
  addNewUserBtn.disabled = true;
}

function drawUser(user) {
  const userBlock = document.createElement('tr');
  userBlock.id = user.id;

  const userId = document.createElement('td');
  userId.innerText = user.id;
  userBlock.appendChild(userId);

  const userFullNameTd = document.createElement('td');
  const userFullName = document.createElement('input');
  userFullName.value = user.name;
  userFullNameTd.appendChild(userFullName);
  userBlock.appendChild(userFullNameTd);

  const userNameTd = document.createElement('td');
  const userName = document.createElement('input');
  userName.value = user.username;
  userNameTd.appendChild(userName);
  userBlock.appendChild(userNameTd);

  const update = document.createElement('td');
  const updateBtn = document.createElement('button');
  updateBtn.innerText = 'Update';
  updateBtn.disabled = false;
  update.appendChild(updateBtn)
  userBlock.appendChild(update);

  const del = document.createElement('td');
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.disabled = false;
  del.appendChild(deleteBtn);
  userBlock.appendChild(del);

  usersBlockBody.appendChild(userBlock);

  updateBtn.onclick = function () {
    const data = {
      name: userFullName.value,
      username: userName.value
    };
    const body = JSON.stringify(data);
    const xhrPUT = new XMLHttpRequest();

    xhrPUT.open('PUT', `${baseUrl}/users/${user.id}`);
    xhrPUT.setRequestHeader('Content-Type', 'application/json');
    xhrPUT.send(body);

    xhrPUT.onreadystatechange = function () {
      if (xhrPUT.readyState === READY_STATE && xhrPUT.status === OK_STATUS_PUT_DEL) {
        updateBtn.disabled = false;
        deleteBtn.disabled = false;
        usersBlockBody.innerHTML = '';
        getUsers();
      }
    }

    updateBtn.disabled = true;
    changeBtnView(updateBtn);
    deleteBtn.disabled = true;
    changeBtnView(deleteBtn);
  }

  deleteBtn.onclick = function () {
    const xhrDEL = new XMLHttpRequest();

    xhrDEL.open('DELETE', `${baseUrl}/users/${user.id}`);
    xhrDEL.setRequestHeader('Authorization', 'admin');
    xhrDEL.send(null);

    xhrDEL.onreadystatechange = function () {
      if (xhrDEL.readyState === READY_STATE && xhrDEL.status === OK_STATUS_PUT_DEL) {
        updateBtn.disabled = false;
        deleteBtn.disabled = false;
        usersBlockBody.innerHTML = '';
        getUsers();
      }
    }

    updateBtn.disabled = true;
    changeBtnView(updateBtn);
    deleteBtn.disabled = true;
    changeBtnView(deleteBtn);
  }
}

function changeBtnView(btn) {
  if (btn.disabled) {
    btn.style.backgroundColor = 'rgb(88, 88, 88)';
    btn.style.color = 'rgb(255, 255, 255)';
  }
}

function show() {
  loader.style.visibility = 'visible';
}

function hide() {
  loader.style.visibility = 'hidden';
}