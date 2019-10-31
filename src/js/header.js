"Use strict";

// Variables
const header = document.getElementById('main-header');
const check = document.getElementById('check');
const headername = document.getElementById('name');

// Header change onload
window.onload = function () {
    if (window.scrollY > (window.innerHeight / 2)) {
        headername.style.display = '';
    } else {
        headername.style.display = 'none';
    }
}

// Header change on window scroll
window.addEventListener('scroll', function () {
    if (window.scrollY > (window.innerHeight / 2)) {
        header.classList.add('change');
    } else {
        header.classList.remove('change');
    }

    if (document.querySelector('.change') != null) {
        headername.style.display = '';
    } else {
        headername.style.display = 'none';
    }
});

// Header change on menu click
check.addEventListener('change', function () {
    if (this.checked && window.scrollY < (window.innerHeight / 2)) {
        header.classList.add('change');
    } else if (this.checked && window.scrollY > (window.innerHeight / 2)) {
        header.classList.add('change');
    } else if (window.scrollY > (window.innerHeight / 2)) {
        header.classList.add('change');
    } else {
        header.classList.remove('change');
    }

    if (document.querySelector('.change') != null) {
        headername.style.display = '';
    } else {
        headername.style.display = 'none';
    }
});

let testigen = document.querySelector('.menu-list');
let testis = testigen.getElementsByTagName('li');
let checkish = document.getElementById('check');

for (let i = 0; testis.length > i; i++) {
    testis[i].addEventListener('click', function() {
        checkish.checked = false;
    })
}

