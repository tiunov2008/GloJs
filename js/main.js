'use strict'
//Спрашиваем у пользователя и сохраняем, то что он ввёл
let money = Number(prompt('Ваш месячный доход?', 60000)); //Месячный доход
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
                        'Квартплата, проездной, кредит');//Возможные расходы
let deposit = confirm('Есть ли у вас депозит в банке?');//Есть ли депозит в банке
let expenses1 = prompt('Введите обязательную статью расходов?');//Обязательная Статья расходов
let expenses2 = prompt('Введите обязательную статью расходов?');//Обязательная Статья расходов
let amount1 = Number(prompt('Во сколько это обойдется?', 5000));//Во сколько обойдется обязательная статья расходов
let amount2 = Number(prompt('Во сколько это обойдется?', 15000));//Во сколько обойдется обязательная статья расходов
let mission = 100000;//Цель заработать
//Функция определения типа данных
let showTypeOf = function(data){
    console.log(data, typeof(data)); 
}
//Функция подсчета расходов за месяц
let getExpensesMonth = function(){
    return amount1 + amount2;
}
//Функция подсчета накопления за месяц
let getAccumulatedMonth = function(){
    return money - getExpensesMonth();
}
let accumulatedMonth = getAccumulatedMonth();
//Функция подсчета времяни для достижения цели
let getTargetMonth = function(){
    return Math.ceil(mission / accumulatedMonth);
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

console.log('Расходы за месяц: ' + getExpensesMonth());

console.log('Список возможных расходов: ' + addExpenses.split(', '));

console.log('Осталось ' + getTargetMonth() + ' месяца до достижения цели');

console.log('Буджет на день: ' + budgetDay);

getStatusIncome();