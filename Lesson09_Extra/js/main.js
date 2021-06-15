'use strict'
function update() {
var date = new Date();

var days = ['Воскресенье','Понедельник','Вторник',
'Среда','Четверг','Пятница','Суббота'];

var months = ['января','февраля','марта','апреля','мая','июня',
'июля','августа','сентября','октября','ноября','декабря'];

function declOfNum(n, forms) {  
    n = Math.abs(n) % 100; var n1 = n % 10;
    if (n > 10 && n < 20) { 
        return forms[2]; 
    }
    if (n1 > 1 && n1 < 5) { 
        return forms[1]; 
    }
    if (n1 == 1) { 
        return forms[0]; 
    }
    return forms[2];
}

let hours = declOfNum(date.getHours(), ['час', 'часы', 'часов']);
let minutes = declOfNum(date.getMinutes(), ['минута', 'минуты', 'минут']);
let seconds = declOfNum(date.getSeconds(), ['секунда', 'секунды', 'секунд']);

function add0(n) {  
    if(n.toString()[1] === undefined){
        return '0' + n;
    }else{
        return  n;
    }
}

document.querySelector('.time_first').innerHTML = 'Сегодня ' + days[date.getDay()]+ ' ' + date.getDate() + ' ' + months[date.getMonth()]
+ ' ' + date.getFullYear() + ' год ' + date.getHours() + ' ' + hours + ' ' + date.getMinutes() + ' ' + minutes + ' ' + date.getSeconds() + ' ' + seconds;
document.querySelector('.time_second').innerHTML = add0(date.getDate()) + '.' + add0(date.getDay()) + '.' + add0(date.getMonth())
+ '.' + date.getFullYear() + ' - ' + add0(date.getHours()) + ':' + add0(date.getMinutes()) + ':' + add0(date.getSeconds());
}
let timerId;
timerId = setInterval(update, 1000);
update();