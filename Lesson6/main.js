'use strict'

let answer = Math.floor(Math.random() * 100) + 1;
console.log(answer);

let start = function(){
    let number = prompt('Угадай число от 1 до 100');
    let attempts = 10;

    let checkAnswer = function(){
        if(number === null){
            alert('Игра окончена');
            return
        }else if(attempts === 0){
            let message2 = confirm('Попытки закончились, хотите сыграть еще?');
            if(message2 === true){
                start();
            }else{
                alert('Игра окончена');
                return
            }
        }else if(!isNaN(parseFloat(number)) && isFinite(number)){
            if(answer == number){
                let message1 = confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?');
                if(message1 === true){
                    start();
                }else{
                    alert('Игра окончена');
                    return
                }
            }else if(answer < number){
                number = prompt('Загаданное число меньше, осталось попыток ' + attempts);
                attempts--;
                checkAnswer();
            }else if(answer > number){
                number = prompt('Загаданное число больше, осталось попыток ' + attempts);
                attempts--;
                checkAnswer();
            }
            checkAnswer();
        }else{
            number = prompt('Введи число!'); 
            checkAnswer();
        }
    }
    console.dir(checkAnswer);
    checkAnswer();

}
start();

