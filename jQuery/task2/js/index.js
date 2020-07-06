const $list = $(".list");
const $input = $("#add-input");
const $add = $("#add-submit");
const $search = $("#search-submit");
const $inputToSearch = $("#search-input");

let todos = [{
    text: "Buy milk",
    done: false
  },
  {
    text: "Play with dog",
    done: true
  }
];

// count items
const amount = () => {
  let doneTotal = 0;
  let inProgress = 0;

  todos.forEach(el => {
    if (el.done) {
      doneTotal++;
    } else {
      inProgress++;
    }
  });

  $('.done.total').text(doneTotal);
  $('.in-progress').text(inProgress);
  $('span[some-attr]').text(doneTotal + inProgress);
}

// set to localStorage
const setToLS = (item) => {
  localStorage.setItem("todos", JSON.stringify(item));
};

// update localStorage
const updateLS = (item, key) => {
  if (localStorage[key]) {
    localStorage.removeItem(key);
    setToLS(item);
  } else {
    setToLS(item);
  }
}

// items from localStorage
if (localStorage.todos) {
  $list.empty();

  let content = JSON.parse(localStorage.todos);
  todos = content;
  amount();

  for (let key in content) {
    $list.append(`
      <li class="item">
        <span class="item-text ${content[key].done?'done':''}">${content[key].text}</span>
        <button class="item-remove">Remove</button>
      </li>
    `);
  }
} else {
  setToLS(todos);
  amount();
}

// add error
$('form').append('<span class="error-text">Add something to do / Already have the same</span>');
$('.error-text').hide();

$(document).ready(
  function () {
    // add new item
    $add.click(
      function (e) {
        let itemToAdd = $input.val();

        if (itemToAdd && todos.some(el => el.text === itemToAdd) !== true) {
          todos.push({
            text: itemToAdd,
            done: false
          });

          updateLS(todos, 'todos');
          $list.append(`
            <li class="item">
              <span class="item-text">${itemToAdd}</span>
              <button class="item-remove">Remove</button>
            </li>
          `);

          $('.error-text').hide();
          e.preventDefault();
          $input.val('');
          amount();
        } else {
          $('.error-text').show();
          e.preventDefault();
        }
      });

    // add new item on click Enter
    $input.keyup(function (e) {
      if (e.keyCode === 13) {
        $add.click(e);
      }
    });

    // toggleClass done on item
    $(document).on('click', '.item-text', function () {
      $(this).toggleClass('done');
      let itemToUpdate = $(this).text();
      let flag = $(this).css('text-decoration') === 'line-through solid rgb(0, 0, 0)' ? true : false;

      todos = todos.map(el => {
        if (el.text === itemToUpdate) {
          el.done = flag;
        }
        return el;
      });
      updateLS(todos, 'todos');
      amount();
    });

    // delete item on click Remowe button
    $(document).on('click', '.item-remove', function () {
      $(this).parent().fadeOut('slow');
      let itemToDel = $(this).prev().text();

      todos = todos.filter(el => el.text !== itemToDel);
      updateLS(todos, 'todos');
      amount();
    });

    // search item
    $search.click(
      function (e) {
        let itemToSearch = $inputToSearch.val();

        for (let key in todos) {
          if (todos[key].text === itemToSearch) {
            $list.empty();
            $list.append(`
              <li class="item">
                <span class="item-text ${todos[key].done?'done':''}">${todos[key].text}</span>
                <button class="item-remove">Remove</button>
              </li>
            `);
          }
        }
        
        e.preventDefault();
        $inputToSearch.val('');
      });
  }
);