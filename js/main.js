'use strict'

let money = prompt('Ваш месячный доход?');
let income = 'Some text';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let amount2 = prompt('Во сколько это обойдется?');
let mission = 100000;
let budgetMonth = money - amount1 - amount2;
let budgetDay = budgetMonth / 30;
let num = 266219;
let period = mission / budgetMonth;



/*num = String(num).split('').reduce((last, next) => last * next)**3;
console.log(String(num) .substr(0,2));*/

alert('Some text');
console.log('addExpenses: ' + addExpenses.length);
console.log(addExpenses.toLowerCase().split(', '));
console.log('Цель буде достигнута через ' + Math.ceil(period) + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log('Буджет на день: ' + budgetDay);
console.log('budgetMonth: ' + budgetMonth);
if (budgetDay>1200) {
    console.log('У вас высокий уровень дохода')
} else {
    
}