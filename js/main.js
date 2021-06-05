'use strict'

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
}


let money
let reQuestion = function(){
    do{
        money = prompt('Ваш месячный доход?');
    }
    while(!isNumber(money));
}
reQuestion();
let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function(){
        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','Квартплата, проездной, кредит');//Возможные расходы
        appData.addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');//Есть ли депозит в банке
        let sum = [];
        let expensesList = [];
        for(let i = 0; i < 2; i++){
            expensesList[i] = prompt('Введите обязательную статью расходов?');
            do{
                sum[i] = prompt('Во сколько это обойдется?');
            }
            while(!isNumber(sum[i]));
            appData.expenses[expensesList[i]] = +sum[i];
        }
    },
    getBudget: function(){
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
        if(!(appData.budgetDay >= 0)){
            appData.budgetDay = 'Что то пошло не так';
        }
        if(!(appData.budgetMonth >= 0)){
            appData.budgetMonth = 'Что то пошло не так';
        }
    },    
    getExpensesMonth: function(){
        for(let key in appData.expenses){
            appData.expensesMonth += appData.expenses[key];
        }
        
        if(!(appData.expensesMonth >= 0)){
            appData.expensesMonth = 'Что то пошло не так';
        }
    },
    getTargetMonth: function(){
        if(Math.ceil(appData.mission / appData.budgetMonth) >= 0 && Math.ceil(appData.mission / appData.budgetMonth) != Infinity){
            return 'Осталось ' + Math.ceil(appData.mission / appData.budgetMonth) + ' месяца до достижения цели';
        }else{
            return "Цель не будет достигнута";
        }
    },
    getStatusIncome: function(){
        if (appData.budgetDay>=1200) {
            console.log('У вас высокий уровень дохода');
        } else if(appData.budgetDay<1200 && appData.budgetDay>=600){
            console.log('У вас средний уровень дохода');
        } else if(appData.budgetDay<600 && appData.budgetDay>=0){
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else{
            console.log('Что то пошло не так');
        }
    },
}
appData.asking();
appData.getBudget();
appData.getExpensesMonth();

console.log('Расходы за месяц: ' + appData.expensesMonth);

console.log(appData.getTargetMonth());

appData.getStatusIncome();
console.log("Наша программа включает в себя данные:");
for(let key in appData){
    console.log(key + ":  " + appData[key]);
}
