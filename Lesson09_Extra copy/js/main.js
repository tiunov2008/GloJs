'use strict'
let list = document.querySelector('ul');
let input = document.querySelector('input');
let button = document.querySelector('button');
let addItem = function () {
    let li = document.createElement('li');
    li.innerHTML = input.value;
    list.append(li);
    input.value = '';
}
button.addEventListener('click',addItem) 
let a = () => {
    
}