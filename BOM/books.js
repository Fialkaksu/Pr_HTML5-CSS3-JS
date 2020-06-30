// You need to create a web page that contains an editable set of books. 
// All styles are up to you (don’t waste much time on design).

// Your page should be divided into two sections. The first one always
// represents a list of books. The second section is a dynamic
// one and can represent either book preview or edit book or add book section depending 
// on the URL.
// The list of books is just a set of book names and next to each item there should be
// an “edit” button. Also, there should be an “add” button at the end of the list. 
// Each book (list item) is a clickable element. 
// When you click on the book the URL changes to:
// /index.html?id={uid}#preview (uid represents the unique id of the book selected)
// and the dynamic section renders a book preview. Book preview section displays the
// following information: book name, author, image and plot.
// When you click on edit button the URL changes to:
// /index.html?id={uid}#edit (uid represents the unique id of the book selected)
// and the dynamic section renders book editing form. There should be 4 input fields (all required)
// filled with the book information (book name, author, image url, plot) and two buttons (cancel
// and save). When the cancel button is clicked a modal window appears with “Discard changes?”
// message. If the user confirms then discard all the changes and go back to the previous page 
// (the URL must be changed accordingly), on cancelling - stay on the current page (Edit form
// page).

// When save button is clicked – save all the changes, redirect to the book preview 
// (the URL must be changed accordingly - /index.html?id={uid}#preview) 
// and after 300ms show alert modal window (“Book successfully updated”).

// When you click on add button the URL changes to:
// /index.html#add
// and the dynamic section renders a book adding form. This form is the same as 
// the book editing form but with unpopulated input fields (all the requirements are the same). 
// After adding the book it should be saved and added to the end of the book list.  

// When you open the page for the very first time you should see three books on your page (they
// should be defined in books.js file).
// After refreshing the page all the saved changes must be kept (use local storage to save data).
// Also, after manually changing the URL the web page must be rendered accordingly. For 
// example, if you manually enter /index.html?id=2#preview, the dynamic section must render the
// preview for the book with id === 2. If manually entered URL is invalid (has wrong or extra query 
// params/hash or non-existent book id) then render the home page (/index.html) – just a list of
// books.

// Pay attention that browser back/forward buttons must work correctly.
// You can edit app.js, book.js and styles.css files but NOT index.html. All DOM manipulations must 
// be done in app.js file.

let booksCollection = [
  {
    id: 1,
    name: 'JavaScript для детей. Самоучитель по программированию',
    author: 'Ник Морган',
    image: 'https://techrocks.ru/wp-content/uploads/2019/10/photo_2019-03-06_10-38-08.jpg',
    plot:`Невзирая на детское название, книга довольно технически сильная и 
        читать ее будет не скучно даже опытным JS программистам.
        Я очень люблю изучать языки программирования на примерах разработки 
        простых казуальных игр. Наверное, поэтому книга попала в пятерку лучших 
        для изучения JavaScript. В ней, кроме классического изучения основ 
        программирования по массивам, циклам, управлению элементов на веб-странице, 
        вы также встретите примеры разработки онлайн-игр «Поиск сокровищ», 
        «Виселицу» и «Змейку». Думаю, книга будет идеальном стартом. Что может быть 
        интереснее и веселее, чем увлекательная разработка игр с множеством 
        красочных картинок и последовательных примеров кода?`
  },
  {
    id: 2,
    name:'Современный учебник JavaScript',
    author: 'Илья Кантор',
    image: 'https://techrocks.ru/wp-content/uploads/2019/10/photo_2019-03-06_10-21-25.jpg',
    plot: `Учебник написан настоящим гуру по JS Ильей Кантором, 
    автором знаменитого русскоязычного онлайн-ресурса по изучению JavaScript — 
    javascript.ru, знакомого каждому веб-разработчику. Этот трехтомный труд 
    достойный похвалы, очень детализированное описание всех тонкостей и 
    особенностей современного JavaScript. 
    Кроме стандартного изучения основ, структур данных, замыкания, объектов, 
    ООП в JS, вы также изучите более продвинутые темы: итераторы, промисы, 
    генераторы, модули, события, создание графических компонентов, регулярные 
    выражения, анимацию, AJAX, оптимизацию и еще много другого. 
    Учебник состоит из трех томов: «Язык JavaScript», «Документ, события, 
    интерфейсы», «Тематические разделы». Книга читается легче, чем еще один 
    классический труд — «JavaScript. Подробное руководство» Дэвида Флэнагана, 
    который по праву также входит в нашу пятерку.`
  },
  {
    id: 3,
    name:'JavaScript. Подробное руководство',
    author: 'Дэвид Флэнаган',
    image: 'https://techrocks.ru/wp-content/uploads/2019/10/photo_2018-12-27_14-20-54.jpg',
    plot: `Эта книга для меня является самым обширным справочником по JS. 
    В первый раз она читается немного сложновато. Но через некоторое время книгу 
    нужно снова прочесть для более глубокого понимания материала. В мире 
    JavaScript, думаю, она уже давно стала священным «Граалем», обязательным для 
    изучения. 
    Вы сможете выучить, кроме базового JavaScript, также работу с документами, 
    объектом Window, обработкой событий, с протоколом HTTP, библиотекой jQuery, 
    изучить работу с графикой и медиафайлами и как сохранять данные на стороне 
    клиента, а также работу с прикладными интерфейсами HTML5. 
    Лично для меня две вышеперечисленные книги являются самыми лучшими и полными 
    учебниками по JavaScript.`
  }
];

if(!window.localStorage.books){
  window.localStorage.setItem('books', JSON.stringify(booksCollection));
}
