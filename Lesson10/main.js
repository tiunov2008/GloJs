'use strict'

let bookList = document.querySelector('.books');
let books = document.querySelectorAll('.book');

bookList.prepend(books[1]);
books[4].after(books[3]);
bookList.append(books[2]);
document.body.style.backgroundImage = 'url("image/you-dont-know-js.jpg")';
books[4].childNodes[1].innerHTML = '<a href="https://github.com/azat-io/you-dont-know-js-ru/blob/master/this%20%26%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes" target="_blank">Книга 3. this и Прототипы Объектов</a>';
document.querySelector('.adv').remove();

let nodes = books[0].childNodes[3];
nodes = nodes.childNodes;
console.log(nodes);
nodes[7].after(nodes[13]);
nodes[8].after(nodes[17]);

nodes = books[5].childNodes[3];
nodes = nodes.childNodes;
console.log(nodes);
nodes[3].after(nodes[19]);
nodes[4].after(nodes[8]);
nodes[5].after(nodes[10]);
nodes[16].after(nodes[12]);

nodes = books[2].childNodes[3];

nodes.innerHTML += ('\<li>' + 'Глава 8: За пределами ES6' + '\</li>');

nodes = nodes.childNodes;
console.log(nodes);
nodes[21].after(nodes[19]);