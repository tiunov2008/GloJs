'use strict'

let lang = prompt('Выбирете язык: ru / en');

if (lang == "ru") {
    console.log('Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
} else if(lang == "en"){
    console.log('Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday');
} else{
    console.log('Ошибка');
}

switch(lang) {
    case 'ru':
        console.log('Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
        break
    case 'en':
        console.log('Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday');
        break
    default:
        break
}

let days = [
    {id: "ru", name: 'Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье'},
    {id: "en", name: 'Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday'},
];

console.log(days.find(item => item.id == lang).name);

let nameInput = prompt('Ввидите имя');
let namePerson = "Артем" === nameInput ? "директор" : "Максим" === nameInput ? "преподаватель" : "студент";
console.log(namePerson);