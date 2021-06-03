'use strict'

let answer = Math.floor(Math.random() * 100) + 1;
console.log(answer);
let start = function(){
    let number = prompt('Угадай число от 1 до 100');
    let checkAnswer = function(){
        if(number === null){
            alert('Игра окончена');
        }else if(!isNaN(parseFloat(number)) && isFinite(number)){
            if(answer == number){
                let message = confirm('Поздравляю, Вы угадали!!!');
                if(message === true){
                    start();
                }else{

                }
            }else if(answer < number){
                number = prompt('Загаданное число меньше');
                checkAnswer();
            }else if(answer > number){
                number = prompt('Загаданное число больше');
                checkAnswer();
            }
            checkAnswer();
        }else{
            number = prompt('Введи число!'); 
            checkAnswer();
        }
    }
    checkAnswer();
}
start();

