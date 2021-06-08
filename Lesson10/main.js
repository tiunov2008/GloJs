'use strict'

let bookList = document.querySelector('.books');
let books = document.querySelectorAll('.book');

bookList.prepend(books[1]);
books[4].after(books[3]);
bookList.append(books[2]);
document.body.style.background = "image/you-dont-know-js.jpg";
books[4].getElementsByTagName("a").innerHTML = "Книга 3. this и Прототипы Объектов";
document.querySelector(".adv").remove();

let nodes = books[0].childNodes[3];
nodes = nodes.childNodes;
console.log(nodes);
nodes[12].after(nodes[7]);
nodes[17].before(nodes[13]);