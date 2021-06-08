'use strict'
let date = new Date();
let weekHtml = document.querySelector('.week');
let week = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];
for (let i = 0; i < week.length; i++) {
    if((i == 0 || i == 6) && i != date.getDay()){
        weekHtml.append(week[i] + '  :   Выходной'); 
    }else if(i == date.getDay()){
        console.log(week[i] + '  :   Сегодня'); 
    }else{
        console.log(week[i]); 
    }   
}

