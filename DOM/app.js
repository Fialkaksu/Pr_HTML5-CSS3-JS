// • Using the standard JavaScript functions, create a file tree based on the data in structure variable.
// • Requirements:
// • By default all folders are closed
// • When you click by left mouse button on a closed folder, folder opens. Otherwise close.
// • When you click on file by left mouse button - nothing happen
// • If the top-level folder closes when the subfolder is open, then after reopening the top-level folder, 
// the subfolder remains in the same state.
// • Use the appropriate icon if the folder is open or closed.
// • Folder/File may be clickable out of name
// • The folder / file is clickable outside the title. (It means you can open folder by clicking on row instead title directly)
// • Create a custom context menu, which opens with the right-click
// • Menu has two options: rename and delete item
// • When context menu is open appropriate item become focused
// • If context menu open outside of the item, rename and delete options are disabled
// • If you rename the file, the file name without it’s extension should be selected
// • If you delete the last item in the folder, the “Folder is empty” text should appear.
// • Context menu can be hidden by left-click outside it’s container 
// • Icons, to the left of file/folder names can be found at the link 
// - https://material.io/icons/ (they are already included). Use icons like this 
// <i class="material-icons">done</i>

const data = [{
    'folder': true,
    'title': 'Pictures',
    'children': [{
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [{
          'title': 'spain.jpeg'
        }]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [{
      'folder': true,
      'title': 'screenshots',
      'children': null
    }]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [{
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');

function buildTree(children, parentFolder) {
  if (!children) {
    createFolder(children, parentFolder, true);
    return;
  }
  children.forEach((element) => {
    if (element['folder'] === true) {
      buildTree(
        element['children'],
        createFolder(element, parentFolder)
      );
    } else {
      createFile(element, parentFolder);
    }
  });
}
buildTree(data, rootNode);

function createFolder(data, parentBlock, empty = false) {
  let folderBlock = document.createElement('div');
  let folderInner = document.createElement('p');
  let icon = document.createElement('i');
  let text = document.createElement('span');

  if (!empty) {
    folderInner.style.display = parentBlock === rootNode ? 'block' : 'none';
    folderBlock.className = 'folder-block';
    folderInner.className = 'folder-inner';
    icon.className = 'material-icons icon folder';
    text.className = 'text';
    icon.innerHTML = 'folder';
    text.innerHTML = data['title'];

    folderInner.appendChild(icon);
    folderInner.appendChild(text);
  } else {
    folderInner.innerHTML = 'Folder is empty';
    folderInner.style.fontStyle = 'italic';
    folderInner.className = 'folder-inner empty';
    folderInner.style.display = parentBlock === rootNode ? 'block' : 'none';
  }

  folderBlock.appendChild(folderInner);
  parentBlock.appendChild(folderBlock);

  return folderBlock;
}

function createFile(data, parentBlock) {
  let folderBlock = document.createElement('div');
  let folderInner = document.createElement('p');
  let icon = document.createElement('i');
  let text = document.createElement('span');

  folderInner.style.display = parentBlock === rootNode ? 'block' : 'none';
  folderBlock.className = 'folder-block';
  folderInner.className = 'folder-inner';
  icon.className = 'material-icons icon file';
  text.className = 'text';
  icon.innerHTML = 'insert_drive_file';
  text.innerHTML = data['title'];

  folderInner.appendChild(icon);
  folderInner.appendChild(text);
  folderBlock.appendChild(folderInner);
  parentBlock.appendChild(folderBlock);

  return folderBlock;
}

let inner = document.querySelectorAll('.folder-inner');
Array.from(inner).forEach(elem => {
  elem.addEventListener('click', handlerShow);

  function handlerShow() {
    let children = this.parentElement.childNodes;
    let parent = this.parentElement;
    parent.classList.toggle('open');

    if (parent.classList.contains('open')) {
      for (let i = 1; i < children.length; i++) {
        children[i].children[0].style.display = 'block';
        children[i].lastElementChild.style.display = 'block';
        this.children[0].innerHTML = 'folder_open';
      }
    } else {
      for (let i = 1; i < children.length; i++) {
        children[i].children[0].style.display = 'none';
        children[i].lastElementChild.style.display = 'none';
        this.children[0].innerHTML = 'folder';
      }
    }
  }
})

let contextMenu = document.createElement('nav');
contextMenu.className = 'context-menu';
contextMenu.setAttribute('id', 'context-menu');

let renameBtn = document.createElement('button');
renameBtn.className = 'context-menu__link';
renameBtn.innerHTML = 'Rename';
renameBtn.setAttribute('data-action', 'Rename');

let delItemBtn = document.createElement('button');
delItemBtn.className = 'context-menu__link';
delItemBtn.innerHTML = 'Delete item';
delItemBtn.setAttribute('data-action', 'Delete');

contextMenu.appendChild(renameBtn);
contextMenu.appendChild(delItemBtn);
document.body.appendChild(contextMenu);

(function () {
  'use strict';

  function clickInsideElement(e, className) {
    let el = e.srcElement || e.target;

    if (el.classList.contains(className)) {
      return el;
    } else {
      while (el === el.parentNode) {
        if (el.classList && el.classList.contains(className)) {
          return el;
        }
      }
    }

    return false;
  }

  function menuItemListener(btn) {
    let parent = taskItemInContext.parentElement.parentElement;

    if (btn.getAttribute('data-action') === 'Delete') {
      const COMPARE_TWO = 2;

      if (parent.parentElement.childNodes.length === COMPARE_TWO) {
        let folderBlock = document.createElement('div');
        let folderInner = document.createElement('p');

        folderInner.innerHTML = 'Folder is empty';
        folderInner.style.fontStyle = 'italic';
        folderInner.className = 'folder-inner empty';
        folderInner.style.display = 'block';
        folderBlock.appendChild(folderInner);
        parent.parentElement.appendChild(folderBlock);
      }
      parent.remove();

    } else if (btn.getAttribute('data-action') === 'Rename') {
      taskItemInContext.setAttribute('contenteditable', true);

      let splitText = taskItemInContext.innerText.split('.');
      let partForSelect = splitText[0];
      let secondPart = splitText[1];
      const NOT_FIND = -1;

      if (taskItemInContext.innerText.indexOf('.') === NOT_FIND) {
        taskItemInContext.innerHTML = '<span>' + partForSelect + '</span>';
      } else {
        taskItemInContext.innerHTML = '<span>' + partForSelect + '</span>' +
          '<span>.' + secondPart + '</span>';
      }

      let range = new Range();

      range.setStart(taskItemInContext, 0);
      range.setEnd(taskItemInContext, 1);
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(range);

      taskItemInContext.addEventListener('blur', function () {
        taskItemInContext.removeAttribute('contenteditable');
      })
    }

    toggleMenuOff();
  }

  let taskItemClassName = 'text';
  let taskItemInContext;
  let menu = document.querySelector('#context-menu');
  let menuState = 0;
  let contextMenuLinkClassName = 'context-menu__link';
  let contextMenuActive = 'context-menu--active';

  let menuWidth = menu.offsetWidth;
  let menuHeight = menu.offsetHeight;
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let clickCoords;
  let clickCoordsX;
  let clickCoordsY;

  function init() {
    contextListener();
    clickListener();
    keyupListener();
    resizeListener();
  }

  function contextListener() {
    document.addEventListener('contextmenu', function (e) {
      taskItemInContext = clickInsideElement(e, taskItemClassName);

      e.preventDefault();
      toggleMenuOn();
      positionMenu(e);

      if (taskItemInContext) {
        renameBtn.removeAttribute('disabled');
        delItemBtn.removeAttribute('disabled');
      } else {
        taskItemInContext = null;
        renameBtn.setAttribute('disabled', 'disabled');
        delItemBtn.setAttribute('disabled', 'disabled');
      }
    });
  }

  function clickListener() {
    document.addEventListener('click', function (e) {
      let clickeElIsLink = clickInsideElement(e, contextMenuLinkClassName);

      if (clickeElIsLink) {
        e.preventDefault();
        menuItemListener(clickeElIsLink);
      } else {
        let button = e.which || e.button;
        if (button === 1) {
          toggleMenuOff();
        }
      }
    });
  }

  function keyupListener() {
    const ESC_KEY = 27;
    window.onkeyup = function (e) {
      if (e.keyCode === ESC_KEY) {
        toggleMenuOff();
      }
    }
  }

  function toggleMenuOn() {
    if (menuState !== 1) {
      menuState = 1;
      menu.classList.add(contextMenuActive);
    }
  }

  function toggleMenuOff() {
    if (menuState !== 0) {
      menuState = 0;
      menu.classList.remove(contextMenuActive);
    }
  }

  function resizeListener() {
    window.onresize = function () {
      toggleMenuOff();
    };
  }

  function positionMenu(e) {
    const INDENT = 4;
    clickCoords = getPosition(e);
    clickCoordsX = clickCoords.x;
    clickCoordsY = clickCoords.y;
    menuWidth = menu.offsetWidth + INDENT;
    menuHeight = menu.offsetHeight + INDENT;
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if (windowWidth - clickCoordsX < menuWidth) {
      menu.style.left = windowWidth - menuWidth + 'px';
    } else {
      menu.style.left = clickCoordsX + 'px';
    }

    if (windowHeight - clickCoordsY < menuHeight) {
      menu.style.top = windowHeight - menuHeight + 'px';
    } else {
      menu.style.top = clickCoordsY + 'px';
    }
  }

  function getPosition(e) {
    let posx = 0;
    let posy = 0;

    if (!e) {
      e = window.event;
    }

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop +
        document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    }
  }

  init();
})();