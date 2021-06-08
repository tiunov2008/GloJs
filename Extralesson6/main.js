'use strict'
let date = new Date();
let weekHtml = document.querySelector('.week');
let week = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];
for (let i = 0; i < week.length; i++) {
    if((i == 0 || i == 6) && i != date.getDay()){
        weekHtml.innerHTML += '<i>' + week[i] + '</i>' + '<br>'; 
    }else if(i == date.getDay()){
        weekHtml.innerHTML += '<b>' + week[i] + '</b>' + '<br>'; 
    }else{
        weekHtml.innerHTML += week[i] + '<br>'; 
    }   
}

