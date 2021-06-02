'use strict'

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
}

//Спрашиваем у пользователя и сохраняем, то что он ввёл
let money, //Месячный доход
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
                        'Квартплата, проездной, кредит'),//Возможные расходы
    deposit = confirm('Есть ли у вас депозит в банке?'),//Есть ли депозит в банке
    mission = 100000;//Цель заработать

let reQuestion = function(str,varible){
    do{
        varible = prompt(str);
    }
    while(!isNumber(varible));
}

reQuestion('Ваш месячный доход?',money);

//Функция определения типа данных
let showTypeOf = function(data){
    console.log(data, typeof(data)); 
}
//Функция подсчета расходов за месяц
let getExpensesMonth = function(){
    let sum = 0;
    let expenses = [];
    for(let i = 0; i < 2; i++){
        expenses[i] = prompt('Введите обязательную статью расходов?')
        reQuestion('Во сколько это обойдется?',sum);
    }
}
let expensesMonth = getExpensesMonth();
//Функция подсчета накопления за месяц
let getAccumulatedMonth = function(){
    return money - expensesMonth;
}
let accumulatedMonth = getAccumulatedMonth();
//Функция подсчета времяни для достижения цели
let getTargetMonth = function(){
    if(Math.ceil(mission / accumulatedMonth) > 0){
        return 'Осталось ' + Math.ceil(mission / accumulatedMonth) + ' месяца до достижения цели';
    }else{
        return "Цель не будет достигнута";
    }
}
//Переменная бюджета на день
let budgetDay = Math.ceil(accumulatedMonth / 30);

let getStatusIncome = function(){
    if (budgetDay>=1200) {
        console.log('У вас высокий уровень дохода');
    } else if(budgetDay<1200 && budgetDay>=600){
        console.log('У вас средний уровень дохода');
    } else if(budgetDay<600 && budgetDay>=0){
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else{
        console.log('Что то пошло не так');
    }
}

//Определяем тип данных и выводим его
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Расходы за месяц: ' + expensesMonth);

console.log('Список возможных расходов: ' + addExpenses.split(', '));

console.log(getTargetMonth());

console.log('Буджет на день: ' + budgetDay);

getStatusIncome();