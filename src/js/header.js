"Use strict";

// Variables
const header = document.getElementById('main-header');
const check = document.getElementById('check');
const headername = document.getElementById('name');

// Header change onload
window.onload = function () {
    // If window is over half view height, show headername
    if (window.scrollY > (window.innerHeight / 2)) {
        headername.style.display = '';
        // If else, hide it
    } else {
        headername.style.display = 'none';
    }
}

// Header change on window scroll
window.addEventListener('scroll', function () {
    // If window is over half view height, add class for background change
    if (window.scrollY > (window.innerHeight / 2)) {
        header.classList.add('change');
        // If not, remove it
    } else {
        header.classList.remove('change');
    }

    // If class .change is added, display headername
    if (document.querySelector('.change') != null) {
        headername.style.display = '';
        // If not, hide it
    } else {
        headername.style.display = 'none';
    }
});

// Header change on menu click
check.addEventListener('change', function () {
    // If menu is checked, and window is above half view height, add class .change
    if (this.checked && window.scrollY < (window.innerHeight / 2)) {
        header.classList.add('change');
        // If menu is checked, and window is under half view height, add class .change
    } else if (this.checked && window.scrollY > (window.innerHeight / 2)) {
        header.classList.add('change');
        // If window is over half view height, add class .change
    } else if (window.scrollY > (window.innerHeight / 2)) {
        header.classList.add('change');
        // If else, remove class .change
    } else {
        header.classList.remove('change');
    }

    // If class .change exists, display headername
    if (document.querySelector('.change') != null) {
        headername.style.display = '';
        // If else, hide it
    } else {
        headername.style.display = 'none';
    }
});

// Variables for menu
let menuEl = document.querySelector('.menu-list');
let liEl = menuEl.getElementsByTagName('li');

// For all li elements, add event listener on click
for (let i = 0; liEl.length > i; i++) {
    liEl[i].addEventListener('click', function () {
        // If clicked, uncheck checkbox = hide menu list
        check.checked = false;
    })
}

